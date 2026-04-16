import asyncio
import importlib
import inspect
import os
import sys
import types
import unittest
from pathlib import Path
from unittest.mock import patch

from fastapi import FastAPI


SERVICE_DIR = Path(__file__).resolve().parents[1]
if str(SERVICE_DIR) not in sys.path:
    sys.path.insert(0, str(SERVICE_DIR))


class Phase1BoundaryTests(unittest.TestCase):
    def test_agent_exposes_required_boundary_interfaces(self) -> None:
        agent_module = importlib.import_module("Assistant.agent")

        self.assertTrue(hasattr(agent_module, "AgentConfig"))
        self.assertTrue(callable(agent_module.run))
        self.assertTrue(callable(agent_module.stream))

        agent_config = agent_module.AgentConfig(
            namespace=("goal_bot", "user-123"),
            thread_id="user-123:user-123",
        )
        self.assertEqual(agent_config.namespace, ("goal_bot", "user-123"))

        run_signature = inspect.signature(agent_module.run)
        stream_signature = inspect.signature(agent_module.stream)
        self.assertIn("config", run_signature.parameters)
        self.assertIn("config", stream_signature.parameters)

    def test_agent_config_requires_namespace(self) -> None:
        agent_module = importlib.import_module("Assistant.agent")

        with self.assertRaises(TypeError):
            agent_module.AgentConfig()

    def test_agent_module_does_not_import_fastapi_or_websocket(self) -> None:
        agent_module = importlib.import_module("Assistant.agent")
        source = Path(agent_module.__file__).read_text()

        self.assertNotIn("FastAPI", source)
        self.assertNotIn("WebSocket", source)

    def test_main_is_fastapi_transport_layer(self) -> None:
        main_module = importlib.import_module("main")

        self.assertIsInstance(main_module.app, FastAPI)
        self.assertTrue(callable(main_module.verify_jwt))

        verify_signature = inspect.signature(main_module.verify_jwt)
        self.assertIn("token", verify_signature.parameters)

        websocket_routes = [
            route for route in main_module.app.routes
            if route.__class__.__name__ == "APIWebSocketRoute"
        ]
        self.assertTrue(websocket_routes)

    def test_main_uses_agent_config(self) -> None:
        main_module = importlib.import_module("main")
        source = Path(main_module.__file__).read_text()

        self.assertIn("AgentConfig", source)
        self.assertIn("WebSocket", source)

    def test_thread_id_defaults_to_user_scope(self) -> None:
        main_module = importlib.import_module("main")

        resolved_thread_id = main_module.resolve_thread_id(("goal_bot", "user-123"), None)

        self.assertEqual(resolved_thread_id, "user-123:user-123")

    def test_thread_id_prefixes_client_value_with_user_scope(self) -> None:
        main_module = importlib.import_module("main")

        resolved_thread_id = main_module.resolve_thread_id(("goal_bot", "user-123"), "portfolio")

        self.assertEqual(resolved_thread_id, "user-123:portfolio")

    def test_verify_jwt_returns_consistent_namespace_shape(self) -> None:
        main_module = importlib.import_module("main")

        with patch.object(main_module, "_get_verified_claims", return_value={"sub": "user-123"}):
            namespace = asyncio.run(main_module.verify_jwt("demo-token"))

        self.assertEqual(namespace[0], "goal_bot")
        self.assertEqual(namespace[1], "user-123")

    def test_verify_jwt_requires_sub_claim(self) -> None:
        main_module = importlib.import_module("main")

        with patch.object(main_module, "_get_verified_claims", return_value={}):
            with self.assertRaises(Exception):
                asyncio.run(main_module.verify_jwt("demo-token"))

    def test_get_verified_claims_uses_supabase_get_claims(self) -> None:
        main_module = importlib.import_module("main")
        completed = types.SimpleNamespace(returncode=0, stdout='{"sub":"user-123"}', stderr="")

        with patch.dict(
            os.environ,
            {
                "NEXT_PUBLIC_SUPABASE_URL": "https://project.supabase.co",
                "NEXT_PUBLIC_SUPABASE_ANON_KEY": "anon-key",
            },
            clear=False,
        ):
            with patch.object(main_module.subprocess, "run", return_value=completed) as mocked_run:
                claims = main_module._get_verified_claims("demo-token")

        self.assertEqual(claims["sub"], "user-123")
        command = mocked_run.call_args.args[0]
        self.assertEqual(command[0], "node")
        self.assertIn("getClaims", command[3])

    def test_stream_uses_langgraph_astream(self) -> None:
        agent_module = importlib.import_module("Assistant.agent")

        class FakeChunk:
            def __init__(self, content: str) -> None:
                self.content = content

        class FakeAgent:
            async def astream(self, *_args, **_kwargs):
                yield (FakeChunk("Hel"), {"node": "model"})
                yield (FakeChunk("lo"), {"node": "model"})

        async def collect_events():
            with patch.object(agent_module, "_build_agent", return_value=FakeAgent()):
                return [
                    event
                    async for event in agent_module.stream(
                        "hi",
                        agent_module.AgentConfig(
                            namespace=("goal_bot", "user-123"),
                            thread_id="user-123:user-123",
                        ),
                    )
                ]

        events = asyncio.run(collect_events())

        self.assertEqual(
            events,
            [
                {"type": "token", "content": "Hel", "metadata": {"node": "model"}},
                {"type": "token", "content": "lo", "metadata": {"node": "model"}},
                {"type": "done"},
            ],
        )


if __name__ == "__main__":
    unittest.main()

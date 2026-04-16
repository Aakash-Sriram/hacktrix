from __future__ import annotations

from dataclasses import dataclass
from typing import Any, AsyncIterator

from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.store.memory import InMemoryStore
from langmem import create_manage_memory_tool, create_search_memory_tool

try:
    from ..Instructions.instructions import SYSTEM_PROMPT
except ImportError:  # Allows running as a script: `python .../agent.py`
    import sys
    from pathlib import Path

    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from Instructions.instructions import SYSTEM_PROMPT


@dataclass(frozen=True, slots=True)
class AgentConfig:
    namespace: tuple[str, ...]
    thread_id: str


@dataclass(frozen=True, slots=True)
class AgentResponse:
    content: str
    raw: Any


_CHECKPOINTER = InMemorySaver()
_STORE = InMemoryStore(
    index={
        "embed": "ollama:embeddinggemma",
    }
)
_LLM = ChatOllama(
    model="gemma4:e4b",
    temperature=0.5,
)


def _build_agent(config: AgentConfig):
    memory_tools = [
        create_manage_memory_tool(namespace=config.namespace),
        create_search_memory_tool(namespace=config.namespace),
    ]
    return create_agent(
        model=_LLM,
        tools=memory_tools,
        system_prompt=SYSTEM_PROMPT,
        checkpointer=_CHECKPOINTER,
        store=_STORE,
    )


def _extract_content(result: Any) -> str:
    messages = result.get("messages") if isinstance(result, dict) else None
    if not messages:
        return str(result)

    last_message = messages[-1]
    if hasattr(last_message, "content"):
        return str(last_message.content)
    if isinstance(last_message, dict):
        return str(last_message.get("content", ""))
    return str(last_message)


async def run(user_input: str, config: AgentConfig) -> AgentResponse:
    agent = _build_agent(config)
    raw_result = await agent.ainvoke(
        {"messages": [{"role": "user", "content": user_input}]},
        config={"configurable": {"thread_id": config.thread_id}},
    )
    return AgentResponse(content=_extract_content(raw_result), raw=raw_result)


def _extract_stream_text(chunk: Any) -> str:
    if chunk is None:
        return ""
    if isinstance(chunk, str):
        return chunk

    content = getattr(chunk, "content", chunk)
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts: list[str] = []
        for item in content:
            if isinstance(item, str):
                parts.append(item)
            elif isinstance(item, dict):
                text = item.get("text")
                if isinstance(text, str):
                    parts.append(text)
        return "".join(parts)
    if isinstance(content, dict):
        text = content.get("text")
        if isinstance(text, str):
            return text
    return ""


async def stream(user_input: str, config: AgentConfig) -> AsyncIterator[dict[str, Any]]:
    agent = _build_agent(config)
    async for token, metadata in agent.astream(
        {"messages": [{"role": "user", "content": user_input}]},
        config={"configurable": {"thread_id": config.thread_id}},
        stream_mode="messages",
    ):
        content = _extract_stream_text(token)
        if content:
            yield {"type": "token", "content": content, "metadata": metadata}
    yield {"type": "done"}

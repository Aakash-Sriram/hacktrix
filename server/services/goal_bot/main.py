from __future__ import annotations

import json
import os
from pathlib import Path
import subprocess

from fastapi import FastAPI, Header, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field

from .Assistant.agent import AgentConfig, run, stream


app = FastAPI(title="Goal Bot")
APP_NAMESPACE = "goal_bot"
PROJECT_ROOT = Path(__file__).resolve().parents[3]
SUPABASE_VERIFY_SCRIPT = """
import { createClient } from '@supabase/supabase-js';

const [url, key, jwt] = process.argv.slice(1);
const client = createClient(url, key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

const { data, error } = await client.auth.getClaims(jwt);
if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(JSON.stringify(data?.claims ?? {}));
""".strip()


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    thread_id: str | None = None


class ChatResponse(BaseModel):
    content: str


def _extract_bearer_token(authorization: str | None) -> str:
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(status_code=401, detail="Invalid bearer token")

    return token


async def verify_jwt(token: str) -> tuple[str, ...]:
    cleaned_token = token.strip()
    if not cleaned_token:
        raise HTTPException(status_code=401, detail="Missing JWT")

    claims = _get_verified_claims(cleaned_token)
    user_id = claims.get("sub")
    if not isinstance(user_id, str) or not user_id:
        raise HTTPException(status_code=401, detail="JWT is missing subject claim")
    return (APP_NAMESPACE, user_id)


def _get_verified_claims(token: str) -> dict[str, object]:
    supabase_url = os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    supabase_anon_key = os.environ.get("SUPABASE_ANON_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    if not supabase_url or not supabase_anon_key:
        raise HTTPException(status_code=500, detail="Supabase environment variables are missing")

    command = [
        "node",
        "--input-type=module",
        "-e",
        SUPABASE_VERIFY_SCRIPT,
        supabase_url,
        supabase_anon_key,
        token,
    ]
    completed = subprocess.run(
        command,
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    if completed.returncode != 0:
        detail = completed.stderr.strip() or "JWT verification failed"
        raise HTTPException(status_code=401, detail=detail)

    try:
        claims = json.loads(completed.stdout)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=401, detail="Invalid claims response from verifier") from exc

    if not isinstance(claims, dict):
        raise HTTPException(status_code=401, detail="Invalid claims payload from verifier")
    return claims


def resolve_user_id(namespace: tuple[str, ...]) -> str:
    if len(namespace) < 2 or namespace[0] != APP_NAMESPACE or not namespace[1]:
        raise HTTPException(status_code=500, detail="Invalid namespace shape")
    return namespace[1]


def resolve_thread_id(namespace: tuple[str, ...], requested_thread_id: str | None) -> str:
    user_id = resolve_user_id(namespace)
    base_thread_id = (requested_thread_id or "").strip() or user_id
    return f"{user_id}:{base_thread_id}"


@app.get("/health")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(
    payload: ChatRequest,
    authorization: str | None = Header(default=None),
) -> ChatResponse:
    namespace = await verify_jwt(_extract_bearer_token(authorization))
    thread_id = resolve_thread_id(namespace, payload.thread_id)
    config = AgentConfig(namespace=namespace, thread_id=thread_id)
    response = await run(payload.message, config)
    return ChatResponse(content=response.content)


@app.websocket("/ws/chat")
async def chat_stream(websocket: WebSocket) -> None:
    await websocket.accept()#NOTE: UNCOMMENT WHEN JWT STUFF IMPLEMENTED. FOR TESTING PURPOSES ONLY, WE'LL ACCEPT ALL CONNECTIONS WITHOUT JWT VERIFICATION.
    
    # 🔥 TEMP FIX: define namespace manually
    namespace = ("goal_bot", "test_user")
    
    # authorization = websocket.headers.get("authorization")
    # if authorization is None:
    #     query_token = websocket.query_params.get("token")
    #     if query_token:
    #         authorization = f"Bearer {query_token}"

    # try:
    #     token = _extract_bearer_token(authorization)
    #     namespace = await verify_jwt(token)
    # except HTTPException:
    #     await websocket.close(code=4401)
    #     return
    # await websocket.accept()
    #NOTE: UNCOMMENT WHEN JWT STUFF IMPLEMENTED. FOR TESTING PURPOSES ONLY, WE'LL ACCEPT ALL CONNECTIONS WITHOUT JWT VERIFICATION.

    try:
        while True:
            payload = await websocket.receive_json()
            message = str(payload.get("message", "")).strip()
            raw_thread_id = payload.get("thread_id")
            if not message:
                await websocket.send_json({"type": "error", "detail": "Message is required"})
                continue

            thread_id = resolve_thread_id(namespace, str(raw_thread_id) if raw_thread_id is not None else None)
            config = AgentConfig(namespace=namespace, thread_id=thread_id)
            async for event in stream(message, config):
                await websocket.send_json(event)
    except WebSocketDisconnect:
        return

"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);

  // 🔌 Connect WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/chat");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS Connected");
      setConnected(true);
    };

    ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "token") {
        setMessages((prev) => {
        if (prev.length === 0) return prev;

        const last = prev[prev.length - 1];

        // If last message is assistant → append token
        if (last.role === "assistant") {
            return [
            ...prev.slice(0, -1),
            {
                role: "assistant",
                content: last.content + data.content,
            },
            ];
        }

        // Otherwise create new assistant message
        return [
            ...prev,
            { role: "assistant", content: data.content },
        ];
        });
    }
    };

    ws.onclose = (e) => {
      console.log("❌ WS Closed", e);
      setConnected(false);
    };

    ws.onerror = (e) => {
      console.log("⚠️ WS Error", e);
    };

    return () => {
      ws.close();
    };
  }, []);

  // 📤 Send message
  const sendMessage = () => {
    if (!input.trim()) return;

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("⚠️ WebSocket not ready");
      return;
    }

    const payload = {
      message: input,
      thread_id: "portfolio",
    };

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
    ]);

    wsRef.current.send(JSON.stringify(payload));
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between">
        <h1 className="text-lg font-semibold">AI Chat</h1>
        <span className={connected ? "text-green-400" : "text-red-400"}>
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-lg px-4 py-2 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-blue-600"
                : "mr-auto bg-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}
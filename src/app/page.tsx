"use client";

import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessages } from "@/components/ChatMessages";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from AI.");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log({ messages });

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>
      <div className="p-4 bg-gradient-to-t from-background to-transparent">
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}

"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { Message } from "./ChatMessages";
import Link from "next/link";

interface ChatInputProps {
  sendMessage: (input: string) => void;
  messages?: Message[];
}

export function ChatInput({ sendMessage, messages }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 300)}px`;
    }
  }, [input]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = messages?.length ? "70px" : "120px";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            placeholder={`${
              messages?.length ? "Reply to AskGini..." : "Message AskGini"
            }`}
            className={`${
              messages?.length ? "min-h-[70px]" : "min-h-[120px]"
            } max-h-[300px] max-sm:text-sm w-full resize-none bg-secondary/80 border-muted-foreground/20 rounded-lg pr-12 focus-visible:ring-0 focus-visible:ring-offset-0 overflow-y-auto border focus:outline-none p-3 block`}
            rows={1}
            style={{
              lineHeight: "1.5",
              overflowY: "auto",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-2"
            disabled={!input.trim()}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </form>
      <small className="block text-center mt-2 text-muted-foreground">
        Presented free by{" "}
        <Link
          href={"https://progini.ai"}
          target="_blank"
          className="text-blue-400 font-bold hover:underline transition-all"
        >
          Progini
        </Link>
      </small>
    </>
  );
}

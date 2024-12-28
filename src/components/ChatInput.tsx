"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  sendMessage: (input: string) => void;
}

export function ChatInput({ sendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
      <Textarea
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setInput(e.target.value)
        }
        placeholder="Send a message..."
        className="min-h-[60px] w-full resize-none bg-secondary/80 border-muted-foreground/20 rounded-lg pr-12 focus-visible:ring-0 focus-visible:ring-offset-0"
        rows={1}
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
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary/80"
        disabled={!input.trim()}
      >
        <SendHorizontal className="h-4 w-4 text-primary" />
      </Button>
    </form>
  );
}

import { Message } from "ai";
import { cn } from "@/lib/utils";
import { MessageSquare, UserRound } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">
          No messages yet. Start a conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex w-full items-start gap-4 rounded-lg p-4",
            message.role === "user" ? "bg-background" : "bg-muted/40"
          )}
        >
          {/* Icon for the user or bot */}
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-muted shadow">
            {message.role === "user" ? (
              <UserRound className="h-6 w-6 shrink-0" />
            ) : (
              <MessageSquare className="h-6 w-6 shrink-0" />
            )}
          </div>

          {/* Message content */}
          <div className="flex-1 space-y-2 overflow-hidden text-left">
            <p className="font-semibold">
              {message.role === "user" ? "You" : "ChatGPT"}
            </p>
            <div className="prose break-words dark:prose-invert">
              {message.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

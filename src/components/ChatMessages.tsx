import { Message } from "ai";
import { cn } from "@/lib/utils";
import { MessageSquare, UserRound } from "lucide-react";
import { useState, useEffect } from "react";

// Updated ChatMessages component
interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const [displayedMessages, setDisplayedMessages] =
    useState<Message[]>(messages);

  useEffect(() => {
    if (messages.length) {
      const lastMessage = messages[messages.length - 1];

      // Only simulate streaming if it's a bot message and not yet fully loaded
      if (
        lastMessage.role === "assistant" &&
        lastMessage.content !==
          displayedMessages[displayedMessages.length - 1]?.content
      ) {
        let i = 0;
        const intervalId = setInterval(() => {
          setDisplayedMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const updatedContent = lastMessage.content.slice(0, i);
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              content: updatedContent,
            };
            return updatedMessages;
          });
          i += 1;
          if (i > lastMessage.content.length) {
            clearInterval(intervalId);
          }
        }, 50); // Adjust the typing speed here
      }
    }
  }, [messages, displayedMessages]);

  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 rounded-md">
        <p className="text-muted-foreground text-lg font-medium">
          No messages yet. Start a conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      {displayedMessages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex w-full items-start gap-4 p-4 rounded-lg shadow-sm transition-transform hover:scale-[1.02]",
            message.role === "user"
              ? "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-50"
              : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
          )}
        >
          {/* Icon for the user or bot */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 shadow">
            {message.role === "user" ? (
              <UserRound className="h-6 w-6 text-blue-500 dark:text-blue-300" />
            ) : (
              <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </div>

          {/* Message content */}
          <div className="flex-1 space-y-1 overflow-hidden text-left">
            <p className="font-semibold text-sm">
              {message.role === "user" ? "You" : "ChatGPT"}
            </p>
            <div className="prose prose-sm break-words dark:prose-invert">
              {message.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

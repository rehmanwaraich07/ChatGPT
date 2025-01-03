import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, UserRound } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { formatMessage } from "@/lib/formatMessage";

export interface Message {
  role: string;
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  sendMessage: (input: string) => void;
  isThinking: boolean; // New prop to indicate if we're waiting for a response
}

export function ChatMessages({
  messages,
  sendMessage,
  isThinking,
}: ChatMessagesProps) {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setDisplayedMessages([]);
      return;
    }

    const lastMessage = messages[messages.length - 1];
    const lastDisplayedMessage =
      displayedMessages[displayedMessages.length - 1];

    if (
      lastMessage.role === "assistant" &&
      (!lastDisplayedMessage ||
        lastMessage.content !== lastDisplayedMessage.content)
    ) {
      setDisplayedMessages(messages.slice(0, -1));

      let i = 0;
      intervalRef.current = setInterval(() => {
        setDisplayedMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const updatedContent = lastMessage.content.slice(0, i);
          if (updatedMessages.length === messages.length) {
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              content: updatedContent,
            };
          } else {
            updatedMessages.push({
              ...lastMessage,
              content: updatedContent,
            });
          }
          return updatedMessages;
        });
        i++;
        if (i > lastMessage.content.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 50);
    } else {
      setDisplayedMessages(messages);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-gray-100 dark:bg-gray-800 p-3 sm:p-6 rounded-md">
        {/* <Image src="/logo.png" alt="AskGini Logo" width={40} height={40} /> */}

        <p className="text-muted-foreground text-lg font-medium text-center">
          How can AskGini help you today?
        </p>

        <div className="w-full mt-6">
          <ChatInput sendMessage={sendMessage} messages={messages} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex-1 space-y-3 overflow-y-auto p-2 sm:p-4 rounded-lg">
      {displayedMessages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex w-full items-start gap-2 md:gap-4 p-2 md:p-4 rounded-lg shadow-md transition-transform",
            message.role === "user"
              ? "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-50"
              : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
            {message.role === "user" ? (
              <UserRound className="h-5 w-5 text-blue-500 dark:text-blue-300" />
            ) : (
              <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </div>
          <div className="flex-1 space-y-1 overflow-hidden text-left">
            <p className="font-semibold text-sm">
              {message.role === "user" ? "You" : "AskGini"}
            </p>
            <div
              className="prose prose-sm max-sm:text-sm break-words dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: formatMessage(message.content),
              }}
            />
          </div>
        </div>
      ))}
      {isThinking && (
        <div
          className={cn(
            "flex w-full items-center gap-4 p-4 rounded-lg shadow-md transition-transform",
            "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
            <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </div>
          <div className=" prose prose-sm text-sm break-words dark:prose-invert">
            AskGini is thinking...
          </div>
        </div>
      )}
    </div>
  );
}

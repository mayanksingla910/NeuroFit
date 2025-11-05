import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { SendHorizonal, Loader2 } from "lucide-react";
import React from "react";

interface ChatInputProps {
  viewChat: boolean;
  setViewChat: (shouldView: boolean) => void;
  isSending: boolean;
  setIsSending: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendMessage: (text: string) => void;
}

export default function ChatInput({
  viewChat,
  setViewChat,
  isSending,
  handleSendMessage,
}: ChatInputProps) {
  const [chat, setChat] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleStartChat = () => {
    if (!viewChat) {
      setViewChat(true);
    }
    if(isFocused) setIsFocused(false);

    const messageText = chat.trim();

    if (messageText.length > 0 && !isSending) {
      handleSendMessage(messageText);
      setChat("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleStartChat();
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };

  return (
    <div
      className={`
        flex flex-row justify-center gap-3 
        ${viewChat
          ? "w-full bg-neutral-900/90 p-4 z-50 backdrop-blur-sm transition-all duration-300"
          : "relative p-4 md:p-0 transition-all duration-300"}
      `}
    >
      <div
        className={`
          relative w-full  focus-within:w-full md:focus-within:w-[93%]
          transition-all duration-300 origin-right group
          ${viewChat ? "w-full" : ""}
        `}
      >
        <Textarea
          placeholder="Chat with AI..."
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          rows={1}
          disabled={isSending}
          className="
            rounded-xl p-3
            min-h-5 max-h-60
            resize-none overflow-auto w-full custom-scrollbar
            bg-neutral-800 border-neutral-700 text-gray-200
          "
        />
        <Button
          type="submit"
          size="icon"
          disabled={!chat.trim() || isSending}
          onClick={handleStartChat}
          className="
            absolute right-2 top-1.5 md:top-1
            flex items-center justify-center
            rounded-full
            bg-transparent hover:bg-neutral-700/50
            text-gray-200
            opacity-0 transition-all
            origin-right duration-300
            group-focus-within:opacity-100
            group-focus-within:scale-100
            disabled:opacity-0 
            group-focus-within:disabled:opacity-60
          "
        >
          {isSending ? (
            <Loader2 className="w-5 h-5 animate-spin stroke-green-500" />
          ) : (
            <SendHorizonal className="w-5 h-5 stroke-green-500" />
          )}
        </Button>
      </div>

      {!viewChat && (
        <Button
          onClick={handleStartChat}
          className={`
            hidden md:flex items-center justify-center
            rounded-xl p-3 
            h-max max-h-fit
            bg-green-600/90 hover:bg-green-600/70 text-gray-200 
            transition-all duration-200 ease-in-out
            origin-right
            ${isFocused
              ? "opacity-0 w-0 pointer-events-none"
              : "opacity-100 sm:w-[18%] md:w-[15%] lg:w-[12%] pointer-events-auto"}
          `}
        >
          Start Chat
          <SendHorizonal className="w-5 h-5 ml-1" />
        </Button>
      )}
    </div>
  );
}

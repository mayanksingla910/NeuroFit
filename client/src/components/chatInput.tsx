// @/components/chatInput.tsx
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { SendHorizonal, Loader2 } from "lucide-react";
import React from 'react'; 

interface ChatInputProps {
  viewChat: boolean;
  setViewChat: (shouldView: boolean) => void; 
  isSending: boolean; 
  setIsSending: React.Dispatch<React.SetStateAction<boolean>>; 
  handleSendMessage: (text: string) => void; 
}

export default function ChatInput({ viewChat, setViewChat, isSending, handleSendMessage }: ChatInputProps) {
  const [chat, setChat] = useState("");

  const handleStartChat = () => {
    if (!viewChat) {
        setViewChat(true);
    }
    
    const messageText = chat.trim();

    if (messageText.length > 0 && !isSending) {
        handleSendMessage(messageText); 
        setChat(""); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleStartChat();
    }
  }

  return (
    <div
      className={`
        flex flex-row justify-center gap-3 group 
        ${viewChat 
          ? " w-full bg-neutral-900/90 p-4 z-50 backdrop-blur-sm transition-all duration-300" 
          : "relative p-4 md:p-0 transition-all duration-300" 
        }
      `}
    >

      <div
        className={`
          relative w-[95%] md:w-[80%] lg:w-[85%]
          focus-within:w-[93%]
          transition-all duration-300 origin-right 
          ${viewChat ? "w-full" : ""}
        `}
      >
        <Textarea
          placeholder="Chat with AI..."
          value={chat}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChat(e.target.value)}
          onKeyDown={handleKeyDown} 
          rows={1}
          disabled={isSending} 
          className="
            rounded-xl p-3
            min-h-5 max-h-60
            resize-none overflow-auto w-full  custom-scrollbar
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
          className="
            hidden md:flex
            sm:w-[18%] md:w-[15%] lg:w-[12%]
            rounded-xl p-3 
            h-max max-h-fit
            transition-all duration-300 origin-left
            bg-green-600/90 hover:bg-green-600/70 text-gray-200
            group-focus-within:w-0 group-focus-within:opacity-0
          "
        >
          Start Chat
          <SendHorizonal className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
}
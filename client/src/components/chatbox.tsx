import { X, Loader2, Minus } from "lucide-react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatboxProps {
  setViewChat: (shouldView: boolean) => void;
  handleCloseChat: () => void; 
  isSending: boolean; 
  messages: Message[]; 
}
export default function Chatbox({ setViewChat, handleCloseChat, isSending, messages }: ChatboxProps) {
  const handleMinimize = () => {
    setViewChat(false); 
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const chatboxVariants = {
    hidden: { y: "100%", opacity: 1},
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 }},
    exit: { y: "100%", opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="fixed inset-0 w-full h-full bg-neutral-900/95 backdrop-blur-md z-40" 
      variants={chatboxVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col h-full max-w-4xl px-auto p-4 md:p-8">
        
        <header className="flex justify-between items-center pb-4 border-b border-neutral-700">
          <h2 className="text-2xl font-bold text-green-500">
            AI Assistant Chat
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={handleMinimize}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Minus className="w-6 h-6" />
            </Button>
            <Button
              onClick={handleCloseChat} 
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar">
          <p className="text-neutral-400 text-center text-sm italic mb-4">
            Hello! I'm your AI fitness assistant. I'm ready for your questions.
          </p>
          
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`p-3 rounded-xl max-w-sm md:max-w-md shadow-md
                  ${msg.sender === 'user' 
                    ? 'bg-green-700/80 text-white rounded-tr-none' 
                    : 'bg-neutral-700 text-gray-200 rounded-tl-none'
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex justify-start">
              <div className="bg-neutral-700/50 text-gray-400 p-3 rounded-xl rounded-tl-none max-w-md flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin stroke-green-500" />
                AI is typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="h-20"></div>
      </div>
    </motion.div>
  );
}
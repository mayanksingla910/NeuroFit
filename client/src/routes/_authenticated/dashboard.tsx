import Chatbox from "@/components/chatbox";
import ChatInput from "@/components/chatInput";
import WeightChart from "@/components/weightChart";
import WelcomeCard from "@/components/welcomeCard";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useContext } from "react";
import DayPlan from "@/components/dayPlan";
import { AnimatePresence, motion } from "framer-motion";
import ChatBubble from "@/components/chatbubble";
import { UserContext } from "@/context/userContext";

const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [viewChat, setViewChat] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const { user } = useContext(UserContext);

  useScrollLock(viewChat && !isMinimized);


  const handleSendMessage = async (text: string) => {
  const newUserMessage: Message = {
    id: Date.now().toString(),
    text,
    sender: "user",
  };

  // Add user message to UI
  setMessages((prev) => [...prev, newUserMessage]);
  setIsSending(true);

  try {
    const res = await fetch("https://neurofit-1-x7uk.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    const newAiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: data.reply,
      sender: "ai",
    };

    setMessages((prev) => [...prev, newAiMessage]);
  } catch (error) {
    console.error("Error:", error);

    const errorMessage: Message = {
      id: (Date.now() + 2).toString(),
      text: "Something went wrong. Please try again.",
      sender: "ai",
    };

    setMessages((prev) => [...prev, errorMessage]);
  }

  setIsSending(false);
};
  const handleSetViewChat = (shouldView: boolean) => {
    if (shouldView) {
      setViewChat(true);
      setIsMinimized(false);
    } else {
      setViewChat(false);
      setIsMinimized(true);
    }
  };

  const handleCloseChat = () => {
    setViewChat(false);
    setIsMinimized(false);
    setMessages([]);
  };

  return (
    <div>
      <main
        className={`
          space-y-6 transition-filter duration-300
          ${viewChat && !isMinimized ? "mb-28 opacity-30 pointer-events-none" : ""} 
          `}
      >
        <WelcomeCard user ={user}/>
        <ChatInput
          viewChat={viewChat && !isMinimized}
          setViewChat={handleSetViewChat}
          isSending={isSending}
          setIsSending={setIsSending}
          handleSendMessage={handleSendMessage}
        />
        <DayPlan />
        <WeightChart />
      </main>

      <AnimatePresence>
        {viewChat && !isMinimized && (
          <Chatbox
            setViewChat={handleSetViewChat}
            handleCloseChat={handleCloseChat}
            isSending={isSending}
            messages={messages}
          />
        )}
      </AnimatePresence>
      {viewChat && !isMinimized && (
        <motion.div
          className={`w-full bottom-5 z-50 sticky`}
          animate={{ y: viewChat && !isMinimized ? 0 : "100%" }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <ChatInput
            viewChat={viewChat && !isMinimized}
            setViewChat={handleSetViewChat}
            isSending={isSending}
            setIsSending={setIsSending}
            handleSendMessage={handleSendMessage}
          />
        </motion.div>
      )}
      <AnimatePresence>
        {isMinimized && <ChatBubble setViewChat={handleSetViewChat} />}
      </AnimatePresence>
    </div>
  );
}

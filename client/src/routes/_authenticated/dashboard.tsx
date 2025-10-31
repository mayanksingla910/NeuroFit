import Chatbox from "@/components/chatbox";
import ChatInput from "@/components/chatInput";
import Navbar from "@/components/navbar";
import WeightChart from "@/components/weightChart";
import WelcomeCard from "@/components/welcomeCard";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import DayPlan from "@/components/dayPlan";
import { AnimatePresence, motion } from "framer-motion";
import ChatBubble from "@/components/chatbubble";

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

  useScrollLock(viewChat && !isMinimized);

  const mockAiResponse = (userMessage: string): string => {
    if (userMessage.toLowerCase().includes("macros")) {
      return "Based on your goal to lose weight, your target macros are 180g Protein, 150g Carbs, and 60g Fat.";
    }
    if (userMessage.toLowerCase().includes("workout")) {
      return "Your personalized workout for today is a Full Body Circuit: Warm-up, 3 sets of Squats, Bench Press, and Rows, followed by a cool-down stretch.";
    }
    return "I'm not sure how to respond to that, but I can help you with your fitness goals, macros, and workout plans!";
  };

  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsSending(true);

    setTimeout(() => {
      const aiResponseText = mockAiResponse(text);
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: "ai",
      };

      setMessages((prev) => [...prev, newAiMessage]);
      setIsSending(false);
    }, 1500);
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
    <div className="min-h-screen bg-neutral-900 text-white font-inter">

      <Navbar />

      <main
        className={`
          w-full md:w-[95%] mx-auto px-6 py-12 space-y-10 transition-filter duration-300
          ${viewChat && !isMinimized ? "mb-28 opacity-30 pointer-events-none" : ""} 
          `}
      >
        <WelcomeCard />
        <motion.div
          className={`w-full bottom-0 z-50 `}
          animate={{ y: viewChat && !isMinimized ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChatInput
            viewChat={viewChat && !isMinimized}
            setViewChat={handleSetViewChat}
            isSending={isSending}
            setIsSending={setIsSending}
            handleSendMessage={handleSendMessage}
          />
        </motion.div>
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
          className={`w-full bottom-0 z-50 absolute`}
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

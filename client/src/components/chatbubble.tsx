import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";


interface ChatBubbleProps {
  setViewChat: (shouldView: boolean) => void; 
}


export default function ChatBubble({ setViewChat }: ChatBubbleProps) {
  
  const handleOpen = () => {
    setViewChat(true); 
  };
  
  const bubbleVariants = {
    hidden: { x: 50, y: 50, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 120, damping: 14 } },
    exit: { x: 50, y: 50, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-50 shadow-2xl"
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Button
        onClick={handleOpen}
        className="
          size-14 rounded-full flex items-center justify-center 
          bg-green-600 hover:bg-green-500 
          text-white 
          p-0
        "
      >
        <MessageSquare className="w-7 h-7" />
      </Button>
    </motion.div>
  );
}
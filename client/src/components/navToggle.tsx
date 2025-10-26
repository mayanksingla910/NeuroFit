import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function NavToggle({
  onClick,
  isExpanded,
}: {
  onClick: () => void;
  isExpanded: boolean;
}) {
  const top = useAnimation();
  const bottom = useAnimation();

  useEffect(() => {
    const animateSequence = async () => {
      if (isExpanded) {
        await Promise.all([
          top.start({ y: 0, transition: { duration: 0.15, ease: "easeInOut" } }),
          bottom.start({ y: 0, transition: { duration: 0.15, ease: "easeInOut" } }),
        ]);
        await Promise.all([
          top.start({ rotate: 45, transition: { duration: 0.15, ease: "easeInOut" } }),
          bottom.start({ rotate: -45, transition: { duration: 0.15, ease: "easeInOut" } }),
        ]);
      } else {
        await Promise.all([
          top.start({ rotate: 0, transition: { duration: 0.15, ease: "easeInOut" } }),
          bottom.start({ rotate: 0, transition: { duration: 0.15, ease: "easeInOut" } }),
        ]);
        await Promise.all([
          top.start({ y: -6, transition: { duration: 0.15, ease: "easeInOut" } }),
          bottom.start({ y: 6, transition: { duration: 0.15, ease: "easeInOut" } }),
        ]);
      }
    };

    animateSequence();
  }, [isExpanded, top, bottom]);

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col justify-center items-center h-6 w-6 cursor-pointer"
    >
      <motion.div
        animate={top}
        className="absolute h-0.5 w-5 rounded-full bg-green-500"
      />
      <motion.div
        animate={bottom}
        className="absolute h-0.5 w-5 rounded-full bg-green-500"
      />
    </div>
  );
}

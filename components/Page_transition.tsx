"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Optimized transition variants to minimize performance impact
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

// Optimized transition settings for smooth performance
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Alternative: More sophisticated transition with stagger effect for sections
export function PageTransitionAdvanced({ children }: PageTransitionProps) {
  const pathname = usePathname();

  const containerVariants = {
    initial: { opacity: 0 },
    in: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    out: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.5,
      },
    },
    out: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={containerVariants}
        className="w-full"
      >
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Lightweight fade transition for better performance
export function PageTransitionLite({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
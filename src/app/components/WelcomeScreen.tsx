import React from "react";
import {
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { InputBox } from "./InputBox";
import { SUGGESTIONS } from "../constants/suggestions";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
  isLoading?: boolean;
}

export function WelcomeScreen({
  onSelectPrompt,
  isLoading,
}: WelcomeScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-[1024px] mx-auto w-full">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="size-16 bg-primary rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Sparkles className="size-8 text-primary-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-foreground font-bold mb-2 welcome-landscape-hide">
          Welcome to AI Chatbot
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-10">
          Your minimalist, high-performance companion for
          intelligent exploration and creative production.
        </p>

        <div className="mb-6 text-left">
          <InputBox
            onSend={onSelectPrompt}
            isLoading={isLoading}
            isFixed={false}
          />
        </div>
      </motion.div>

      <nav className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl" aria-label="Quick start suggestions">
        {SUGGESTIONS.map((item, index) => (
          <motion.button
            key={item.title}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? undefined : { delay: index * 0.1 }}
            onClick={() => onSelectPrompt(item.desc)}
            aria-label={`${item.title}: ${item.desc}`}
            className="group p-3 min-h-[44px] bg-card border border-border rounded-xl hover:border-border/60 hover:shadow-sm transition-all text-left flex items-center gap-3 justify-center focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <item.icon className="size-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
            <span className="text-xs font-semibold text-foreground">
              {item.title}
            </span>
          </motion.button>
        ))}
      </nav>
    </div>
  );
}
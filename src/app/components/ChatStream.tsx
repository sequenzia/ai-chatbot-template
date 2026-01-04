import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatStreamProps {
  messages: Message[];
}

export function ChatStream({ messages }: ChatStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto pt-20 pb-52">
      <div className="max-w-[1024px] mx-auto px-4 md:px-8 space-y-8">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Content */}
            <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl ${
                message.role === 'assistant'
                  ? 'p-4 md:p-5 bg-card border border-border shadow-sm text-card-foreground'
                  : 'py-2.5 px-5 bg-primary text-primary-foreground shadow-md'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
              </div>
              <span className="mt-2 text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-1">
                {message.role === 'assistant' ? 'AI Assistant' : 'You'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
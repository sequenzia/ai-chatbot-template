import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: 'sending' | 'sent' | 'error';
}

interface ChatStreamProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatStream({ messages, isLoading }: ChatStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [messages, prefersReducedMotion]);

  return (
    <div ref={scrollRef} data-chat-stream className="flex-1 overflow-y-auto pt-20 pb-52">
      <div className="max-w-[calc(100%-2rem)] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-[1024px] mx-auto px-4 md:px-8 space-y-8">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
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
              {/* Error state indicator */}
              {message.status === 'error' && (
                <div className="flex items-center gap-2 mt-2 text-destructive text-xs">
                  <svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Failed to send. Tap to retry.</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
            role="status"
            aria-label="AI is thinking"
          >
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex gap-1">
                <span className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Screen reader announcements */}
      <div aria-live="polite" className="sr-only">
        {messages.length > 0 && messages[messages.length - 1].role === 'assistant' &&
          `AI Assistant: ${messages[messages.length - 1].content}`
        }
      </div>
      {isLoading && <span className="sr-only" aria-live="polite">AI is thinking...</span>}
    </div>
  );
}
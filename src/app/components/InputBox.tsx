import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, ChevronDown, Lightbulb } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SUGGESTIONS } from "../constants/suggestions";

interface InputBoxProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  isFixed?: boolean;
}

export function InputBox({
  onSend,
  isLoading,
  isFixed = true,
}: InputBoxProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [selectedModel, setSelectedModel] = useState("GPT-5-Nano");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const modelSelectorRef = useRef<HTMLDivElement>(null);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (modelSelectorRef.current && !modelSelectorRef.current.contains(event.target as Node)) {
        setShowModelSelector(false);
      }
    };

    if (showSuggestions || showModelSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions, showModelSelector]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (desc: string) => {
    onSend(desc);
    setShowSuggestions(false);
  };

  const models = ["GPT-5-Nano", "GPT-5-Mini"];

  return (
    <div
      className={
        isFixed
          ? "absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
          : "w-full z-30"
      }
    >
      <div
        className={
          isFixed
            ? "max-w-[1024px] mx-auto px-4 pb-8 md:pb-10 pt-10"
            : "w-full"
        }
      >
        {/* Suggestions Popup - Only show when isFixed (after welcome screen) */}
        <AnimatePresence>
          {showSuggestions && isFixed && (
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto mb-4 bg-card/95 dark:bg-card/90 backdrop-blur-xl rounded-2xl border border-border shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-4"
            >
              <div className="flex items-center gap-2 mb-3 px-2">
                <Lightbulb className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Suggested Prompts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSuggestionClick(item.desc)}
                    className="group p-3 bg-muted/30 hover:bg-muted/60 border border-border/50 hover:border-border rounded-lg transition-all text-left flex items-start gap-3"
                  >
                    <item.icon className="size-4 text-muted-foreground group-hover:text-foreground mt-0.5 shrink-0" />
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-xs font-semibold text-foreground">
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-2">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`pointer-events-auto relative group ${!isFixed && "shadow-lg rounded-[32px]"}`}
        >
          {/* Glassmorphism Background Layer */}
          <div className="absolute inset-0 bg-card/70 dark:bg-card/40 backdrop-blur-xl rounded-[32px] border border-border/20 dark:border-border/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all group-focus-within:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:group-focus-within:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group-focus-within:border-border" />

          <div className="relative p-2 md:p-3 flex flex-col">
            {/* Input Area */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isFixed ? "Reply..." : "How can I help you today?"}
              className="w-full bg-transparent border-none outline-none focus:ring-0 resize-none px-4 py-3 text-foreground placeholder:text-muted-foreground max-h-[200px] overflow-y-auto min-h-[56px] text-base"
            />

            {/* Bottom Bar: Tools & Actions */}
            <div className="flex items-center justify-between px-2 pb-1 pt-2">
              {/* Left: Attachments */}
              <div className="flex gap-1">
                <button className="p-2 hover:bg-accent/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                  <Paperclip className="size-5" />
                </button>
                {/* Only show lightbulb when isFixed (after welcome screen) */}
                {isFixed && (
                  <button
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className={`p-2 hover:bg-accent/50 rounded-lg transition-colors ${
                      showSuggestions
                        ? "bg-accent/50 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Lightbulb className="size-5" />
                  </button>
                )}
              </div>

              {/* Right: Model Selector & Send */}
              <div className="flex items-center gap-3 relative">
                <div ref={modelSelectorRef} className="relative">
                  <button
                    onClick={() => setShowModelSelector(!showModelSelector)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-accent/50 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {selectedModel}
                    <ChevronDown className="size-3" />
                  </button>

                  {/* Model Selector Dropdown */}
                  <AnimatePresence>
                    {showModelSelector && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full right-0 mb-2 bg-popover/95 backdrop-blur-xl border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px]"
                      >
                        {models.map((model) => (
                          <button
                            key={model}
                            onClick={() => {
                              setSelectedModel(model);
                              setShowModelSelector(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm font-medium transition-colors ${
                              selectedModel === model
                                ? "bg-accent text-foreground"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            }`}
                          >
                            {model}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                    input.trim()
                      ? "bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-md"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ChatStream, Message } from "./components/ChatStream";
import { InputBox } from "./components/InputBox";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Mock AI Response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a mock response from AI Chat. In a production environment, this would be connected to a real LLM response.`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <ThemeProvider>
      <div
        className="flex h-screen w-full bg-background text-foreground font-sans antialiased overflow-hidden transition-colors duration-200"
        style={{
          paddingBottom: 'var(--safe-area-inset-bottom)',
          paddingLeft: 'var(--safe-area-inset-left)',
          paddingRight: 'var(--safe-area-inset-right)',
        }}
      >
        {/* Sidebar Component */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onNewChat={startNewChat}
          showWelcomeScreen={messages.length === 0}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative h-screen min-w-0">
          {messages.length === 0 ? (
            <WelcomeScreen
              onSelectPrompt={handleSendMessage}
              isLoading={isLoading}
            />
          ) : (
            <ChatStream messages={messages} isLoading={isLoading} />
          )}

          {/* Floating Input Box */}
          {messages.length > 0 && (
            <InputBox
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
          )}

          {/* Subtle Background Decoration for "Depth" */}
          <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-gradient-to-bl from-muted/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-gradient-to-tr from-muted/20 to-transparent pointer-events-none" />
        </main>
      </div>
    </ThemeProvider>
  );
}
"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Bhuvansai’s AI assistant. Ask me anything about his projects, skills, or background! 🤖",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Auto-open on desktop, show badge on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.innerWidth >= 768;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (isDesktop) {
      const handleUserInteraction = () => {
        if (timeout) return;
        timeout = setTimeout(() => {
          setIsOpen(true);
          setShowBadge(false);
        }, 5000);

        window.removeEventListener("scroll", handleUserInteraction);
        window.removeEventListener("mousemove", handleUserInteraction);
        window.removeEventListener("click", handleUserInteraction);
      };

      window.addEventListener("scroll", handleUserInteraction);
      window.addEventListener("mousemove", handleUserInteraction);
      window.addEventListener("click", handleUserInteraction);

      return () => {
        if (timeout) clearTimeout(timeout);
        window.removeEventListener("scroll", handleUserInteraction);
        window.removeEventListener("mousemove", handleUserInteraction);
        window.removeEventListener("click", handleUserInteraction);
      };
    }
  }, []);

  const getResponse = async (question: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      return data.answer;
    } catch (error) {
      return "Oops! Something went wrong. Please try again later.";
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const response = await getResponse(text);

    const botMessage: Message = {
      id: Date.now() + 1,
      text: response,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowBadge(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          theme === "dark"
            ? "black/10 hover:bg-black/20 text-black"
            : "black/10 hover:bg-black/20 text-white"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ display: isOpen ? "none" : "flex" }}
      >
        <FiMessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white shadow">
            1
          </span>
        )}
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-8 sm:right-8 z-50 sm:w-96 h-[80vh] sm:h-[600px] rounded-2xl shadow-2xl overflow-hidden ${
              theme === "dark"
                ? "bg-black/90 backdrop-blur-md border border-white/20"
                : "bg-black/90 backdrop-blur-md border border-white/20"
            }`}
          >
            {/* Header */}
            <div
              className={`p-4 sm:p-6 border-b flex items-center justify-between ${
                theme === "dark"
                  ? "border-white/20 bg-white/5"
                  : "border-white/20 bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/90 flex items-center justify-center">
                    <FiMessageSquare className="text-white text-sm sm:text-lg" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className={`font-semibold text-sm sm:text-base ${isDark ? "text-white" : "text-black"}`}>
                    Bhuvansai's Assistant
                  </h3>
                  <p className={`text-xs sm:text-sm ${isDark ? "text-white/60" : "text-black/60"}`}>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-full transition-colors ${
                  isDark ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/60"
                }`}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4"
              style={{ height: "calc(100% - 200px)" }}
            >
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 sm:gap-3 max-w-[85%] ${message.isUser ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser
                          ? "bg-black/90 text-white"
                          : "bg-black/10 text-black"
                      }`}
                    >
                      {message.isUser ? (
                        <FiUser className="text-white text-xs sm:text-sm" />
                      ) : (
                        <FiMessageSquare className="text-white text-xs sm:text-sm" />
                      )}
                    </div>
                    <div
                      className={`p-5 sm:p-6 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[120%] ${
                        message.isUser
                          ? "bg-black/90 text-white rounded-br-md"
                          : isDark
                          ? "bg-white/10 text-white rounded-bl-md"
                          : "bg-gray-100 text-black rounded-bl-md"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/90 flex items-center justify-center">
                      <FiMessageSquare className="text-white text-xs sm:text-sm" />
                    </div>
                    <div
                      className={`p-3 sm:p-4 rounded-2xl rounded-bl-md ${theme === "dark" ? "bg-white/10" : "bg-white/10"}`}
                    >
                      <div className="flex gap-1">
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-white/60" : "bg-white/60"}`}
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-white/60" : "bg-white/60"}`}
                          style={{ animationDelay: "3ms" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className={`p-6 sm:p-6 border-t ${theme === "light" ? "border-gray-200 bg-black/50" : "border-white/20 bg-white/5"}`}
            >
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 transition-all ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white placeholder-white/50"
                      : "bg-white border-gray-200 text-black placeholder-black/50"
                  }`}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FiSend className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

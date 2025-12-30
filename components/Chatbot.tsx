'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Welcome to datavruti! I\'m your AI assistant specializing in global data talent recruitment.\n\nWhether you\'re looking to hire top data professionals or exploring career opportunities, I\'m here to help. What brings you here today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hide scroll-to-top button on mobile when chatbot is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('chatbot-open');
    } else {
      document.body.classList.remove('chatbot-open');
    }
    return () => {
      document.body.classList.remove('chatbot-open');
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us directly.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: '👋 Welcome to datavruti! I\'m your AI assistant specializing in global data talent recruitment.\n\nWhether you\'re looking to hire top data professionals or exploring career opportunities, I\'m here to help. What brings you here today?',
      },
    ]);
    setInput('');
  };

  const quickQuestions = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: 'Need to Hire?',
      message: 'I need to hire data professionals for my company'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      text: 'Looking for Jobs?',
      message: 'I\'m a candidate looking for data/analytics opportunities'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'About datavruti',
      message: 'Tell me about datavruti and your services'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Success Stories',
      message: 'Do you have any case studies or client testimonials?'
    },
  ];

  const handleQuickQuestion = async (message: string) => {
    const userMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us directly.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render message content with clickable links (URLs, emails, phone numbers, routes)
  const renderMessageContent = (content: string) => {
    // Combined regex to match URLs, emails, phone numbers, and routes
    const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+?\d{1,4}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}|\/[a-z-]+(?:\/[a-z0-9-]+)*)/gi;
    const parts = content.split(linkRegex);

    return parts.map((part, index) => {
      if (!part) return null;

      // Check if it's a URL (http/https or www)
      if (part.match(/^(https?:\/\/|www\.)/i)) {
        const href = part.startsWith('www.') ? `https://${part}` : part;
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 underline font-medium transition-colors"
          >
            {part}
          </a>
        );
      }

      // Check if it's an email
      if (part.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-accent-600 hover:text-accent-700 underline font-medium transition-colors"
          >
            {part}
          </a>
        );
      }

      // Check if it's a phone number
      if (part.match(/^\+?\d{1,4}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/)) {
        const cleanPhone = part.replace(/[\s-()]/g, '');
        return (
          <a
            key={index}
            href={`tel:${cleanPhone}`}
            className="text-accent-600 hover:text-accent-700 underline font-medium transition-colors"
          >
            {part}
          </a>
        );
      }

      // Check if it's a route (starts with /)
      if (part.match(/^\/[a-z-]+(?:\/[a-z0-9-]+)*$/i)) {
        return (
          <Link
            key={index}
            href={part}
            className="text-accent-600 hover:text-accent-700 underline font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {part}
          </Link>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chatbot Toggle Button - Slim side tab for mobile, round for desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 group transition-all duration-500 ${
          isOpen ? 'md:scale-0 md:rotate-180' : 'scale-100 rotate-0'
        } right-0 bottom-[6.25rem] md:right-8 md:bottom-8`}
        aria-label="Open chat"
      >
        {/* Mobile: Slim vertical tab */}
        <div className="md:hidden">
          <div className="relative">
            {/* Main button */}
            <div className="relative w-12 h-16 bg-accent rounded-l-2xl shadow-2xl flex items-center justify-center border-l-2 border-t-2 border-b-2 border-white/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {/* Notification badge */}
              <div className="absolute -top-1 -left-1 w-5 h-5 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Round button */}
        <div className="hidden md:block relative">
          {/* Main button */}
          <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-accent/50 group-hover:scale-110 transition-all duration-300 border-2 border-accent">
            {/* Icon container */}
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>

            {/* Notification badge with pulse */}
            <div className="absolute -top-1 -right-1 flex items-center justify-center">
              <span className="absolute w-5 h-5 bg-primary rounded-full animate-ping opacity-75"></span>
              <span className="relative w-5 h-5 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">1</span>
            </div>
          </div>
        </div>
      </button>

      {/* Chatbot Window - Ultra Modern Design */}
      {isOpen && (
        <div className="fixed bottom-[6.5625rem] md:bottom-8 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] md:w-[28rem] h-[36rem] flex flex-col animate-scale-in origin-bottom-right">
          {/* Container */}
          <div className="relative flex flex-col h-full bg-white rounded-3xl shadow-2xl border-2 border-neutral-200 overflow-hidden">

            {/* Header - Solid color */}
            <div className="relative bg-accent p-6 shadow-lg">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Avatar with status indicator */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    {/* Online status */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white">datavruti AI</h3>
                    <div className="flex items-center space-x-1 text-white/90 text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Online • Responds instantly</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons - Reset and Close */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
                    aria-label="Reset chat"
                    title="Reset conversation"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 border border-white/20"
                    aria-label="Close chat"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area - Modern scrollbar */}
            <div className="relative flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-neutral-50 custom-scrollbar">
              {messages.length === 1 && (
                <div className="mb-4">
                  <p className="text-xs text-center text-neutral-500 mb-4">Quick questions:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(q.message)}
                        className="px-4 py-2 bg-white hover:bg-accent-50 border border-neutral-200 hover:border-accent-300 rounded-xl text-sm text-neutral-700 hover:text-accent-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center space-x-2"
                      >
                        <span>{q.icon}</span>
                        <span>{q.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`flex items-end space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-md ${
                        message.role === 'user'
                          ? 'bg-accent text-white rounded-br-md'
                          : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {renderMessageContent(message.content)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-end space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-bounce delay-100"></div>
                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Modern design with glassmorphism */}
            <div className="relative p-4 bg-white/80 backdrop-blur-sm border-t border-neutral-200/50">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-5 py-3 bg-white border-2 border-neutral-200 hover:border-accent-300 focus:border-accent-500 rounded-2xl outline-none transition-all duration-300 text-base shadow-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-5 py-3 bg-accent text-white rounded-2xl hover:bg-accent-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  <svg
                    className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
       
            </div>
          </div>
        </div>
      )}
    </>
  );
}

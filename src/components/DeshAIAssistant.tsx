'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import { aiAnswerQuestion } from '@/services/aiService';

interface DeshAIAssistantProps {
  currentDestinationName?: string;
  currentBudget?: number;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function DeshAIAssistant({
  currentDestinationName = 'Manali',
  currentBudget = 50000,
}: DeshAIAssistantProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Namaste! I’m Desh AI — your personal India travel concierge. How can I optimize your trip to ${currentDestinationName} today?`,
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const SUGGESTED_PROMPTS = [
    `Can we reduce the budget by ₹5,000?`,
    `Find a cheaper hotel in ${currentDestinationName}.`,
    `What’s the cheapest way to reach ${currentDestinationName}?`,
    `Suggest authentic local food stops.`,
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    const answer = await aiAnswerQuestion(query, {
      destinationName: currentDestinationName,
      budget: currentBudget,
    });

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-600 text-white font-bold shadow-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-blue-400"
        title="Ask Desh AI Assistant"
      >
        <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-white/40">
          <Image src="/logo.jpg" alt="Desh AI" fill className="object-cover" />
        </div>
        <span className="text-xs font-bold pr-1 hidden sm:inline">Desh AI</span>
      </button>

      {/* Floating Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col h-[500px] animate-in slide-in-from-bottom duration-200 overflow-hidden text-slate-800">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-blue-400">
                <Image src="/logo.jpg" alt="Desh AI Logo" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-serif-heading font-bold text-sm text-white">Desh AI Assistant</h4>
                <span className="text-[10px] text-blue-300 block font-medium">Context Aware ({currentDestinationName})</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-1">
                    AI
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  {m.text}
                  <span className="block text-[9px] opacity-60 mt-1 text-right">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[10px] text-blue-600 font-semibold italic">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>Desh AI is processing...</span>
              </div>
            )}
          </div>

          {/* Prompt Pills */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all inline-block shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask Desh AI about ${currentDestinationName}...`}
              className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

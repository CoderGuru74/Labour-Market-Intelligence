'use client';

import { useState } from 'react';
import { Bot, Send, User, Info } from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hello. I am the LMIS AI Assistant. I can explain skill forecast models, district gaps, and scenario calculations based on database records.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Grounded mock response
    setTimeout(() => {
      const assistantMsg = {
        sender: 'assistant',
        text: `Based on current MSDE records for Solar PV Technicians in Patna, Bihar: Forecast Demand is 8,200 individuals while annual training seat capacity is 3,100, leaving a projected gap of 5,100 (62% deficit). Increasing capacity by 1,500 seats at an 80% completion rate reduces the gap to 3,900.`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="bg-white border border-slate-200 p-4 rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-slate-700" />
          <div>
            <h1 className="text-sm font-bold text-slate-900">AI Planner Assistant</h1>
            <p className="text-[11px] text-slate-500">Grounded in database metrics & ML forecast outputs</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1">
          <Info className="w-3 h-3 text-blue-700" />
          <span>Strict Grounding: Enabled</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white border border-slate-200 h-[420px] rounded-sm p-4 overflow-y-auto space-y-3 text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-slate-700" />
              </div>
            )}
            <div
              className={`p-3 rounded-sm max-w-lg ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-slate-700" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 p-2 rounded-sm">
        <input
          type="text"
          placeholder="Ask about district skill gaps or scenario results..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 text-xs focus:outline-none px-2 text-slate-800"
        />
        <button
          onClick={handleSend}
          className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-sm text-xs font-medium flex items-center gap-1"
        >
          <span>Send</span>
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
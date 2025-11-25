import React, { useState, FormEvent } from 'react';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-[#0B0F19] border-t border-white/5">
      <div className="max-w-4xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
          <div className="relative flex-1 bg-[#1E293B] rounded-2xl border border-white/10 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje aquí..."
              rows={1}
              className="w-full bg-transparent text-white placeholder-gray-500 px-4 py-4 min-h-14 max-h-32 resize-none focus:outline-none scrollbar-hide text-base"
              style={{ minHeight: '56px' }}
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="h-14 w-14 flex items-center justify-center bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white transition-all shadow-lg shadow-blue-600/20 shrink-0"
          >
            <SendHorizontal className="w-6 h-6 ml-0.5" />
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-600">MyAI puede cometer errores. Verifica la información importante.</p>
        </div>
      </div>
    </div>
  );
};
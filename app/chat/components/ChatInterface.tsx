"use client";

import { useState, useEffect, useRef } from 'react';
import { Menu, ArrowLeft, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChatSidebar } from './ChatSidebar';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { ChatHeaderMenu } from './ChatHeaderMenu';
import CreateCharacterModal, { CharacterData } from '@/app/components/CreateCharacterModal';
import DeleteChatModal from './DeleteChatModal';
import { Message, Character } from '../../types/chat';

interface ExtendedCharacter extends Character {
  systemPrompt: string;
}

const MOCK_CHARACTER: ExtendedCharacter = {
  id: 'clara',
  name: 'Clara, la bióloga marina',
  role: 'Experta en Océanos',
  status: 'online',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  systemPrompt: 'Eres Clara, una bióloga marina apasionada...'
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: '¡Hola! Soy Clara. Me emociona hablar sobre las maravillas del océano. ¿Qué te gustaría descubrir hoy?',
    timestamp: new Date()
  },
  {
    id: '2',
    role: 'user',
    content: 'Hola Clara. Siempre me han fascinado los arrecifes de coral. ¿Podrías contarme algo interesante sobre ellos?',
    timestamp: new Date()
  },
  {
    id: '3',
    role: 'assistant',
    content: '¡Por supuesto! Los arrecifes de coral son a menudo llamados "selvas tropicales del mar" por su increíble biodiversidad. Aunque cubren menos del 1% del fondo oceánico, albergan a casi el 25% de la vida marina del planeta. ¡Es fascinante!',
    timestamp: new Date()
  }
];

export default function ChatInterface() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editingCharacter, setEditingCharacter] = useState<CharacterData | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "¡Qué interesante! Cuéntame más sobre eso.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const handleNewChat = () => {
    setEditingCharacter(null);
    setIsModalOpen(true);
  };

  const handleEditChat = () => {
    setEditingCharacter({
      id: MOCK_CHARACTER.id,
      name: MOCK_CHARACTER.name,
      systemPrompt: MOCK_CHARACTER.systemPrompt,
      avatar: MOCK_CHARACTER.avatar
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setMessages([]);
    setIsDeleteModalOpen(false);

    router.push('/');
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] overflow-hidden font-sans">
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      <main className="flex-1 flex flex-col h-full relative w-full min-w-0 transition-all duration-300">
        <header className="h-16 border-b border-white/5 bg-[#111625]/80 backdrop-blur-md flex items-center px-4 justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              title={isSidebarOpen ? "Cerrar barra lateral" : "Abrir barra lateral"}
            >
              <Menu className="w-6 h-6 md:hidden" />
              <PanelLeft className="w-5 h-5 hidden md:block" />
            </button>

            <Link href="/" className="md:hidden text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3 ml-2">
              <div className="relative">
                <img
                  src={MOCK_CHARACTER.avatar}
                  alt={MOCK_CHARACTER.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#111625] rounded-full"></span>
              </div>
              <div className="leading-tight">
                <h2 className="text-white font-bold text-sm md:text-base">{MOCK_CHARACTER.name}</h2>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>
          </div>

          <ChatHeaderMenu
            onEdit={handleEditChat}
            onDelete={handleDeleteClick}
          />
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto flex flex-col justify-end min-h-full">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                character={MOCK_CHARACTER}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </main>

      <CreateCharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingCharacter}
      />

      <DeleteChatModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        chatName={MOCK_CHARACTER.name}
      />
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Menu, ArrowLeft, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChatSidebar } from './ChatSidebar';
import { ChatHeaderMenu } from './ChatHeaderMenu';
import CreateCharacterModal, { CharacterData } from '@/app/components/CreateCharacterModal';
import DeleteChatModal from './DeleteChatModal';
import ChatArea from './ChatArea';
import { Character } from '../../types/chat';
import { getCharacterById, removeCharacter as removeCharacterFromStorage } from '@/lib/storage';
// UIMessage, useChat and DefaultChatTransport are used in ChatArea

interface ExtendedCharacter extends Character {
  systemPrompt: string;
}

const DEFAULT_CHARACTER: ExtendedCharacter = {
  id: 'default',
  name: 'Asistente IA',
  role: 'Asistente Virtual',
  status: 'online',
  avatar: 'https://ui-avatars.com/api/?name=AI&background=00D1FF&color=fff',
  systemPrompt: 'Eres un asistente útil y amable.'
};

export default function ChatInterface() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editingCharacter, setEditingCharacter] = useState<CharacterData | null>(null);
  const [isCharacterLoaded, setIsCharacterLoaded] = useState(false);
  const searchParams = useSearchParams();
  const paramCharacterId = searchParams.get('characterId') || undefined;
  const [character, setCharacter] = useState<ExtendedCharacter>(() => {
    if (typeof window !== 'undefined' && paramCharacterId) {
      const found = getCharacterById(paramCharacterId);
      if (found) {
        return {
          id: found.id,
          name: found.name,
          avatar: found.avatar,
          role: 'IA Personalizada',
          status: 'online',
          systemPrompt: found.systemPrompt,
        };
      }
    }
    return DEFAULT_CHARACTER;
  });

  // reapplies character when `paramCharacterId` changes
  useEffect(() => {
    if (!paramCharacterId) {
      setCharacter(DEFAULT_CHARACTER);
      setIsCharacterLoaded(true);
      return;
    }
    try {
      const found = getCharacterById(paramCharacterId);
      if (found) {
        setCharacter({
          id: found.id,
          name: found.name,
          avatar: found.avatar,
          role: 'IA Personalizada',
          status: 'online',
          systemPrompt: found.systemPrompt
        });
      } else {
        setCharacter(DEFAULT_CHARACTER);
      }
    } catch (error) {
      console.error('Error loading character:', error);
      setCharacter(DEFAULT_CHARACTER);
    }
  }, [paramCharacterId]);

  const [chatKey, setChatKey] = useState(paramCharacterId ?? 'default');


  // Listen to external updates such as when a character is edited in the modal
  useEffect(() => {
    const handleCharacterUpdated = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail;
        if (!detail || !detail.id) return;
        if (detail.id !== paramCharacterId) return; // only react for current character
        // reload character data from storage
        const found = getCharacterById(detail.id);
        if (found) {
          setCharacter({
            id: found.id!,
            name: found.name,
            avatar: found.avatar,
            role: 'IA Personalizada',
            status: 'online',
            systemPrompt: found.systemPrompt
          });
        }
        // force remount of ChatArea so useChat is reinitialized with the updated prompt
        setChatKey(`${detail.id}-${Date.now()}`);
      } catch (err) {
        console.error('Error handling character update event', err);
      }
    };
    window.addEventListener('myai:character-updated', handleCharacterUpdated as EventListener);
    return () => window.removeEventListener('myai:character-updated', handleCharacterUpdated as EventListener);
  }, [paramCharacterId]);

  // (ChatArea handles messages and scrolling)

  // For stability, actual chat hook (useChat) and message handling live in ChatArea child component.

  // ChatArea is a child component that mounts/unmounts when the character changes to ensure
  // the useChat hook is recreated with the correct transport.
  // `chatKey` ensures ChatArea remounts (new instance) when the character ID changes.
  useEffect(() => {
    setChatKey(paramCharacterId ?? 'default');
  }, [paramCharacterId]);

  // ChatArea component has been extracted to its own file (ChatArea.tsx)


  // Scrolling handled inside ChatArea

  // Mark character as loaded (no op for ChatArea load itself)
  useEffect(() => {
    setIsCharacterLoaded(true);
  }, [paramCharacterId]);



  const handleNewChat = () => {
    setEditingCharacter(null);
    setIsModalOpen(true);
  };

  const handleEditChat = () => {
    setEditingCharacter({
      id: character.id,
      name: character.name,
      systemPrompt: (character as ExtendedCharacter).systemPrompt,
      avatar: character.avatar
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (character.id && character.id !== 'default') {
      removeCharacterFromStorage(character.id);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('myai:character-removed', { detail: { id: character.id } }));
      }
    }
    setIsDeleteModalOpen(false);
    router.push('/');
  };

  // ChatArea sends messages using the `sendMessage` provided by useChat inside it.

  if (!isCharacterLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B0F19]">
        <div className="text-gray-400">Cargando personaje...</div>
      </div>
    );
  }

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
                  src={character.avatar}
                  alt={character.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#111625] rounded-full"></span>
              </div>
              <div className="leading-tight">
                <h2 className="text-white font-bold text-sm md:text-base">{character.name}</h2>
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
            <div key={chatKey} className="w-full">
              <ChatArea character={character} characterId={paramCharacterId} />
            </div>
          </div>
        </div>
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
        chatName={character.name}
      />
    </div>
  );
}
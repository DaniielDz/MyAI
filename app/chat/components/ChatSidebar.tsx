import clsx from 'clsx';
import { Plus, X, Bot } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CharacterData } from '@/app/components/CreateCharacterModal';
import { getCharacters } from '@/lib/storage';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void; 
}

const RECENT_CHATS = [
  { id: '1', name: 'Clara, la bióloga', active: true, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
  { id: '2', name: 'Marcus, el historiador', active: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { id: '3', name: 'Stella, la astrónoma', active: false, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop' },
];

export const ChatSidebar = ({ isOpen, onClose, onNewChat }: ChatSidebarProps) => {
  const [localCharacters, setLocalCharacters] = useState<CharacterData[]>([]);
  const searchParams = useSearchParams();
  const currentCharacterId = searchParams.get('characterId') || undefined;

  useEffect(() => {
    try {
      setLocalCharacters(getCharacters());
    } catch (e) {
      setLocalCharacters([]);
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const handler = () => setLocalCharacters(getCharacters());
    window.addEventListener('myai:character-updated', handler as EventListener);
    window.addEventListener('myai:character-removed', handler as EventListener);
    return () => {
      window.removeEventListener('myai:character-updated', handler as EventListener);
      window.removeEventListener('myai:character-removed', handler as EventListener);
    };
  }, []);
  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          "fixed md:relative inset-y-0 left-0 z-50 flex flex-col bg-[#0B0F19] border-r border-white/5 overflow-hidden",
          "transition-[width,transform] duration-300 ease-in-out",
          "w-72 md:translate-x-0",
          !isOpen && "-translate-x-full md:translate-x-0",
          isOpen ? "md:w-72" : "md:w-0 md:border-r-0"
        )}
      >
        <div className="flex flex-col h-full w-72 shrink-0">

          <div className="p-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-linear-to-br from-[#00D1FF] to-[#00A3CC] rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">MyAI</span>
            </Link>
            <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-4 mb-6">
            <button
              onClick={onNewChat}
              className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              <Plus className="w-5 h-5" />
              Nuevo Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-2">
              Chats Recientes
            </h3>

            {(localCharacters.length > 0 ? localCharacters : RECENT_CHATS).map((chat) => (
              <Link key={chat.id} href={`/chat?characterId=${chat.id}`} className={clsx(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group",
                  chat.id === currentCharacterId ? 'bg-[#1E293B] border border-white/5 text-white' : 'hover:bg-white/5 text-gray-400 hover:text-white'
                )}
              >
                <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className={clsx("text-sm font-medium truncate")}>{chat.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                YO
              </div>
              <div className="text-sm">
                <p className="text-white font-medium">Usuario</p>
                <p className="text-xs text-gray-500">Plan Gratuito</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
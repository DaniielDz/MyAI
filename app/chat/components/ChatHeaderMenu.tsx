import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';

interface ChatHeaderMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ChatHeaderMenu = ({ onEdit, onDelete }: ChatHeaderMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] rounded-xl shadow-xl border border-white/10 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <button 
            onClick={() => { onEdit(); setIsOpen(false); }}
            className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-[#0B0F19] hover:text-[#00D1FF] flex items-center gap-2 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Editar Chat
          </button>
          <div className="h-px bg-white/5 mx-2"></div>
          <button 
            onClick={() => { onDelete(); setIsOpen(false); }}
            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#0B0F19] hover:text-red-300 flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar Chat
          </button>
        </div>
      )}
    </div>
  );
};
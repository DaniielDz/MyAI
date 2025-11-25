import { useState, useEffect, FormEvent } from 'react';
import { X, User, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface CharacterData {
  id?: string;
  name: string;
  systemPrompt: string;
  avatar: string;
}

interface CreateCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CharacterData | null;
}

const CharacterForm = ({ initialData, onClose }: { initialData?: CharacterData | null, onClose: () => void }) => {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || '');
  const [systemPrompt, setSystemPrompt] = useState(initialData?.systemPrompt || '');
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar || '');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (avatarUrl && !avatarUrl.startsWith('http')) {
      setError('La URL de la imagen debe ser válida (http/https).');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const charId = initialData?.id || `custom-${Date.now()}`;

      try {
        const characterData: CharacterData = {
          id: charId,
          name,
          systemPrompt,
          avatar: avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00D1FF&color=fff`
        };

        const storedChars = localStorage.getItem('myai_characters');
        const existingChars: CharacterData[] = storedChars ? JSON.parse(storedChars) : [];

        let newChars: CharacterData[];

        if (initialData?.id) {
          newChars = existingChars.map((c) => c.id === charId ? characterData : c);
        } else {
          newChars = [...existingChars, characterData];
        }

        localStorage.setItem('myai_characters', JSON.stringify(newChars));
        router.push(`/chat?characterId=${charId}&updated=${Date.now()}`);

        setIsLoading(false);
        onClose();
      } catch (err) {
        console.error(err);
        setError('Error al guardar los datos.');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="relative w-full max-w-md bg-[#111625] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,209,255,0.15)] animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center p-6 border-b border-white/5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00D1FF]" />
          {initialData ? 'Editar Personaje' : 'Crear Nuevo Personaje'}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#00D1FF]" />
            URL de la Imagen (Opcional)
          </label>
          <div className="flex gap-4 items-start">
            <input
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="flex-1 bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00D1FF] transition-colors text-sm"
            />
            <div className="w-12 h-12 rounded-full bg-[#0B0F19] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              ) : (
                <User className="w-6 h-6 text-gray-600" />
              )}
            </div>
          </div>
          <p className="text-[10px] text-gray-500">Deja vacío para generar un avatar automático con las iniciales.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <User className="w-4 h-4 text-[#00D1FF]" /> Nombre
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Albert Einstein"
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#00D1FF] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Personalidad (System Prompt)</label>
          <textarea
            required
            rows={3}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Describe cómo debe comportarse..."
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#00D1FF] focus:outline-none resize-none transition-colors"
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-linear-to-r from-[#00D1FF] to-[#00A3CC] hover:from-[#00A3CC] hover:to-[#008AB8] text-[#0B0F19] font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,209,255,0.3)] flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0B0F19]"></div>
                Guardando...
              </>
            ) : (
              initialData ? 'Guardar Cambios' : 'Comenzar Chat'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const CreateCharacterModal = ({ isOpen, onClose, initialData }: CreateCharacterModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <CharacterForm
        key={initialData?.id || 'new-character'}
        initialData={initialData}
        onClose={onClose}
      />
    </div>
  );
};

export default CreateCharacterModal;
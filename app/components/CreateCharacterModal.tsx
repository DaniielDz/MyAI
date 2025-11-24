import { useState, useEffect, FormEvent } from 'react';
import { X, User, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CreateCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCharacterModal = ({ isOpen, onClose }: CreateCharacterModalProps) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Evitar scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newCharId = `custom-${Date.now()}`;

      const queryParams = new URLSearchParams({
        id: newCharId,
        name: name,
        prompt: systemPrompt,
        avatar: avatarUrl || `https://ui-avatars.com/api/?name=${name}&background=00D1FF&color=fff`
      }).toString();

      router.push(`/chat?${queryParams}`);
      setIsLoading(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop con Blur */}
      <div
        className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#111625] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,209,255,0.15)] transform transition-all animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00D1FF]" />
            Crear Nuevo Personaje
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Nombre Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4 text-[#00D1FF]" />
              Nombre del Personaje
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Albert Einstein"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all"
            />
          </div>

          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Personalidad (System Prompt)
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe cómo debe comportarse. Ej: Eres un físico teórico sarcástico que ama el violín."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all resize-none"
            />
          </div>

          {/* Avatar URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#00D1FF]" />
              URL de Imagen (Opcional)
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all"
            />
            <p className="text-xs text-gray-500">Si lo dejas vacío, generaremos un avatar automático.</p>
          </div>

          {/* Botón Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-linear-to-r from-[#00D1FF] to-[#00A3CC] hover:from-[#00A3CC] hover:to-[#008AB8] text-[#0B0F19] font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,209,255,0.3)] flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0B0F19]"></div>
                  Creando...
                </>
              ) : (
                'Comenzar Chat'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateCharacterModal;
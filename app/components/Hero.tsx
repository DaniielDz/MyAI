import { Bot } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero = ({ onOpenModal }: HeroProps) => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-[#00D1FF]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-[#78FFD6]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-5xl mx-auto mb-6">
          Chatea con <span className="text-transparent bg-clip-text bg-linear-to-r from-[#A8FF78] to-[#78FFD6]">Personajes Impulsados por IA.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Sumérgete en conversaciones inmersivas y crea lazos únicos con personajes de IA diseñados por ti o por la comunidad.
        </p>

        <button
          onClick={onOpenModal}
          className="w-full sm:w-auto bg-[#00D1FF] hover:bg-[#00A3CC] text-[#0B0F19] font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.4)] hover:shadow-[0_0_30px_rgba(0,209,255,0.6)] transform hover:-translate-y-1 cursor-pointer"
        >
          Comienza a Chatear Ahora
        </button>

        {/* Image / Screenshot Visual */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="relative aspect-video bg-[#111625] rounded-2xl shadow-2xl border border-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-[#00D1FF]/20 via-transparent to-[#78FFD6]/10 opacity-60"></div>

            <div className="absolute inset-0">
              <Image
                src="/hero-screenshot.png"
                alt="Captura de pantalla de MyAI"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00D1FF] blur-2xl opacity-10 animate-pulse"></div>
                <Bot className="w-20 h-20 text-[#00D1FF] relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
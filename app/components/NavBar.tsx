import Link from 'next/link';
import { Bot } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="py-4 px-6 sm:px-10 fixed top-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="p-2 bg-linear-to-br from-[#00D1FF] to-[#00A3CC] rounded-lg group-hover:shadow-[0_0_20px_rgba(0,209,255,0.5)] transition-shadow duration-300">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">MyAI</span>
        </Link>

        <Link
          href="/chat"
          className="hidden sm:inline-block bg-[#00D1FF] hover:bg-[#00A3CC] text-[#0B0F19] font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,209,255,0.3)]"
        >
          Empezar
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
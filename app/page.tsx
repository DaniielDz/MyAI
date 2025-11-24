import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CharacterSection from "./components/CharacterSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col font-sans selection:bg-[#00D1FF] selection:text-white">
      <Navbar />
      <main className="grow">
        <Hero />
        <Features />
        <CharacterSection />
      </main>
      <Footer />
    </div>
  );
}

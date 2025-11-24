"use client";

import { useState } from "react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import Features from "./Features";
import CharacterSection from "./CharacterSection";
import CreateCharacterModal from "./CreateCharacterModal";
import Footer from "./Footer";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col font-sans selection:bg-[#00D1FF] selection:text-white">
      <NavBar onOpenModal={openModal} />

      <main className="grow">
        <Hero onOpenModal={openModal} />
        <Features />
        <CharacterSection />
      </main>

      <Footer />

      <CreateCharacterModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
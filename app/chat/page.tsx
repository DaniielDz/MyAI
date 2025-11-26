import { Suspense } from "react";
import ChatInterface from "./components/ChatInterface";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#0B0F19] text-gray-400">Cargando chat...</div>}>
      <ChatInterface />
    </Suspense>
  )
}
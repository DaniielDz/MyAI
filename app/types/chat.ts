export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Character {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: "online" | "offline";
}

export interface ChatSession {
  id: string;
  character: Character;
  lastMessage: string;
}

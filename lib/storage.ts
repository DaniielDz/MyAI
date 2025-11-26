import { Character } from '@/app/types/chat';
import { UIMessage } from 'ai';

// Local storage keys
const CHARACTERS_KEY = 'myai_characters';

export type LocalCharacter = Character & { systemPrompt: string };

export function getCharacters(): LocalCharacter[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CHARACTERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error parsing characters from localStorage', err);
    return [];
  }
}

export function getCharacterById(id?: string): LocalCharacter | undefined {
  if (!id) return undefined;
  const chars = getCharacters();
  return chars.find((c) => c.id === id);
}

export function saveCharacters(chars: LocalCharacter[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHARACTERS_KEY, JSON.stringify(chars));
  } catch (err) {
    console.error('Error saving characters to localStorage', err);
  }
}

export function addOrUpdateCharacter(char: LocalCharacter) {
  const chars = getCharacters();
  const found = chars.find((c) => c.id === char.id);
  let newChars;
  if (found) newChars = chars.map((c) => (c.id === char.id ? char : c));
  else newChars = [...chars, char];
  saveCharacters(newChars);
  return char;
}

export function removeCharacter(id: string) {
  if (!id) return;
  const chars = getCharacters();
  const filtered = chars.filter((c) => c.id !== id);
  saveCharacters(filtered);
  // also remove the history
  removeChatHistory(id);
}

// Chat history helpers
export function getChatHistory(characterId?: string): UIMessage[] {
  if (typeof window === 'undefined' || !characterId) return [];
  try {
    const raw = localStorage.getItem(`chat_history_${characterId}`);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error parsing chat history', err);
    return [];
  }
}

export function saveChatHistory(characterId: string, messages: UIMessage[]) {
  if (typeof window === 'undefined' || !characterId) return;
  try {
    localStorage.setItem(`chat_history_${characterId}`, JSON.stringify(messages));
  } catch (err) {
    console.error('Error saving chat history', err);
  }
}

export function removeChatHistory(characterId: string) {
  if (typeof window === 'undefined' || !characterId) return;
  try {
    localStorage.removeItem(`chat_history_${characterId}`);
  } catch (err) {
    console.error('Error removing chat history', err);
  }
}

const storage = {
  getCharacters,
  getCharacterById,
  saveCharacters,
  addOrUpdateCharacter,
  removeCharacter,
  getChatHistory,
  saveChatHistory,
  removeChatHistory,
};

export default storage;

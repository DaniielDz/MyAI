"use client";

import React, { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { UIMessage } from 'ai';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';
import { Character } from '@/app/types/chat';
import { getChatHistory, saveChatHistory } from '@/lib/storage';

interface ChatAreaProps {
  character: Character & { systemPrompt?: string };
  characterId?: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ character, characterId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  const { sendMessage, messages, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      body: {
        characterId: character.id,
        characterName: character.name,
        systemPrompt: character.systemPrompt,
      },
    }),
    onFinish: ({ message }) => {
      try {
        const historyToSave = message ? [...messages, message] : messages;
        if (characterId) saveChatHistory(characterId, historyToSave);
      } catch (err) {
        console.error('Error saving chat history', err);
      }
      scrollToBottom();
    },
    onError: (err) => {
      console.error('Chat error:', err);
    },
  });

  useEffect(() => {
    if (!characterId) return;
    try {
      const savedHistory = getChatHistory(characterId);
      if (savedHistory && setMessages) setMessages(savedHistory);
    } catch (err) {
      console.error('Error loading history', err);
      if (setMessages) setMessages([]);
    }
  }, [characterId, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const isLoading = status === 'streaming' || status === 'submitted';

  const onSend = (text: string) => {
    sendMessage({ text });
  };

  return (
    <>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} character={character} />
      ))}
      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <div className="text-gray-500 text-sm animate-pulse pl-4 mb-4">Escribiendo...</div>
      )}
      <div ref={messagesEndRef} />
      <ChatInput onSendMessage={onSend} isLoading={isLoading} />
    </>
  );
};

export default ChatArea;

import clsx from 'clsx';
import { Message, Character } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
  character: Character;
}

export const MessageBubble = ({ message, character }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={clsx(
        "flex w-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={clsx("flex max-w-[85%] md:max-w-[70%]", isUser ? "flex-row-reverse" : "flex-row")}>
        {!isUser && (
          <div className="shrink-0 mr-3">
            <img
              src={character.avatar}
              alt={character.name}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-white/10"
            />
          </div>
        )}

        <div
          className={clsx(
            "p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-md",
            isUser
              ? "bg-[#2563EB] text-white rounded-br-none" // Azul vibrante usuario
              : "bg-[#1E293B] text-gray-100 rounded-tl-none border border-white/5" // Gris oscuro IA
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
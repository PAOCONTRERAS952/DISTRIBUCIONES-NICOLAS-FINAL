
import React, { useState, useRef, useEffect } from 'react';
import type { Product } from '../types';
import { getRecommendations } from '../services/geminiService';

interface ChatAssistantProps {
  products: Product[];
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      // Reset state on close
      setUserInput('');
      setMessages([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: trimmedInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const result = await getRecommendations(trimmedInput, products);
      setMessages([...newMessages, { sender: 'bot', text: result }]);
    } catch (err) {
      const errorMessage = 'Lo siento, no pude obtener una recomendación en este momento. Por favor, intenta de nuevo.';
      setMessages([...newMessages, { sender: 'bot', text: errorMessage }]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 bg-neutral-accent text-white rounded-full p-4 shadow-lg hover:bg-neutral-accent-hover transition-transform transform hover:scale-110 z-50"
        aria-label="Asistente de compras"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40" onClick={handleToggle}>
          <div 
            className="bg-neutral-card rounded-lg shadow-2xl w-full max-w-md m-4 flex flex-col h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-stone-200 flex justify-between items-center">
              <h3 className="text-xl font-bold">Asistente de Compras</h3>
              <button onClick={handleToggle} className="text-neutral-subtle hover:text-neutral-text text-2xl font-bold">&times;</button>
            </div>
            <div ref={chatContainerRef} className="p-5 flex-grow overflow-y-auto space-y-4 flex flex-col">
              {messages.length === 0 && (
                 <div className="flex-grow flex items-center justify-center">
                    <p className="text-neutral-subtle text-center">Hola, ¿cómo puedo ayudarte hoy? Describe qué necesitas y te recomendaré algunos productos.</p>
                 </div>
              )}
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg px-4 py-2 max-w-xs md:max-w-sm whitespace-pre-wrap ${
                    msg.sender === 'user' ? 'bg-neutral-accent text-white' : 'bg-stone-200 text-neutral-text'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-stone-200 text-neutral-text rounded-lg px-4 py-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-neutral-subtle rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-neutral-subtle rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-neutral-subtle rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-stone-200">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ej: necesito algo para el dolor de cabeza..."
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-accent"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-neutral-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-neutral-accent-hover disabled:bg-stone-400"
                  disabled={isLoading}
                  aria-label="Enviar mensaje"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
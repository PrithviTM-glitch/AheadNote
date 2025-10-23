import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Send, Save, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Message {
  id: string;
  type: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

interface JournalTabProps {
  onSaveReflection: (messages: Message[]) => void;
}

const AI_PROMPTS = [
  "How was your day today?",
  "What made you smile today?",
  "What challenged you?",
  "What are you grateful for?",
];

const AI_RESPONSES = [
  "That's interesting. How did that make you feel?",
  "I sense there's something deeper here. Can you tell me more?",
  "That sounds important to you. What did you learn from it?",
  "Thank you for sharing that. What emotions came up for you?",
  "I appreciate your honesty. How would you like to move forward?",
];

export function JournalTab({ onSaveReflection }: JournalTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: "Hi there! I'm here to help you reflect on your day. How are you feeling right now?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSave = () => {
    onSaveReflection(messages);
    setShowSaveDialog(true);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#212121]">
      {/* Messages Area - Centered */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                    message.type === 'ai'
                      ? 'bg-[#2f2f2f] text-gray-100'
                      : 'bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white'
                  }`}
                >
                  <p className={`leading-relaxed ${message.type === 'ai' ? 'font-["Poppins"]' : ''}`}>
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 2 && (
            <div className="mt-8 mb-4">
              <div className="flex gap-3 flex-wrap justify-center">
                {AI_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="px-4 py-2.5 bg-[#2f2f2f] hover:bg-[#3a3a3a] text-gray-300 rounded-xl text-sm transition-colors border border-gray-700"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t border-gray-700 bg-[#212121]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="relative bg-[#2f2f2f] rounded-3xl border border-gray-700 focus-within:border-[#F97316] transition-colors">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts..."
              rows={1}
              className="w-full px-6 py-4 pr-32 bg-transparent text-gray-100 placeholder-gray-500 resize-none focus:outline-none max-h-40"
              style={{ minHeight: '56px' }}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              {messages.length > 2 && (
                <button
                  onClick={handleSave}
                  className="p-2.5 text-[#14532D] hover:bg-[#14532D]/10 rounded-lg transition-colors"
                  title="Save Reflection"
                >
                  <Save className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2.5 bg-gradient-to-r from-[#F97316] to-[#FDBA74] rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-3">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="rounded-3xl bg-[#2f2f2f] border-gray-700 text-white">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#14532D] to-[#166534] rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-center text-white">Reflection Saved!</DialogTitle>
              <p className="text-gray-300 text-center">
                Your Persona profile has been updated with today's insights.
              </p>
              <Button
                onClick={() => setShowSaveDialog(false)}
                className="w-full rounded-3xl bg-gradient-to-r from-[#F97316] to-[#FDBA74] hover:opacity-90 mt-2"
              >
                Continue
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
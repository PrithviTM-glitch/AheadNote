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
  };

  return (
    <div className="h-full flex flex-col bg-[#E6F4EA]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-5 py-3 shadow-md ${
                message.type === 'ai'
                  ? 'bg-white text-gray-800'
                  : 'bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white'
              }`}
            >
              <p className={message.type === 'ai' ? 'font-["Poppins"]' : ''}>
                {message.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {AI_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="px-4 py-2 bg-white rounded-full text-sm whitespace-nowrap shadow-sm hover:shadow-md transition-shadow text-gray-700"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your thoughts..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-12 h-12 bg-gradient-to-r from-[#F97316] to-[#FDBA74] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Floating Save Button */}
      {messages.length > 2 && (
        <button
          onClick={handleSave}
          className="fixed bottom-24 right-6 bg-[#F97316] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 z-10"
        >
          <Save className="w-5 h-5" />
          Save Reflection
        </button>
      )}

      {/* Success Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-16 h-16 bg-[#14532D] rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-center">Reflection Saved!</DialogTitle>
              <p className="text-gray-600 text-center">
                Your Persona profile has been updated with today's insights.
              </p>
              <Button
                onClick={() => setShowSaveDialog(false)}
                className="w-full rounded-3xl bg-[#14532D] hover:bg-[#14532D]/90 mt-2"
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

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Sparkles, Brain, Heart, Compass } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [focus, setFocus] = useState('');
  const [reminderTime, setReminderTime] = useState('20:00');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const focuses = [
    { value: 'awareness', label: 'Self-awareness', icon: Brain },
    { value: 'anxiety', label: 'Anxiety reduction', icon: Heart },
    { value: 'exploration', label: 'Exploration', icon: Compass },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF3C7] to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {step === 0 && (
          <div className="text-center space-y-6 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F97316] to-[#FDBA74] rounded-3xl mx-auto flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-[#14532D]">Welcome to Aheadnote</h1>
            <p className="text-gray-600">
              A personal growth companion that helps you discover patterns in your thoughts, emotions, and strengths through AI-driven reflection.
            </p>
            <Button 
              onClick={handleNext}
              className="w-full rounded-3xl shadow-lg bg-[#F97316] hover:bg-[#ea6a0f]"
            >
              Get Started
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-[#14532D]">Your Data, Your Control</h2>
            <Card className="p-6 bg-white shadow-lg rounded-3xl">
              <p className="text-gray-600 mb-4">
                Aheadnote uses AI to help you reflect on your daily experiences. Your journal entries are private and used only to:
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex gap-2">
                  <span className="text-[#14532D]">✓</span>
                  <span>Build your Persona Profile</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#14532D]">✓</span>
                  <span>Provide personalized recommendations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#14532D]">✓</span>
                  <span>Track your growth journey</span>
                </li>
              </ul>
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="consent" 
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                />
                <label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer">
                  I understand and agree to transparent data use for personal growth insights
                </label>
              </div>
            </Card>
            <Button 
              onClick={handleNext}
              disabled={!consent}
              className="w-full rounded-3xl shadow-lg bg-[#F97316] hover:bg-[#ea6a0f] disabled:opacity-50"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-[#14532D]">What's your main focus?</h2>
            <p className="text-gray-600">Choose what you'd like to explore most</p>
            <div className="space-y-3">
              {focuses.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.value}
                    onClick={() => setFocus(item.value)}
                    className={`p-6 cursor-pointer transition-all rounded-3xl shadow-md ${
                      focus === item.value
                        ? 'bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white shadow-lg scale-105'
                        : 'bg-white hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        focus === item.value ? 'bg-white/20' : 'bg-[#FEF3C7]'
                      }`}>
                        <Icon className={`w-6 h-6 ${focus === item.value ? 'text-white' : 'text-[#F97316]'}`} />
                      </div>
                      <span className={focus === item.value ? 'text-white' : 'text-gray-800'}>
                        {item.label}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
            <Button 
              onClick={handleNext}
              disabled={!focus}
              className="w-full rounded-3xl shadow-lg bg-[#F97316] hover:bg-[#ea6a0f] disabled:opacity-50"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-[#14532D]">Daily Reminder</h2>
            <p className="text-gray-600">When would you like to reflect each day?</p>
            <Card className="p-6 bg-white shadow-lg rounded-3xl">
              <label className="block mb-2 text-gray-600">Preferred time</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-2xl bg-[#FEF3C7]/30"
              />
            </Card>
            <Button 
              onClick={handleNext}
              className="w-full rounded-3xl shadow-lg bg-[#14532D] hover:bg-[#14532D]/90"
            >
              Start My Journey
            </Button>
          </div>
        )}

        <div className="flex gap-2 justify-center mt-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-8 bg-[#F97316]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

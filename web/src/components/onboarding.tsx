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
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-white to-[#E6F4EA] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {step === 0 && (
          <div className="text-center space-y-8 animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-[#F97316] to-[#FDBA74] rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-[#14532D] mb-4">Welcome to Aheadnote</h1>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                A personal growth companion that helps you discover patterns in your thoughts, emotions, and strengths through AI-driven reflection.
              </p>
            </div>
            <Button 
              onClick={handleNext}
              className="rounded-3xl shadow-lg bg-[#F97316] hover:bg-[#ea6a0f] px-12 py-6"
            >
              Get Started
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-[#14532D] text-center">Your Data, Your Control</h2>
            <Card className="p-8 bg-white shadow-2xl rounded-3xl">
              <p className="text-gray-600 mb-6 text-lg">
                Aheadnote uses AI to help you reflect on your daily experiences. Your journal entries are private and used only to:
              </p>
              <ul className="space-y-4 text-gray-600 mb-8 text-lg">
                <li className="flex gap-3">
                  <span className="text-[#14532D] text-xl">✓</span>
                  <span>Build your Persona Profile</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#14532D] text-xl">✓</span>
                  <span>Provide personalized recommendations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#14532D] text-xl">✓</span>
                  <span>Track your growth journey</span>
                </li>
              </ul>
              <div className="flex items-start gap-4 p-6 bg-[#FEF3C7] rounded-2xl">
                <Checkbox 
                  id="consent" 
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-gray-700 cursor-pointer">
                  I understand and agree to transparent data use for personal growth insights
                </label>
              </div>
            </Card>
            <Button 
              onClick={handleNext}
              disabled={!consent}
              className="w-full rounded-3xl shadow-lg bg-[#F97316] hover:bg-[#ea6a0f] disabled:opacity-50 py-6"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
              <h2 className="text-[#14532D] mb-3">What's your main focus?</h2>
              <p className="text-gray-600 text-lg">Choose what you'd like to explore most</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {focuses.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.value}
                    onClick={() => setFocus(item.value)}
                    className={`p-8 cursor-pointer transition-all rounded-3xl shadow-md ${
                      focus === item.value
                        ? 'bg-gradient-to-br from-[#F97316] to-[#FDBA74] text-white shadow-2xl scale-105'
                        : 'bg-white hover:shadow-xl'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        focus === item.value ? 'bg-white/20' : 'bg-[#FEF3C7]'
                      }`}>
                        <Icon className={`w-8 h-8 ${focus === item.value ? 'text-white' : 'text-[#F97316]'}`} />
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
              className="w-full rounded-3xl shadow-lg bg-[#F97316] hover:bg-[#ea6a0f] disabled:opacity-50 py-6"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
              <h2 className="text-[#14532D] mb-3">Daily Reminder</h2>
              <p className="text-gray-600 text-lg">When would you like to reflect each day?</p>
            </div>
            <Card className="p-8 bg-white shadow-2xl rounded-3xl max-w-md mx-auto">
              <label className="block mb-3 text-gray-600 text-lg">Preferred time</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full p-6 border-2 border-gray-200 rounded-2xl bg-[#FEF3C7]/30 text-lg"
              />
            </Card>
            <Button 
              onClick={handleNext}
              className="w-full rounded-3xl shadow-lg bg-[#14532D] hover:bg-[#14532D]/90 py-6"
            >
              Start My Journey
            </Button>
          </div>
        )}

        <div className="flex gap-3 justify-center mt-12">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-3 rounded-full transition-all ${
                i === step ? 'w-12 bg-[#F97316]' : 'w-3 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Onboarding } from './components/onboarding';
import { JournalTab } from './components/journal-tab';
import { PersonaTab } from './components/persona-tab';
import { ExploreTab } from './components/explore-tab';
import { PlannerTab } from './components/planner-tab';
import { BookOpen, User, Compass, Calendar } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

type Tab = 'journal' | 'persona' | 'explore' | 'planner';

interface SavedItem {
  id: string;
  title: string;
  type: string;
  reason: string;
}

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('journal');
  const [reflectionCount, setReflectionCount] = useState(12);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const handleSaveReflection = () => {
    setReflectionCount((prev) => prev + 1);
  };

  const handleSaveToPlanner = (item: SavedItem) => {
    setSavedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleCompleteTask = (taskId: string) => {
    // Update persona when task is completed
    setReflectionCount((prev) => prev + 1);
  };

  const handleReflectToday = () => {
    setActiveTab('journal');
  };

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  const tabs = [
    { id: 'journal' as Tab, label: 'Journal', icon: BookOpen, color: '#F97316' },
    { id: 'persona' as Tab, label: 'Persona', icon: User, color: '#14532D' },
    { id: 'explore' as Tab, label: 'Explore', icon: Compass, color: '#F97316' },
    { id: 'planner' as Tab, label: 'Planner', icon: Calendar, color: '#FDBA74' },
  ];

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto bg-white shadow-2xl">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'journal' && <JournalTab onSaveReflection={handleSaveReflection} />}
        {activeTab === 'persona' && (
          <PersonaTab onReflectToday={handleReflectToday} reflectionCount={reflectionCount} />
        )}
        {activeTab === 'explore' && <ExploreTab onSaveToPlanner={handleSaveToPlanner} />}
        {activeTab === 'planner' && (
          <PlannerTab savedItems={savedItems} onCompleteTask={handleCompleteTask} />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-1 px-4 py-2 transition-all"
              >
                <div
                  className={`p-2 rounded-2xl transition-all ${
                    isActive ? 'bg-gradient-to-r from-[#F97316] to-[#FDBA74]' : ''
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`}
                  />
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'text-[#F97316]' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <Toaster />
    </div>
  );
}

import { useState } from "react";
import { Onboarding } from "./components/onboarding";
import { JournalTab } from "./components/journal-tab";
import { PersonaTab } from "./components/persona-tab";
import { ExploreTab } from "./components/explore-tab";
import { PlannerTab } from "./components/planner-tab";
import {
  BookOpen,
  User,
  Compass,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";

type Tab = "journal" | "persona" | "explore" | "planner";

interface SavedItem {
  id: string;
  title: string;
  type: string;
  reason: string;
}

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("journal");
  const [reflectionCount, setReflectionCount] = useState(12);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
    setActiveTab("journal");
  };

  if (!hasCompletedOnboarding) {
    return (
      <Onboarding
        onComplete={() => setHasCompletedOnboarding(true)}
      />
    );
  }

  const tabs = [
    {
      id: "journal" as Tab,
      label: "Journal",
      icon: BookOpen,
      color: "#F97316",
    },
    {
      id: "persona" as Tab,
      label: "Persona",
      icon: User,
      color: "#14532D",
    },
    {
      id: "explore" as Tab,
      label: "Explore",
      icon: Compass,
      color: "#F97316",
    },
    {
      id: "planner" as Tab,
      label: "Planner",
      icon: Calendar,
      color: "#FDBA74",
    },
  ];

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className={`bg-gradient-to-b from-[#14532D] to-[#166534] text-white flex flex-col transition-all duration-300 relative ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-white/10">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#F97316] to-[#FDBA74] rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-white">Aheadnote</h2>
                <p className="text-green-200 text-sm mt-2">
                  Your growth companion
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white shadow-lg"
                    : "text-green-100 hover:bg-white/10"
                }`}
                title={sidebarCollapsed ? tab.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer Stats */}
        {!sidebarCollapsed && (
          <div className="p-6 border-t border-white/10">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-green-200 text-sm mb-1">Total Reflections</p>
              <p className="text-2xl text-white">{reflectionCount}</p>
            </div>
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "journal" && (
          <JournalTab onSaveReflection={handleSaveReflection} />
        )}
        {activeTab === "persona" && (
          <PersonaTab
            onReflectToday={handleReflectToday}
            reflectionCount={reflectionCount}
          />
        )}
        {activeTab === "explore" && (
          <ExploreTab onSaveToPlanner={handleSaveToPlanner} />
        )}
        {activeTab === "planner" && (
          <PlannerTab
            savedItems={savedItems}
            onCompleteTask={handleCompleteTask}
          />
        )}
      </main>

      <Toaster />
    </div>
  );
}
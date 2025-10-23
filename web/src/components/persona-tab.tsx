import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, TrendingUp, Heart, Brain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface PersonaTabProps {
  onReflectToday: () => void;
  reflectionCount: number;
}

const moodData = [
  { day: 'Mon', mood: 7 },
  { day: 'Tue', mood: 6 },
  { day: 'Wed', mood: 8 },
  { day: 'Thu', mood: 7 },
  { day: 'Fri', mood: 9 },
  { day: 'Sat', mood: 8 },
  { day: 'Sun', mood: 7 },
];

const strengths = [
  { name: 'Creativity', level: 85, icon: Sparkles },
  { name: 'Emotional Intelligence', level: 78, icon: Heart },
  { name: 'Problem Solving', level: 82, icon: Brain },
];

const interests = [
  'Mindfulness', 'Technology', 'Reading', 'Art', 'Nature',
  'Music', 'Learning', 'Self-improvement', 'Writing'
];

const recentInsights = [
  'You tend to feel most energized in the morning',
  'Creative activities boost your mood significantly',
  'You value deep connections over casual interactions',
];

export function PersonaTab({ onReflectToday, reflectionCount }: PersonaTabProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-white">Your Persona</h1>
                <p className="text-orange-100">{reflectionCount} reflections logged</p>
              </div>
            </div>
            <Button
              onClick={onReflectToday}
              className="rounded-3xl bg-white text-[#F97316] hover:bg-gray-50 shadow-lg px-8"
            >
              Reflect Today
            </Button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Strengths */}
          <Card className="p-8 bg-white shadow-lg rounded-3xl">
            <h3 className="text-[#14532D] mb-6">Top Strengths</h3>
            <div className="space-y-6">
              {strengths.map((strength, index) => {
                const Icon = strength.icon;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-[#F97316]" />
                        <span>{strength.name}</span>
                      </div>
                      <span className="text-gray-500">{strength.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#F97316] to-[#FDBA74] rounded-full transition-all duration-500"
                        style={{ width: `${strength.level}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Weekly Mood Trend */}
          <Card className="p-8 bg-[#FEF3C7] shadow-lg rounded-3xl">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-[#F97316]" />
              <h3 className="text-[#14532D]">Weekly Mood Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={moodData}>
                <XAxis dataKey="day" stroke="#14532D" />
                <YAxis hide domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  dot={{ fill: '#F97316', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Interests & Tags */}
          <Card className="p-8 bg-white shadow-lg rounded-3xl">
            <h3 className="text-[#14532D] mb-6">Interests & Tags</h3>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-5 py-2.5 bg-[#FEF3C7] text-[#14532D] rounded-full hover:bg-[#FDBA74] hover:text-white transition-colors cursor-pointer text-sm"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Recent Insights */}
          <Card className="p-8 bg-gradient-to-br from-[#F97316] to-[#FDBA74] text-white shadow-lg rounded-3xl">
            <h3 className="text-white mb-6">Recent Insights</h3>
            <ul className="space-y-4">
              {recentInsights.map((insight, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-white/80 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
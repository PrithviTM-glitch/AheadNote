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
    <div className="min-h-screen bg-gradient-to-b from-[#14532D] via-[#166534] to-white pb-20">
      {/* Header */}
      <div className="bg-[#14532D] text-white p-6 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#F97316] to-[#FDBA74] rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-white">Your Persona</h2>
            <p className="text-green-200 text-sm">{reflectionCount} reflections logged</p>
          </div>
        </div>
        <Button
          onClick={onReflectToday}
          className="w-full rounded-3xl bg-[#F97316] hover:bg-[#ea6a0f] shadow-lg"
        >
          Reflect Today
        </Button>
      </div>

      <div className="px-6 -mt-6 space-y-4">
        {/* Top Strengths */}
        <Card className="p-6 bg-white shadow-lg rounded-3xl">
          <h3 className="text-[#14532D] mb-4">Top Strengths</h3>
          <div className="space-y-4">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-[#F97316]" />
                      <span className="text-sm">{strength.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{strength.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
        <Card className="p-6 bg-[#FEF3C7] shadow-lg rounded-3xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-[#14532D]">Weekly Mood Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
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
                dot={{ fill: '#F97316', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Interests & Tags */}
        <Card className="p-6 bg-white shadow-lg rounded-3xl">
          <h3 className="text-[#14532D] mb-4">Interests & Tags</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 bg-[#FEF3C7] text-[#14532D] rounded-full hover:bg-[#FDBA74] hover:text-white transition-colors cursor-pointer"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Recent Insights */}
        <Card className="p-6 bg-gradient-to-br from-[#F97316] to-[#FDBA74] text-white shadow-lg rounded-3xl">
          <h3 className="text-white mb-4">Recent Insights</h3>
          <ul className="space-y-3">
            {recentInsights.map((insight, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-white/80">•</span>
                <span className="text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

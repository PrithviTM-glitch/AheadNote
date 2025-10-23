import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Clock, MapPin, BookOpen, Users, Lightbulb } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Recommendation {
  id: string;
  title: string;
  type: 'course' | 'event' | 'activity' | 'project';
  reason: string;
  duration?: string;
  location?: string;
  imageUrl: string;
  saved: boolean;
}

interface ExploreTabProps {
  onSaveToPlanner: (item: Recommendation) => void;
}

const CATEGORIES = ['All', 'Courses', 'Events', 'Activities', 'Projects'];

const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Creative Writing Workshop',
    type: 'course',
    reason: 'You logged "writing" 3 times this week',
    duration: '4 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    saved: false,
  },
  {
    id: '2',
    title: 'Mindfulness Meditation Session',
    type: 'event',
    reason: 'Based on your interest in mindfulness',
    duration: '1 hour',
    location: 'Online',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    saved: false,
  },
  {
    id: '3',
    title: 'Urban Sketching Challenge',
    type: 'activity',
    reason: 'You mentioned "art" in your recent reflections',
    duration: '2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    saved: false,
  },
  {
    id: '4',
    title: 'Personal Growth Book Club',
    type: 'project',
    reason: 'Matches your self-improvement focus',
    duration: 'Ongoing',
    location: 'Community Center',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop',
    saved: false,
  },
  {
    id: '5',
    title: 'Nature Photography Walk',
    type: 'event',
    reason: 'You expressed interest in nature',
    duration: '3 hours',
    location: 'Local Park',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    saved: false,
  },
  {
    id: '6',
    title: 'Emotional Intelligence Course',
    type: 'course',
    reason: 'Aligned with your top strength',
    duration: '6 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
    saved: false,
  },
];

const typeIcons = {
  course: BookOpen,
  event: Users,
  activity: Lightbulb,
  project: MapPin,
};

export function ExploreTab({ onSaveToPlanner }: ExploreTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState(recommendations);

  const handleSave = (item: Recommendation) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, saved: !i.saved } : i))
    );
    
    if (!item.saved) {
      onSaveToPlanner(item);
      toast.success('Saved to Planner', {
        description: `${item.title} has been added to your planner`,
      });
    } else {
      toast.info('Removed from Planner');
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.type === selectedCategory.toLowerCase().slice(0, -1);
  });

  return (
    <div className="min-h-screen bg-[#FDBA74] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white p-6">
        <h2 className="text-white mb-2">Explore</h2>
        <p className="text-orange-100 text-sm">
          Personalized recommendations based on your reflections
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-white text-[#F97316] shadow-md'
                  : 'bg-white/50 text-gray-700 hover:bg-white/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const Icon = typeIcons[item.type];
          return (
            <Card
              key={item.id}
              className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() => handleSave(item)}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
                    item.saved
                      ? 'bg-[#F97316] text-white'
                      : 'bg-white/90 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${item.saved ? 'fill-current' : ''}`}
                  />
                </button>
                <Badge className="absolute bottom-2 left-2 bg-white/90 text-gray-800 text-xs">
                  <Icon className="w-3 h-3 mr-1" />
                  {item.type}
                </Badge>
              </div>
              <div className="p-4">
                <h4 className="text-gray-900 mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {item.reason}
                </p>
                {item.duration && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

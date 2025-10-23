import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Checkbox } from './ui/checkbox';
import { CalendarIcon, CheckCircle2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  type: string;
}

interface PlannerTabProps {
  savedItems: any[];
  onCompleteTask: (taskId: string) => void;
}

export function PlannerTab({ savedItems, onCompleteTask }: PlannerTabProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Task[]>(
    savedItems.map((item) => ({
      id: item.id,
      title: item.title,
      date: new Date(),
      completed: false,
      type: item.type,
    }))
  );
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number }>>([]);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      // Trigger confetti
      const newConfetti = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
      }));
      setConfetti(newConfetti);
      setTimeout(() => setConfetti([]), 2000);

      // Notify parent
      onCompleteTask(taskId);
    }
  };

  const upcomingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-white px-8 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white mb-1">Planner</h1>
            <p className="text-orange-100">Your growth action plan</p>
          </div>
          <Button className="rounded-3xl bg-white text-[#F97316] hover:bg-gray-50 shadow-md px-8">
            <Plus className="w-5 h-5 mr-2" />
            Add New Action
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-[#FEF3C7] shadow-lg rounded-3xl sticky top-8">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-2xl"
              />
            </Card>
          </div>

          {/* Tasks */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Tasks */}
            {upcomingTasks.length > 0 && (
              <div>
                <h3 className="text-[#14532D] mb-4">Upcoming Actions</h3>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="p-6 bg-white shadow-md rounded-2xl border-2 border-gray-100 hover:border-[#F97316] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={task.id}
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={task.id}
                            className="cursor-pointer text-gray-900 block mb-3"
                          >
                            {task.title}
                          </label>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                {task.date.toLocaleDateString()}
                              </span>
                            </div>
                            <span className="px-3 py-1 bg-[#FEF3C7] text-[#14532D] text-sm rounded-full">
                              {task.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div>
                <h3 className="text-[#14532D] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14532D]" />
                  Completed
                </h3>
                <div className="space-y-4">
                  {completedTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="p-6 bg-[#14532D]/5 shadow-sm rounded-2xl"
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={task.id}
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={task.id}
                            className="cursor-pointer text-gray-500 line-through block mb-3"
                          >
                            {task.title}
                          </label>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">
                              {task.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-[#FEF3C7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CalendarIcon className="w-12 h-12 text-[#F97316]" />
                </div>
                <h3 className="text-gray-900 mb-3">No actions yet</h3>
                <p className="text-gray-500 mb-6">
                  Save recommendations from Explore to start building your action plan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confetti Animation */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ y: -20, opacity: 1 }}
            animate={{ y: '100vh', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="fixed w-3 h-3 rounded-full bg-[#14532D] confetti"
            style={{
              left: `${piece.x}%`,
              top: '-20px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
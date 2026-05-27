export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  totalWorkouts: number;
  totalMinutes: number;
  joinDate: string;
  isPremium: boolean;
  sports: string[];
  goals: Goal[];
  stats: UserStats;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  sport?: string;
  completed: boolean;
}

export interface UserStats {
  weeklyWorkouts: number;
  weeklyMinutes: number;
  monthlyCalories: number;
  bestStreak: number;
  favoriteTime: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  sport: Sport;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  xpReward: number;
  caloriesBurn: number;
  completed?: boolean;
  completedAt?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number;
  rest?: number;
  description: string;
  videoUrl?: string;
  muscleGroups?: string[];
  completed?: boolean;
}

export interface Sport {
  id: string;
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  condition: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface WeeklyProgress {
  day: string;
  minutes: number;
  calories: number;
  workouts: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  highlighted?: boolean;
  stripePriceId?: string;
}

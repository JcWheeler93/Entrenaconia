'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ChatMessage, Workout } from './types';

export type PlanType = 'free' | 'premium' | 'annual';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;

  // Plan / freemium
  plan: PlanType;
  workoutsToday: number;
  aiMessagesToday: number;
  lastActiveDate: string;

  // App state
  chatMessages: ChatMessage[];
  currentWorkout: Workout | null;
  activeSport: string;
  dailyGreetingShown: boolean;
  lastGreetingDate: string;
  notifications: AppNotification[];

  // Actions - auth
  setHasHydrated: (v: boolean) => void;
  setUser: (user: User) => void;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFirebase: (firebaseUser: { uid: string; displayName: string | null; email: string | null; photoURL: string | null }) => void;
  logout: () => void;

  // Actions - plan
  setPlan: (plan: PlanType) => void;
  canDoWorkout: () => boolean;
  canSendAIMessage: () => boolean;
  incrementWorkout: () => void;
  incrementAIMessage: () => void;
  resetDailyCounters: () => void;

  // Actions - app
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
  setCurrentWorkout: (workout: Workout | null) => void;
  setActiveSport: (sport: string) => void;
  completeWorkout: (workoutId: string, xpReward: number) => void;
  addXP: (amount: number) => void;
  markDailyGreetingShown: () => void;
  addNotification: (n: AppNotification) => void;
  clearNotifications: () => void;
}

export interface AppNotification {
  id: string;
  type: 'greeting' | 'achievement' | 'reminder' | 'streak';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const FREE_PLAN_LIMITS = { workoutsPerDay: 1, aiMessagesPerDay: 5 };
const PREMIUM_PLAN_LIMITS = { workoutsPerDay: 999, aiMessagesPerDay: 999 };

const today = () => new Date().toDateString();

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      plan: 'free',
      workoutsToday: 0,
      aiMessagesToday: 0,
      lastActiveDate: today(),
      chatMessages: [],
      currentWorkout: null,
      activeSport: 'gym',
      dailyGreetingShown: false,
      lastGreetingDate: '',
      notifications: [],

      setHasHydrated: (v) => set({ _hasHydrated: v }),

      setUser: (user) => set({ user, isAuthenticated: true }),

      loginWithFirebase: (firebaseUser) => {
        const { resetDailyCounters } = get();
        resetDailyCounters();
        const user: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Usuario',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || undefined,
          level: 1,
          xp: 0,
          xpToNextLevel: 1000,
          streak: 0,
          totalWorkouts: 0,
          totalMinutes: 0,
          joinDate: new Date().toISOString(),
          isPremium: false,
          sports: [],
          goals: [],
          stats: { weeklyWorkouts: 0, weeklyMinutes: 0, monthlyCalories: 0, bestStreak: 0, favoriteTime: 'Mañana' },
        };
        set({ user, isAuthenticated: true, plan: 'free' });
      },

      loginWithGoogle: async () => {
        // Demo fallback when Firebase not configured
        const demoUser: User = {
          id: 'demo-' + Date.now(),
          name: 'Usuario Demo',
          email: 'demo@entrenaconia.com',
          level: 1, xp: 0, xpToNextLevel: 1000, streak: 0,
          totalWorkouts: 0, totalMinutes: 0,
          joinDate: new Date().toISOString(),
          isPremium: false, sports: [], goals: [],
          stats: { weeklyWorkouts: 0, weeklyMinutes: 0, monthlyCalories: 0, bestStreak: 0, favoriteTime: 'Mañana' },
        };
        set({ user: demoUser, isAuthenticated: true, plan: 'free' });
        return true;
      },

      logout: () => set({
        user: null, isAuthenticated: false,
        chatMessages: [], plan: 'free',
        workoutsToday: 0, aiMessagesToday: 0,
        dailyGreetingShown: false, lastGreetingDate: '',
      }),

      setPlan: (plan) => set({ plan, user: get().user ? { ...get().user!, isPremium: plan !== 'free' } : null }),

      canDoWorkout: () => {
        const { plan, workoutsToday, lastActiveDate } = get();
        if (lastActiveDate !== today()) return true;
        const limits = plan === 'free' ? FREE_PLAN_LIMITS : PREMIUM_PLAN_LIMITS;
        return workoutsToday < limits.workoutsPerDay;
      },

      canSendAIMessage: () => {
        const { plan, aiMessagesToday, lastActiveDate } = get();
        if (lastActiveDate !== today()) return true;
        const limits = plan === 'free' ? FREE_PLAN_LIMITS : PREMIUM_PLAN_LIMITS;
        return aiMessagesToday < limits.aiMessagesPerDay;
      },

      incrementWorkout: () => {
        const { lastActiveDate, workoutsToday } = get();
        if (lastActiveDate !== today()) {
          set({ workoutsToday: 1, lastActiveDate: today() });
        } else {
          set({ workoutsToday: workoutsToday + 1 });
        }
      },

      incrementAIMessage: () => {
        const { lastActiveDate, aiMessagesToday } = get();
        if (lastActiveDate !== today()) {
          set({ aiMessagesToday: 1, lastActiveDate: today() });
        } else {
          set({ aiMessagesToday: aiMessagesToday + 1 });
        }
      },

      resetDailyCounters: () => {
        const { lastActiveDate } = get();
        if (lastActiveDate !== today()) {
          set({ workoutsToday: 0, aiMessagesToday: 0, lastActiveDate: today(), dailyGreetingShown: false });
        }
      },

      addChatMessage: (msg) => set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
      clearChat: () => set({ chatMessages: [] }),
      setCurrentWorkout: (workout) => set({ currentWorkout: workout }),
      setActiveSport: (sport) => set({ activeSport: sport }),

      completeWorkout: (_workoutId, xpReward) => {
        const { user, addXP, incrementWorkout } = get();
        if (!user) return;
        incrementWorkout();
        addXP(xpReward);
        set((state) => ({
          user: state.user ? {
            ...state.user,
            totalWorkouts: state.user.totalWorkouts + 1,
            streak: state.user.streak + 1,
            stats: { ...state.user.stats, weeklyWorkouts: state.user.stats.weeklyWorkouts + 1 },
          } : null,
        }));
      },

      addXP: (amount) => {
        const { user } = get();
        if (!user) return;
        const newXP = user.xp + amount;
        const levelUp = newXP >= user.xpToNextLevel;
        set({
          user: {
            ...user,
            xp: levelUp ? newXP - user.xpToNextLevel : newXP,
            level: levelUp ? user.level + 1 : user.level,
            xpToNextLevel: levelUp ? Math.round(user.xpToNextLevel * 1.5) : user.xpToNextLevel,
          },
        });
      },

      markDailyGreetingShown: () => set({ dailyGreetingShown: true, lastGreetingDate: today() }),

      addNotification: (n) => set((state) => ({ notifications: [n, ...state.notifications].slice(0, 20) })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'entrenaconia-v2',
      partialize: (state) => ({
        user: state.user, isAuthenticated: state.isAuthenticated,
        plan: state.plan, chatMessages: state.chatMessages,
        activeSport: state.activeSport, workoutsToday: state.workoutsToday,
        aiMessagesToday: state.aiMessagesToday, lastActiveDate: state.lastActiveDate,
        lastGreetingDate: state.lastGreetingDate, notifications: state.notifications,
        dailyGreetingShown: state.dailyGreetingShown,
      }),
      onRehydrateStorage: () => (state) => { state?.setHasHydrated(true); },
    }
  )
);

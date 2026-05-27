'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ChatMessage, Workout } from './types';
import { DEMO_USER } from './data';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  chatMessages: ChatMessage[];
  currentWorkout: Workout | null;
  isAIChatOpen: boolean;
  activeSport: string;
  _hasHydrated: boolean;

  setHasHydrated: (v: boolean) => void;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
  setCurrentWorkout: (workout: Workout | null) => void;
  toggleAIChat: () => void;
  setActiveSport: (sport: string) => void;
  completeWorkout: (workoutId: string) => void;
  addXP: (amount: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      chatMessages: [],
      currentWorkout: null,
      isAIChatOpen: false,
      activeSport: 'gym',
      _hasHydrated: false,

      setHasHydrated: (v) => set({ _hasHydrated: v }),

      setUser: (user) => set({ user, isAuthenticated: true }),

      login: async (email: string, _password: string) => {
        await new Promise(r => setTimeout(r, 800));
        const user = { ...DEMO_USER, email };
        set({ user, isAuthenticated: true });
        return true;
      },

      loginWithGoogle: async () => {
        await new Promise(r => setTimeout(r, 600));
        set({ user: DEMO_USER, isAuthenticated: true });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false, chatMessages: [] }),

      addChatMessage: (msg) => set((state) => ({
        chatMessages: [...state.chatMessages, msg],
      })),

      clearChat: () => set({ chatMessages: [] }),

      setCurrentWorkout: (workout) => set({ currentWorkout: workout }),

      toggleAIChat: () => set((state) => ({ isAIChatOpen: !state.isAIChatOpen })),

      setActiveSport: (sport) => set({ activeSport: sport }),

      completeWorkout: (_workoutId: string) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            totalWorkouts: user.totalWorkouts + 1,
            streak: user.streak + 1,
          },
        });
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
            xpToNextLevel: levelUp ? user.xpToNextLevel + 1000 : user.xpToNextLevel,
          },
        });
      },
    }),
    {
      name: 'entrenaconia-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        chatMessages: state.chatMessages,
        activeSport: state.activeSport,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

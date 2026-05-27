'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Zap, TrendingUp, Target } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const GREETINGS = [
  '¡Buenos días, campeón!',
  '¡Hola de nuevo!',
  '¡Tu entrenador IA te espera!',
  '¡A por otro gran día!',
  '¡El esfuerzo de hoy es el resultado de mañana!',
];

const TIPS = [
  'Recuerda hidratarte bien antes de entrenar. Tu rendimiento mejora un 20% con buena hidratación.',
  'Dormir 7-8h es tan importante como el entrenamiento. El músculo crece mientras descansas.',
  'Una buena nutrición post-entreno puede acelerar tu recuperación hasta un 40%.',
  'La constancia supera al talento. 20 minutos al día durante un año = resultados reales.',
  'El calentamiento no es opcional. 5 minutos ahora evitan semanas de lesión.',
  'Tu racha actual es tu mayor motivación. ¡No la rompas hoy!',
];

function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h < 12) return 'mañana';
  if (h < 20) return 'tarde';
  return 'noche';
}

function getMotivationalEmoji(): string {
  const emojis = ['💪', '🔥', '⚡', '🚀', '🏆', '🎯', '🌟', '💥'];
  return emojis[new Date().getDay() % emojis.length];
}

export function DailyGreeting() {
  const { user, plan, dailyGreetingShown, lastGreetingDate, markDailyGreetingShown } = useAppStore();
  const [visible, setVisible] = useState(false);
  const [tipIndex] = useState(() => Math.floor(Math.random() * TIPS.length));
  const [greetingIndex] = useState(() => Math.floor(Math.random() * GREETINGS.length));

  const today = new Date().toDateString();

  useEffect(() => {
    // Show greeting if not shown today
    if (!dailyGreetingShown || lastGreetingDate !== today) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1200); // slight delay so page loads first
      return () => clearTimeout(timer);
    }
  }, [dailyGreetingShown, lastGreetingDate, today]);

  const handleClose = () => {
    setVisible(false);
    markDailyGreetingShown();
  };

  if (!user) return null;

  const timeOfDay = getTimeOfDay();
  const emoji = getMotivationalEmoji();
  const streak = user.streak || 0;
  const workoutsToday = 0; // Could read from store if needed

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60"
            style={{ backdropFilter: 'blur(8px)' }}
            onClick={handleClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[380px] z-[91] bg-[#0d0d14] border border-[#6c5ce7]/40 rounded-3xl overflow-hidden shadow-2xl shadow-[#6c5ce7]/20"
          >
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-[#6c5ce7] via-[#00d2ff] to-[#fd79a8]" />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={14} />
            </button>

            <div className="p-5">
              {/* AI Icon + greeting */}
              <div className="flex items-start gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, -5, 5, -3, 0] }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center flex-shrink-0"
                >
                  <Zap size={20} className="text-white" />
                </motion.div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Tu IA Entrenadora</p>
                  <h3 className="text-white font-black text-lg leading-tight">
                    {GREETINGS[greetingIndex]}
                  </h3>
                </div>
              </div>

              {/* Personalized message */}
              <div className="bg-[#6c5ce7]/10 border border-[#6c5ce7]/20 rounded-2xl p-4 mb-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  {emoji} Buenas {timeOfDay}, <span className="text-[#a29bfe] font-semibold">{user.name.split(' ')[0]}</span>.
                  {streak > 0
                    ? ` Llevas <strong>${streak} días de racha</strong> — ¡no la rompas hoy! Tu constancia es increíble.`
                    : ' Hoy es un nuevo día para empezar a construir tu racha. ¡Vamos a por ello!'}
                </p>
                {streak > 5 && (
                  <div className="mt-2 flex items-center gap-1.5 text-[#fdcb6e] text-xs font-bold">
                    <span>🔥</span>
                    <span>{streak} días seguidos — Estás en racha épica</span>
                  </div>
                )}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { emoji: '🏋️', label: 'Entrenam.', value: user.totalWorkouts },
                  { emoji: '⭐', label: 'Nivel', value: user.level },
                  { emoji: '⚡', label: 'XP total', value: user.xp },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-2.5 text-center">
                    <p className="text-base">{s.emoji}</p>
                    <p className="text-white font-bold text-sm">{s.value}</p>
                    <p className="text-white/30 text-[10px]">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Daily tip */}
              <div className="bg-[#12121a] rounded-xl p-3 mb-4">
                <p className="text-white/30 text-[10px] font-bold mb-1 flex items-center gap-1">
                  <Target size={9} /> TIP DEL DÍA
                </p>
                <p className="text-white/60 text-xs leading-relaxed">{TIPS[tipIndex]}</p>
              </div>

              {/* Plan-specific message */}
              {plan === 'free' && (
                <div className="bg-gradient-to-r from-[#fdcb6e]/10 to-transparent border border-[#fdcb6e]/20 rounded-xl p-3 mb-4">
                  <p className="text-[#fdcb6e] text-xs font-semibold flex items-center gap-1.5 mb-0.5">
                    <TrendingUp size={11} />
                    Hoy tienes 1 entrenamiento disponible
                  </p>
                  <p className="text-white/40 text-xs">Pasa a Premium para entrenar sin límites</p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex gap-2">
                <a href="/dashboard/entrenar" className="flex-1" onClick={handleClose}>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] text-white font-bold text-sm hover:opacity-90 transition-all">
                    🏋️ Entrenar ahora
                  </button>
                </a>
                <button
                  onClick={handleClose}
                  className="py-2.5 px-4 rounded-xl bg-[#1e1e2e] text-white/50 font-medium text-sm hover:bg-[#2a2a3e] transition-all"
                >
                  Luego
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

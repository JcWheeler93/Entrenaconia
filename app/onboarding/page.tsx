'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle, Zap, Brain, Shield, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';

/* ─── Data ───────────────────────────────────────────────── */

const SPORT_OPTIONS = [
  { id: 'gym',       name: 'Gimnasio',   desc: 'Fuerza y musculación',    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=280&h=200&fit=crop&q=80', emoji: '🏋️' },
  { id: 'boxing',    name: 'Boxeo',      desc: 'Cardio y técnica',        photo: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=280&h=200&fit=crop&q=80', emoji: '🥊' },
  { id: 'yoga',      name: 'Yoga',       desc: 'Flexibilidad y calma',    photo: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=280&h=200&fit=crop&q=80', emoji: '🧘' },
  { id: 'padel',     name: 'Pádel',      desc: 'Deporte y diversión',     photo: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=280&h=200&fit=crop&q=80', emoji: '🏓' },
  { id: 'running',   name: 'Running',    desc: 'Resistencia y cardio',    photo: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=280&h=200&fit=crop&q=80', emoji: '🏃' },
  { id: 'crossfit',  name: 'CrossFit',   desc: 'Entrenamiento total',     photo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=280&h=200&fit=crop&q=80', emoji: '⚡' },
  { id: 'pilates',   name: 'Pilates',    desc: 'Core y postura',          photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=280&h=200&fit=crop&q=80', emoji: '🤸' },
  { id: 'calistenia',name: 'Calistenia', desc: 'Peso corporal',           photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=280&h=200&fit=crop&q=80', emoji: '💪' },
  { id: 'funcional', name: 'Funcional',  desc: 'Movimientos naturales',   photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=280&h=200&fit=crop&q=80', emoji: '🎯' },
  { id: 'hiit',      name: 'HIIT',       desc: 'Quema máxima rápido',     photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=280&h=200&fit=crop&q=80', emoji: '🔥' },
  { id: 'movilidad', name: 'Movilidad',  desc: 'Articulaciones sanas',    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=280&h=200&fit=crop&q=80', emoji: '🌊' },
];

const AGE_RANGES = [
  { id: '18-25', label: '18 — 25', emoji: '🚀', desc: 'Joven y lleno de energía' },
  { id: '26-35', label: '26 — 35', emoji: '⚡', desc: 'En la cima del rendimiento' },
  { id: '36-45', label: '36 — 45', emoji: '💪', desc: 'Experiencia y determinación' },
  { id: '46-55', label: '46 — 55', emoji: '🎯', desc: 'Entrena con inteligencia' },
  { id: '55+',   label: '55+',     emoji: '🌟', desc: 'Sin límites de edad' },
];

const GOALS = [
  { id: 'muscle',      label: 'Ganar músculo',      emoji: '💪', desc: 'Aumenta tu masa muscular y fuerza' },
  { id: 'weight_loss', label: 'Perder peso',         emoji: '🔥', desc: 'Quema grasa de forma sostenida' },
  { id: 'endurance',   label: 'Mejorar resistencia', emoji: '❤️', desc: 'Más fondo, más energía' },
  { id: 'health',      label: 'Salud general',       emoji: '🌿', desc: 'Bienestar integral y longevidad' },
  { id: 'sport',       label: 'Mejorar en deporte',  emoji: '🏆', desc: 'Sube tu nivel técnico' },
  { id: 'mobility',    label: 'Más movilidad',       emoji: '🌊', desc: 'Flexibilidad y articulaciones sanas' },
];

const INJURIES = [
  { id: 'none',     label: 'Sin lesiones',    emoji: '✅' },
  { id: 'knee',     label: 'Rodillas',         emoji: '🦵' },
  { id: 'back',     label: 'Espalda',          emoji: '🦴' },
  { id: 'shoulder', label: 'Hombros',          emoji: '💪' },
  { id: 'ankle',    label: 'Tobillos',         emoji: '🦶' },
  { id: 'wrist',    label: 'Muñecas',          emoji: '🤚' },
  { id: 'hip',      label: 'Caderas',          emoji: '🦴' },
  { id: 'neck',     label: 'Cuello/Cervicales',emoji: '🧠' },
];

const WEEKLY_TIMES = [
  { id: '2-3', label: '2 — 3 días', emoji: '😊', desc: 'Ideal para empezar' },
  { id: '3-4', label: '3 — 4 días', emoji: '💪', desc: 'Progreso constante' },
  { id: '4-5', label: '4 — 5 días', emoji: '🔥', desc: 'Resultados visibles rápido' },
  { id: '6+',  label: '6+ días',    emoji: '🏆', desc: 'Alto rendimiento' },
];

const LOADING_MESSAGES = [
  'Analizando tu perfil...',
  'Diseñando tu plan personalizado...',
  'Adaptando a tus objetivos...',
  'Configurando tus rutinas de entrenamiento...',
  'Ajustando la intensidad ideal...',
  '¡Tu plan está casi listo!',
];

/* ─── Typing effect hook ─────────────────────────────────── */

function useTypingEffect(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return { displayed, done };
}

/* ─── Step indicator ─────────────────────────────────────── */

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current ? 'w-6 h-2 bg-[#6c5ce7]' : i < current ? 'w-2 h-2 bg-[#6c5ce7]/50' : 'w-2 h-2 bg-[#2a2a3e]'
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

const TOTAL_STEPS = 6; // 0=welcome, 1=age, 2=goal, 3=sports, 4=injuries, 5=time

export default function OnboardingPage() {
  const router = useRouter();
  const { isAuthenticated, _hasHydrated, onboardingComplete, completeOnboarding, user } = useAppStore();

  const [step, setStep] = useState(0);
  const [ageRange, setAgeRange] = useState('');
  const [goal, setGoal] = useState('');
  const [sports, setSports] = useState<string[]>([]);
  const [injuries, setInjuries] = useState<string[]>([]);
  const [weeklyTime, setWeeklyTime] = useState('');
  const [generating, setGenerating] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [planReady, setPlanReady] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!_hasHydrated) return;
    if (!isAuthenticated) router.replace('/login');
    if (onboardingComplete) router.replace('/dashboard');
  }, [_hasHydrated, isAuthenticated, onboardingComplete, router]);

  // Typing intro text
  const introText = `¡Hola${user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋 Soy tu entrenadora personal con IA. En menos de un minuto voy a crear un plan de entrenamiento 100% personalizado para ti. Solo necesito conocerte un poco mejor. ¿Empezamos?`;
  const { displayed: typedText, done: typingDone } = useTypingEffect(
    step === 0 ? introText : '',
    25
  );

  // Sport toggle (max 2)
  const toggleSport = (id: string) => {
    setSports(prev => {
      if (prev.includes(id)) return prev.filter(s => s !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  // Injury toggle (none is exclusive)
  const toggleInjury = (id: string) => {
    if (id === 'none') {
      setInjuries(['none']);
    } else {
      setInjuries(prev => {
        const filtered = prev.filter(i => i !== 'none');
        return filtered.includes(id) ? filtered.filter(i => i !== id) : [...filtered, id];
      });
    }
  };

  // Generate plan
  const handleGeneratePlan = async () => {
    setGenerating(true);
    let msgIdx = 0;
    const iv = setInterval(() => {
      msgIdx++;
      setLoadingMsg(msgIdx);
      if (msgIdx >= LOADING_MESSAGES.length - 1) clearInterval(iv);
    }, 700);

    await new Promise(r => setTimeout(r, 4500));
    clearInterval(iv);

    completeOnboarding({
      ageRange,
      goal,
      sports,
      injuries: injuries.length === 0 ? ['none'] : injuries,
      weeklyTime,
    });

    setGenerating(false);
    setPlanReady(true);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  /* ── Render loading / plan ready ── */
  if (generating) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#6c5ce7] border-r-[#00d2ff]"
            />
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
              <Brain size={28} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-3">Creando tu plan</h2>

          <AnimatePresence mode="wait">
            <motion.p
              key={loadingMsg}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white/50 text-sm mb-8"
            >
              {LOADING_MESSAGES[Math.min(loadingMsg, LOADING_MESSAGES.length - 1)]}
            </motion.p>
          </AnimatePresence>

          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-[#6c5ce7]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (planReady) {
    const chosenSports = SPORT_OPTIONS.filter(s => sports.includes(s.id));
    const chosenGoal = GOALS.find(g => g.id === goal);
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 18 }}
          className="max-w-md w-full text-center"
        >
          {/* Confetti-like sparkle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center shadow-2xl shadow-[#6c5ce7]/40"
          >
            <Sparkles size={36} className="text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-black text-white mb-3"
          >
            ¡Tu plan está listo! 🎉
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-white/50 mb-8"
          >
            He diseñado un plan personalizado basado en tu perfil. Puedes ajustarlo cuando quieras.
          </motion.p>

          {/* Plan summary card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-5 mb-6 text-left space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{chosenGoal?.emoji}</span>
              <div>
                <p className="text-white/40 text-xs">Objetivo principal</p>
                <p className="text-white font-semibold">{chosenGoal?.label}</p>
              </div>
            </div>
            <div className="h-px bg-[#2a2a3e]" />
            <div>
              <p className="text-white/40 text-xs mb-2">Tus deportes</p>
              <div className="flex gap-3">
                {chosenSports.map(s => (
                  <div key={s.id} className="flex items-center gap-2 bg-[#1e1e2e] rounded-xl px-3 py-2 border border-[#2a2a3e]">
                    <span className="text-lg">{s.emoji}</span>
                    <span className="text-white text-sm font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-px bg-[#2a2a3e]" />
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-white/40 text-xs">Sesiones por semana</p>
                <p className="text-white font-semibold">{weeklyTime} días</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              fullWidth
              size="lg"
              onClick={() => router.push('/dashboard')}
              className="shadow-xl shadow-[#6c5ce7]/20"
            >
              Ir a mi panel de entrenamiento <ChevronRight size={18} className="inline ml-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ── Main step flow ── */
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
          <Zap size={15} className="text-white" />
        </div>
        <span className="font-bold text-white text-lg">EntrenaConIA</span>
      </div>

      {/* Step dots */}
      {step > 0 && <StepDots current={step - 1} total={TOTAL_STEPS - 1} />}

      <div className="w-full max-w-xl mt-6">
        <AnimatePresence mode="wait">
          {/* ── STEP 0: AI Welcome ── */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* AI Avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 14, delay: 0.1 }}
                className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center shadow-2xl shadow-[#6c5ce7]/40 relative"
              >
                <Brain size={44} className="text-white" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]"
                />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Tu entrenadora IA</h1>
              <p className="text-white/40 text-sm mb-8">100% personalizada · 24/7 disponible</p>

              {/* Chat bubble with typing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-[#12121a] border border-[#6c5ce7]/30 rounded-2xl rounded-tl-sm p-5 text-left mb-8 relative"
              >
                <div className="absolute -top-2 left-5 w-4 h-4 bg-[#12121a] border-l border-t border-[#6c5ce7]/30 rotate-45" />
                <p className="text-white leading-relaxed text-sm sm:text-base min-h-[80px]">
                  {typedText}
                  {!typingDone && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-0.5 h-4 bg-[#6c5ce7] ml-0.5 align-middle"
                    />
                  )}
                </p>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: typingDone ? 1 : 0 }}
                className="flex flex-wrap justify-center gap-3 mb-8"
              >
                {[
                  { icon: Shield, text: 'Datos privados y seguros', color: '#00b894' },
                  { icon: Brain, text: 'Plan único para ti', color: '#6c5ce7' },
                  { icon: Zap, text: 'Resultados reales', color: '#fdcb6e' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
                    <Icon size={12} style={{ color }} />
                    {text}
                  </div>
                ))}
              </motion.div>

              <motion.div animate={{ opacity: typingDone ? 1 : 0 }}>
                <Button
                  fullWidth
                  size="lg"
                  onClick={nextStep}
                  disabled={!typingDone}
                  className="shadow-xl shadow-[#6c5ce7]/20"
                >
                  ¡Vamos! — Solo 1 minuto <ChevronRight size={18} className="inline ml-1" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* ── STEP 1: Age range ── */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">¿Cuántos años tienes?</h2>
              <p className="text-white/40 text-sm text-center mb-8">La IA ajustará la intensidad y el tipo de ejercicio a tu edad.</p>

              <div className="space-y-3">
                {AGE_RANGES.map(range => (
                  <motion.button
                    key={range.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setAgeRange(range.id); setTimeout(nextStep, 250); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      ageRange === range.id
                        ? 'border-[#6c5ce7] bg-[#6c5ce7]/15 text-white'
                        : 'border-[#2a2a3e] bg-[#12121a] text-white/70 hover:border-[#6c5ce7]/40'
                    }`}
                  >
                    <span className="text-3xl">{range.emoji}</span>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-lg">{range.label} años</p>
                      <p className="text-sm opacity-60">{range.desc}</p>
                    </div>
                    {ageRange === range.id && <CheckCircle size={20} className="text-[#6c5ce7] flex-shrink-0" />}
                  </motion.button>
                ))}
              </div>

              <button onClick={prevStep} className="mt-6 flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors mx-auto">
                <ArrowLeft size={16} /> Volver
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: Goal ── */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">¿Cuál es tu objetivo?</h2>
              <p className="text-white/40 text-sm text-center mb-8">Elige el que más se ajuste a lo que quieres conseguir.</p>

              <div className="grid grid-cols-2 gap-3">
                {GOALS.map(g => (
                  <motion.button
                    key={g.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setGoal(g.id); setTimeout(nextStep, 250); }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-center ${
                      goal === g.id
                        ? 'border-[#6c5ce7] bg-[#6c5ce7]/15'
                        : 'border-[#2a2a3e] bg-[#12121a] hover:border-[#6c5ce7]/40'
                    }`}
                  >
                    <span className="text-3xl">{g.emoji}</span>
                    <p className={`font-bold text-sm leading-tight ${goal === g.id ? 'text-white' : 'text-white/70'}`}>{g.label}</p>
                    <p className={`text-xs leading-tight ${goal === g.id ? 'text-white/60' : 'text-white/30'}`}>{g.desc}</p>
                  </motion.button>
                ))}
              </div>

              <button onClick={prevStep} className="mt-6 flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors mx-auto">
                <ArrowLeft size={16} /> Volver
              </button>
            </motion.div>
          )}

          {/* ── STEP 3: Sports ── */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">Elige tus 2 deportes</h2>
              <p className="text-white/40 text-sm text-center mb-2">
                La IA combinará planes para los dos deportes que elijas.
              </p>
              <p className="text-center mb-6">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  sports.length === 2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#6c5ce7]/20 text-[#a29bfe]'
                }`}>
                  {sports.length}/2 seleccionados
                </span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1 pb-2">
                {SPORT_OPTIONS.map(sport => {
                  const selected = sports.includes(sport.id);
                  const maxed = sports.length >= 2 && !selected;
                  return (
                    <motion.button
                      key={sport.id}
                      whileHover={{ scale: maxed ? 1 : 1.03 }}
                      whileTap={{ scale: maxed ? 1 : 0.97 }}
                      onClick={() => !maxed && toggleSport(sport.id)}
                      className={`relative rounded-2xl overflow-hidden h-32 border-2 transition-all ${
                        selected
                          ? 'border-[#6c5ce7] shadow-lg shadow-[#6c5ce7]/30'
                          : maxed
                            ? 'border-[#2a2a3e] opacity-40 cursor-not-allowed'
                            : 'border-transparent hover:border-white/20'
                      }`}
                    >
                      <Image src={sport.photo} alt={sport.name} fill className="object-cover" />
                      <div className={`absolute inset-0 transition-all ${
                        selected ? 'bg-[#6c5ce7]/40' : 'bg-black/50 hover:bg-black/40'
                      }`} />
                      {selected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#6c5ce7] flex items-center justify-center shadow-lg">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex flex-col justify-end p-3">
                        <p className="text-white font-bold text-sm drop-shadow">{sport.name}</p>
                        <p className="text-white/70 text-xs drop-shadow">{sport.desc}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={prevStep} className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors px-4">
                  <ArrowLeft size={16} /> Volver
                </button>
                <Button
                  fullWidth
                  disabled={sports.length !== 2}
                  onClick={nextStep}
                >
                  {sports.length === 2 ? 'Continuar →' : `Selecciona ${2 - sports.length} más`}
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Injuries ── */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">¿Tienes alguna lesión?</h2>
              <p className="text-white/40 text-sm text-center mb-8">La IA evitará ejercicios que puedan hacerte daño.</p>

              <div className="grid grid-cols-2 gap-3">
                {INJURIES.map(inj => {
                  const selected = injuries.includes(inj.id);
                  return (
                    <motion.button
                      key={inj.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInjury(inj.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                        selected
                          ? 'border-[#6c5ce7] bg-[#6c5ce7]/15 text-white'
                          : 'border-[#2a2a3e] bg-[#12121a] text-white/60 hover:border-[#6c5ce7]/40'
                      }`}
                    >
                      <span className="text-2xl">{inj.emoji}</span>
                      <span className="font-medium text-sm">{inj.label}</span>
                      {selected && <CheckCircle size={16} className="text-[#6c5ce7] ml-auto flex-shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={prevStep} className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors px-4">
                  <ArrowLeft size={16} /> Volver
                </button>
                <Button
                  fullWidth
                  disabled={injuries.length === 0}
                  onClick={nextStep}
                >
                  Continuar →
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 5: Weekly time ── */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">¿Cuántos días puedes entrenar?</h2>
              <p className="text-white/40 text-sm text-center mb-8">La IA distribuirá tus sesiones de forma óptima cada semana.</p>

              <div className="space-y-3">
                {WEEKLY_TIMES.map(wt => (
                  <motion.button
                    key={wt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setWeeklyTime(wt.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      weeklyTime === wt.id
                        ? 'border-[#6c5ce7] bg-[#6c5ce7]/15'
                        : 'border-[#2a2a3e] bg-[#12121a] hover:border-[#6c5ce7]/40'
                    }`}
                  >
                    <span className="text-3xl">{wt.emoji}</span>
                    <div className="flex-1 text-left">
                      <p className={`font-bold text-lg ${weeklyTime === wt.id ? 'text-white' : 'text-white/70'}`}>
                        {wt.label} por semana
                      </p>
                      <p className={`text-sm ${weeklyTime === wt.id ? 'text-white/60' : 'text-white/30'}`}>
                        {wt.desc}
                      </p>
                    </div>
                    {weeklyTime === wt.id && <CheckCircle size={20} className="text-[#6c5ce7] flex-shrink-0" />}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={prevStep} className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors px-4">
                  <ArrowLeft size={16} /> Volver
                </button>
                <Button
                  fullWidth
                  disabled={!weeklyTime}
                  onClick={handleGeneratePlan}
                  className={weeklyTime ? 'shadow-xl shadow-[#6c5ce7]/20' : ''}
                >
                  <Brain size={16} className="inline mr-2" />
                  Crear mi plan con IA ✨
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

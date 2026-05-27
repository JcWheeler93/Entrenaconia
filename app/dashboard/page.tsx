'use client';

import { motion } from 'framer-motion';
import { Flame, Clock, Zap, Trophy, TrendingUp, ChevronRight, Play, Target } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DEMO_WORKOUTS, WEEKLY_PROGRESS, SPORTS } from '@/lib/data';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const greetings = ['Buenos días', 'Buenas tardes', 'Buenas noches'];
const getGreeting = () => {
  const h = new Date().getHours();
  return h < 12 ? greetings[0] : h < 20 ? greetings[1] : greetings[2];
};

export default function DashboardHome() {
  const { user, setCurrentWorkout } = useAppStore();
  if (!user) return null;

  const todayWorkout = DEMO_WORKOUTS[0];
  const xpPct = Math.round((user.xp / user.xpToNextLevel) * 100);

  const quickStats = [
    { label: 'Racha', value: `${user.streak} días`, icon: '🔥', color: '#e17055', sub: `Mejor: ${user.stats.bestStreak}` },
    { label: 'Esta semana', value: `${user.stats.weeklyWorkouts} entrenos`, icon: '🏋️', color: '#6c5ce7', sub: `${user.stats.weeklyMinutes} minutos` },
    { label: 'Calorías', value: `${user.stats.monthlyCalories.toLocaleString()}`, icon: '🔥', color: '#00b894', sub: 'Este mes' },
    { label: 'Tiempo total', value: `${Math.round(user.totalMinutes / 60)}h`, icon: '⏱️', color: '#00d2ff', sub: `${user.totalMinutes} minutos` },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <p className="text-white/40 text-sm mb-1">{getGreeting()},</p>
          <h1 className="text-3xl font-black text-white">{user.name} 💪</h1>
          <p className="text-white/50 text-sm mt-1">
            La IA ha preparado tu sesión de hoy según tu progreso
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="streak">🔥 {user.streak}</Badge>
          <Badge variant="level">⚡ Nv. {user.level}</Badge>
        </div>
      </motion.div>

      {/* XP Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card padding="md" className="!bg-gradient-to-r from-[#6c5ce7]/10 to-[#00d2ff]/5 border-[#6c5ce7]/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[#6c5ce7]" />
              <span className="text-white font-semibold">Nivel {user.level}</span>
              <span className="text-white/40 text-sm">→ Nivel {user.level + 1}</span>
            </div>
            <span className="text-sm text-[#a29bfe] font-semibold">{user.xp} / {user.xpToNextLevel} XP</span>
          </div>
          <ProgressBar value={user.xp} max={user.xpToNextLevel} animated={false} />
          <p className="text-white/30 text-xs mt-2">Faltan {user.xpToNextLevel - user.xp} XP para el nivel {user.level + 1}</p>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 + 0.15 }}
          >
            <Card hover padding="md">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{stat.icon}</span>
                <span className="text-white/40 text-xs">{stat.label}</span>
              </div>
              <p className="text-white font-bold text-xl">{stat.value}</p>
              <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Workout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <Zap size={18} className="text-[#6c5ce7]" /> Entrenamiento de hoy
            </h2>
            <span className="text-xs text-[#6c5ce7] flex items-center gap-1">
              Generado por IA <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          </div>

          <Card padding="none" className="overflow-hidden">
            <div
              className="relative p-6"
              style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(0,210,255,0.05))' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#6c5ce7]/20 flex items-center justify-center text-3xl flex-shrink-0">
                  🏋️
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl mb-1">{todayWorkout.title}</h3>
                  <p className="text-white/50 text-sm">{todayWorkout.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-5">
                <div className="flex items-center gap-1.5 bg-black/20 rounded-lg px-3 py-1.5">
                  <Clock size={13} className="text-white/50" />
                  <span className="text-white/70 text-sm">{todayWorkout.duration} min</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/20 rounded-lg px-3 py-1.5">
                  <Flame size={13} className="text-orange-400" />
                  <span className="text-white/70 text-sm">{todayWorkout.caloriesBurn} kcal</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/20 rounded-lg px-3 py-1.5">
                  <Zap size={13} className="text-[#fdcb6e]" />
                  <span className="text-white/70 text-sm">+{todayWorkout.xpReward} XP</span>
                </div>
                <Badge variant="default" size="sm">
                  {todayWorkout.exercises.length} ejercicios
                </Badge>
              </div>

              <div className="space-y-2 mb-5">
                {todayWorkout.exercises.slice(0, 3).map((ex) => (
                  <div key={ex.id} className="flex items-center gap-3 bg-black/20 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-[#6c5ce7]" />
                    <span className="text-white text-sm font-medium flex-1">{ex.name}</span>
                    <span className="text-white/40 text-xs">
                      {ex.sets ? `${ex.sets}×${ex.reps || (ex.duration + 's')}` : `${ex.duration}s`}
                    </span>
                  </div>
                ))}
                {todayWorkout.exercises.length > 3 && (
                  <p className="text-white/30 text-xs text-center py-1">+ {todayWorkout.exercises.length - 3} ejercicios más</p>
                )}
              </div>

              <Link href="/dashboard/entrenar">
                <Button fullWidth>
                  <span className="flex items-center gap-2 justify-center">
                    <Play size={16} className="fill-white" />
                    Empezar entrenamiento
                  </span>
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <Target size={18} className="text-emerald-400" /> Objetivos
            </h2>
            <Link href="/dashboard/objetivos" className="text-white/30 hover:text-white transition-colors">
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="space-y-3">
            {user.goals.map((goal, i) => (
              <Card key={goal.id} padding="md" hover>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-white text-sm font-semibold leading-tight">{goal.title}</p>
                  <span className="text-xs text-white/40 ml-2 flex-shrink-0">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </span>
                </div>
                <ProgressBar
                  value={goal.current}
                  max={goal.target}
                  height={5}
                  animated={false}
                  color={i === 0 ? 'linear-gradient(90deg, #6c5ce7, #00d2ff)' : i === 1 ? 'linear-gradient(90deg, #00b894, #00d2ff)' : 'linear-gradient(90deg, #e17055, #fd79a8)'}
                />
                <p className="text-white/30 text-xs mt-1.5">{goal.current} / {goal.target} {goal.unit}</p>
              </Card>
            ))}

            <Link href="/dashboard/objetivos">
              <button className="w-full border border-dashed border-[#2a2a3e] rounded-2xl py-3 text-white/30 text-sm hover:border-[#6c5ce7]/50 hover:text-white/60 transition-all">
                + Añadir objetivo
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Weekly Chart */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[#00d2ff]" />
            <h2 className="text-white font-bold text-lg">Actividad semanal</h2>
          </div>
          <Card padding="md">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={WEEKLY_PROGRESS} barSize={28}>
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#12121a', border: '1px solid #2a2a3e', borderRadius: 8, color: '#fff', fontSize: 12 }}
                  formatter={(v: number) => [`${v} min`, 'Tiempo']}
                />
                <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                  {WEEKLY_PROGRESS.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.workouts > 0 ? 'url(#barGradient)' : '#2a2a3e'}
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c5ce7" />
                    <stop offset="100%" stopColor="#00d2ff" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* AI Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🤖</span>
            <h2 className="text-white font-bold text-lg">IA Entrenadora</h2>
            <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <Card padding="md" className="!bg-gradient-to-br from-[#6c5ce7]/10 to-[#12121a] border-[#6c5ce7]/20 h-full">
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#6c5ce7]/20 flex items-center justify-center text-xl flex-shrink-0">🤖</div>
              <div className="bg-[#1e1e2e] rounded-2xl rounded-tl-sm p-4 flex-1">
                <p className="text-white text-sm leading-relaxed">
                  Hola {user.name.split(' ')[0]}! Según tu progreso de esta semana, hoy te recomiendo <strong>fuerza de piernas y core</strong>. Tu volumen de squat ha mejorado un 8% — sigues el camino correcto 💪
                </p>
                <p className="text-white/40 text-xs mt-2">Hace 2 minutos</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {[
                'Ver el plan detallado',
                '¿Puedo sustituir algún ejercicio?',
                'Necesito algo más corto hoy',
              ].map((q) => (
                <Link key={q} href="/dashboard/ia">
                  <button className="w-full text-left text-sm text-white/60 hover:text-white bg-[#1e1e2e] hover:bg-[#2a2a3e] rounded-xl px-4 py-2.5 transition-all border border-[#2a2a3e] hover:border-[#6c5ce7]/30">
                    {q}
                  </button>
                </Link>
              ))}
            </div>

            <Link href="/dashboard/ia">
              <Button fullWidth variant="secondary" size="sm">
                Abrir chat IA <ChevronRight size={14} className="inline ml-1" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>

      {/* More Workouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Zap size={18} className="text-[#fdcb6e]" /> Otros entrenamientos
          </h2>
          <Link href="/dashboard/entrenar" className="text-[#6c5ce7] text-sm hover:underline flex items-center gap-1">
            Ver todos <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_WORKOUTS.slice(1).map((workout, i) => (
            <motion.div
              key={workout.id}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-5 hover:border-[#2a2a3e] transition-all cursor-pointer"
              onClick={() => setCurrentWorkout(workout)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${workout.sport.color}20` }}>
                  {workout.sport.emoji}
                </div>
                <div>
                  <Badge variant="default" size="sm">{workout.sport.name}</Badge>
                </div>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{workout.title}</h3>
              <p className="text-white/40 text-xs mb-3 leading-relaxed line-clamp-2">{workout.description}</p>
              <div className="flex items-center gap-3 text-xs text-white/50">
                <span className="flex items-center gap-1"><Clock size={11} />{workout.duration}m</span>
                <span className="flex items-center gap-1"><Flame size={11} className="text-orange-400" />{workout.caloriesBurn} kcal</span>
                <span className="flex items-center gap-1 ml-auto text-[#fdcb6e]"><Zap size={11} />+{workout.xpReward} XP</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

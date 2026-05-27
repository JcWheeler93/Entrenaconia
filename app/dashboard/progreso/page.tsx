'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Flame, Clock, Zap, Trophy, Target, Calendar } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { WEEKLY_PROGRESS } from '@/lib/data';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area,
} from 'recharts';

const MONTHLY_DATA = [
  { mes: 'Ene', entrenamientos: 12, minutos: 540, calorias: 3200 },
  { mes: 'Feb', entrenamientos: 15, minutos: 680, calorias: 4100 },
  { mes: 'Mar', entrenamientos: 10, minutos: 450, calorias: 2800 },
  { mes: 'Abr', entrenamientos: 18, minutos: 820, calorias: 5000 },
  { mes: 'May', entrenamientos: 20, minutos: 900, calorias: 5600 },
  { mes: 'Jun', entrenamientos: 22, minutos: 980, calorias: 6200 },
];

const SPORT_RADAR = [
  { sport: 'Gym', nivel: 75 },
  { sport: 'Boxeo', nivel: 55 },
  { sport: 'Pádel', nivel: 65 },
  { sport: 'Running', nivel: 70 },
  { sport: 'Yoga', nivel: 40 },
  { sport: 'HIIT', nivel: 60 },
];

const ACHIEVEMENTS_RECENT = [
  { emoji: '🌟', title: 'Primer Paso', date: '15 Ene', xp: 100 },
  { emoji: '🌅', title: 'Madrugador', date: '18 Ene', xp: 200 },
  { emoji: '🔥', title: 'Semana Perfecta', date: '22 Ene', xp: 500 },
];

export default function ProgresoPage() {
  const { user } = useAppStore();
  if (!user) return null;

  const statCards = [
    { label: 'Entrenamientos totales', value: user.totalWorkouts, icon: Trophy, color: '#6c5ce7', sub: '+5 esta semana' },
    { label: 'Tiempo entrenado', value: `${Math.round(user.totalMinutes / 60)}h`, icon: Clock, color: '#00d2ff', sub: `${user.totalMinutes} minutos` },
    { label: 'Calorías quemadas', value: user.stats.monthlyCalories.toLocaleString(), icon: Flame, color: '#e17055', sub: 'Este mes' },
    { label: 'Mejor racha', value: `${user.stats.bestStreak} días`, icon: Zap, color: '#fdcb6e', sub: `Actual: ${user.streak} días` },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Mi Progreso 📊</h1>
        <p className="text-white/50">Análisis detallado de tu evolución y rendimiento</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card hover padding="md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                    <Icon size={15} style={{ color: stat.color }} />
                  </div>
                  <span className="text-white/40 text-xs">{stat.label}</span>
                </div>
                <p className="text-white font-black text-2xl">{stat.value}</p>
                <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Area Chart - Monthly */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[#6c5ce7]" />
            <h2 className="text-white font-bold">Entrenamientos por mes</h2>
          </div>
          <Card padding="md">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MONTHLY_DATA}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#12121a', border: '1px solid #2a2a3e', borderRadius: 8, color: '#fff', fontSize: 12 }}
                  formatter={(v: number) => [v, 'Entrenamientos']}
                />
                <Area type="monotone" dataKey="entrenamientos" stroke="#6c5ce7" strokeWidth={2} fill="url(#areaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Sport Radar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-[#00d2ff]" />
            <h2 className="text-white font-bold">Nivel por deporte</h2>
          </div>
          <Card padding="md">
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={SPORT_RADAR}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="sport" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Nivel" dataKey="nivel" stroke="#6c5ce7" fill="#6c5ce7" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-emerald-400" />
            <h2 className="text-white font-bold">Actividad semanal</h2>
          </div>
          <Card padding="md">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={WEEKLY_PROGRESS} barSize={32}>
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#12121a', border: '1px solid #2a2a3e', borderRadius: 8, color: '#fff', fontSize: 12 }}
                  formatter={(v: number, name: string) => [
                    name === 'minutes' ? `${v} min` : name === 'calories' ? `${v} kcal` : v,
                    name === 'minutes' ? 'Tiempo' : name === 'calories' ? 'Calorías' : name,
                  ]}
                />
                <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                  {WEEKLY_PROGRESS.map((entry, i) => (
                    <Cell key={i} fill={entry.workouts > 0 ? '#6c5ce7' : '#2a2a3e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Calories Line */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center gap-2 mb-4">
            <Flame size={18} className="text-orange-400" />
            <h2 className="text-white font-bold">Calorías quemadas por mes</h2>
          </div>
          <Card padding="md">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={MONTHLY_DATA}>
                <defs>
                  <linearGradient id="calLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#e17055" />
                    <stop offset="100%" stopColor="#fdcb6e" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#12121a', border: '1px solid #2a2a3e', borderRadius: 8, color: '#fff', fontSize: 12 }}
                  formatter={(v: number) => [`${v.toLocaleString()} kcal`, 'Calorías']}
                />
                <Line type="monotone" dataKey="calorias" stroke="url(#calLine)" strokeWidth={3} dot={{ fill: '#e17055', strokeWidth: 0, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* XP Progress & Recent Achievements */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-[#fdcb6e]" />
            <h2 className="text-white font-bold">Progresión de nivel</h2>
          </div>
          <Card padding="md">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center mx-auto mb-3 text-white font-black text-2xl shadow-[0_0_30px_rgba(108,92,231,0.4)]">
                {user.level}
              </div>
              <p className="text-white font-bold text-xl">Nivel {user.level}</p>
              <p className="text-white/40 text-sm">{user.totalWorkouts} entrenamientos completados</p>
            </div>
            <ProgressBar value={user.xp} max={user.xpToNextLevel} showLabel label={`${user.xp} XP`} animated={false} />
            <p className="text-white/30 text-xs text-center mt-2">{user.xpToNextLevel - user.xp} XP para el nivel {user.level + 1}</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-[#fdcb6e]" />
            <h2 className="text-white font-bold">Logros recientes</h2>
          </div>
          <div className="space-y-3">
            {ACHIEVEMENTS_RECENT.map((a, i) => (
              <Card key={i} hover padding="md" className="!flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6c5ce7]/15 flex items-center justify-center text-2xl flex-shrink-0">
                  {a.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{a.title}</p>
                  <p className="text-white/40 text-xs">{a.date}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[#fdcb6e]/20 text-[#fdcb6e] font-bold flex-shrink-0">
                  +{a.xp} XP
                </span>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

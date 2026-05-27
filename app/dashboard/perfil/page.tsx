'use client';

import { motion } from 'framer-motion';
import {
  Flame, Zap, Trophy, Clock, Dumbbell, TrendingUp,
  Star, Edit3, Crown, Target, Calendar, Award
} from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { ACHIEVEMENTS, SPORTS } from '@/lib/data';
import { ProgressBar } from '@/components/ui/ProgressBar';

const SPORT_LEVELS = [
  { id: 'gym', level: 7, xp: 3400, maxXp: 5000 },
  { id: 'boxing', level: 4, xp: 1200, maxXp: 2500 },
  { id: 'padel', level: 5, xp: 2100, maxXp: 3000 },
  { id: 'running', level: 3, xp: 800, maxXp: 2000 },
  { id: 'yoga', level: 2, xp: 400, maxXp: 1500 },
];

const ACTIVITY = [
  // last 35 days activity grid (0=rest, 1=light, 2=medium, 3=intense)
  3,1,0,2,3,1,0,3,2,0,1,3,2,1,0,
  2,3,1,0,2,3,0,1,2,3,1,0,3,2,1,
  0,2,3,1,0,
];

function ActivityDot({ level }: { level: number }) {
  const colors = ['bg-[#1e1e2e]', 'bg-[#6c5ce7]/40', 'bg-[#6c5ce7]/70', 'bg-[#6c5ce7]'];
  return <div className={`w-3 h-3 rounded-sm ${colors[level]}`} />;
}

export default function PerfilPage() {
  const { user, plan } = useAppStore();
  if (!user) return null;

  const xpPct = Math.round((user.xp / user.xpToNextLevel) * 100);
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.unlocked);
  const nextAchievement = ACHIEVEMENTS.find(a => !a.unlocked);

  const memberDays = Math.floor(
    (Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#6c5ce7]/20 via-[#12121a] to-[#00d2ff]/10 border border-[#6c5ce7]/30 rounded-3xl overflow-hidden mb-6"
      >
        {/* Top gradient strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c5ce7] via-[#00d2ff] to-[#fd79a8]" />

        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #6c5ce7, transparent)', filter: 'blur(60px)' }}
        />

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center text-white font-black text-3xl shadow-xl">
                {user.name.charAt(0)}
              </div>
              {plan !== 'free' && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-[#fdcb6e] to-[#e17055] rounded-lg flex items-center justify-center shadow-lg">
                  <Crown size={13} className="text-black" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{user.name}</h1>
                  <p className="text-white/40 text-sm mt-0.5">{user.email}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] text-white font-bold">
                      Nivel {user.level}
                    </span>
                    {plan !== 'free' && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-[#fdcb6e] to-[#e17055] text-black font-bold">
                        ⭐ Premium
                      </span>
                    )}
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <Calendar size={11} />
                      {memberDays > 0 ? `${memberDays}d en EntrenaConIA` : 'Recién llegado'}
                    </span>
                  </div>
                </div>
                <Link href="/dashboard/ajustes">
                  <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/10">
                    <Edit3 size={16} />
                  </button>
                </Link>
              </div>

              {/* XP Bar */}
              <div className="mt-4">
                <div className="flex justify-between mb-1.5">
                  <span className="text-white/50 text-xs">Progreso al nivel {user.level + 1}</span>
                  <span className="text-[#a29bfe] text-xs font-bold">{user.xp} / {user.xpToNextLevel} XP</span>
                </div>
                <ProgressBar value={user.xp} max={user.xpToNextLevel} animated={false} height={6} />
                <p className="text-white/25 text-xs mt-1">{user.xpToNextLevel - user.xp} XP para el siguiente nivel</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Dumbbell, label: 'Entrenamientos', value: user.totalWorkouts, color: '#6c5ce7', emoji: '🏋️' },
          { icon: Flame, label: 'Racha actual', value: `${user.streak}d`, color: '#e17055', emoji: '🔥' },
          { icon: Clock, label: 'Horas totales', value: `${Math.round(user.totalMinutes / 60)}h`, color: '#00d2ff', emoji: '⏱️' },
          { icon: Star, label: 'Mejor racha', value: `${user.stats.bestStreak}d`, color: '#fdcb6e', emoji: '⭐' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-4 text-center"
          >
            <p className="text-2xl mb-1">{s.emoji}</p>
            <p className="text-white font-black text-xl">{s.value}</p>
            <p className="text-white/40 text-xs">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Activity grid */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-5"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#6c5ce7]" />
              Actividad reciente
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {ACTIVITY.map((level, i) => (
                <ActivityDot key={i} level={level} />
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#1e1e2e] inline-block" />Sin entreno</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#6c5ce7]/40 inline-block" />Suave</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#6c5ce7] inline-block" />Intenso</span>
            </div>
          </motion.div>

          {/* Sport levels */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-5"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Zap size={16} className="text-[#6c5ce7]" />
              Nivel por deporte
            </h3>
            <div className="space-y-3">
              {SPORT_LEVELS.map((sl) => {
                const sport = SPORTS.find(s => s.id === sl.id);
                if (!sport) return null;
                return (
                  <div key={sl.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/70 text-sm flex items-center gap-2">
                        <span>{sport.emoji}</span>
                        {sport.name}
                      </span>
                      <span className="text-xs text-white/40 font-bold">Nv. {sl.level}</span>
                    </div>
                    <ProgressBar
                      value={sl.xp}
                      max={sl.maxXp}
                      height={5}
                      animated={false}
                      color={sport.color}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Trophy size={16} className="text-[#fdcb6e]" />
                Logros
              </h3>
              <Link href="/dashboard/logros">
                <span className="text-[#6c5ce7] text-xs hover:underline">Ver todos →</span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {unlockedAchievements.slice(0, 6).map((a) => (
                <div
                  key={a.id}
                  className="bg-gradient-to-br from-[#6c5ce7]/15 to-[#6c5ce7]/5 border border-[#6c5ce7]/20 rounded-xl p-3 text-center"
                  title={a.title}
                >
                  <span className="text-2xl block mb-1">{a.emoji}</span>
                  <p className="text-white text-[10px] font-medium leading-tight">{a.title}</p>
                </div>
              ))}
            </div>

            <p className="text-white/30 text-xs text-center">
              {unlockedAchievements.length} de {ACHIEVEMENTS.length} logros desbloqueados
            </p>

            {/* Next achievement hint */}
            {nextAchievement && (
              <div className="mt-3 bg-[#fdcb6e]/5 border border-[#fdcb6e]/15 rounded-xl p-3 flex items-center gap-3">
                <span className="text-xl opacity-60">{nextAchievement.emoji}</span>
                <div>
                  <p className="text-white/50 text-[10px] font-bold mb-0.5">PRÓXIMO LOGRO</p>
                  <p className="text-white/70 text-xs">{nextAchievement.title}</p>
                  <p className="text-white/30 text-[10px]">{nextAchievement.description}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Target size={16} className="text-[#00d2ff]" />
                Objetivos activos
              </h3>
              <Link href="/dashboard/objetivos">
                <span className="text-[#6c5ce7] text-xs hover:underline">Gestionar →</span>
              </Link>
            </div>
            {user.goals?.length > 0 ? (
              <div className="space-y-3">
                {user.goals.slice(0, 3).map((g) => {
                  const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                  return (
                    <div key={g.id}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white/70 text-sm">{g.title}</p>
                        <span className="text-white/40 text-xs">{g.current}/{g.target} {g.unit}</span>
                      </div>
                      <ProgressBar value={g.current} max={g.target} height={5} animated={false} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-white/30 text-sm mb-2">No tienes objetivos activos</p>
                <Link href="/dashboard/objetivos">
                  <button className="text-xs text-[#6c5ce7] hover:underline">Añadir objetivo →</button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Weekly summary */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-5"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Award size={16} className="text-[#00b894]" />
              Esta semana
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Sesiones', value: user.stats.weeklyWorkouts, icon: '🏋️' },
                { label: 'Minutos', value: user.stats.weeklyMinutes, icon: '⏱️' },
                { label: 'Calorías', value: user.stats.weeklyWorkouts * 320, icon: '🔥' },
              ].map((s) => (
                <div key={s.label} className="bg-[#1e1e2e] rounded-xl p-3 text-center">
                  <p className="text-base mb-1">{s.icon}</p>
                  <p className="text-white font-bold">{s.value}</p>
                  <p className="text-white/30 text-[10px]">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit profile CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex flex-col sm:flex-row gap-3"
      >
        <Link href="/dashboard/ajustes" className="flex-1">
          <button className="w-full py-3 rounded-2xl bg-[#6c5ce7]/15 border border-[#6c5ce7]/30 text-[#a29bfe] font-semibold text-sm hover:bg-[#6c5ce7]/25 transition-all flex items-center justify-center gap-2">
            <Edit3 size={15} />
            Editar perfil
          </button>
        </Link>
        {plan === 'free' && (
          <Link href="/dashboard/premium" className="flex-1">
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#fdcb6e] to-[#e17055] text-black font-bold text-sm hover:opacity-90 transition-all">
              ⭐ Pásate a Premium
            </button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Trophy, Lock, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useAppStore } from '@/lib/store';
import { ACHIEVEMENTS } from '@/lib/data';

const rarityColors = {
  common: { bg: 'bg-slate-500/10', border: 'border-slate-500/20', text: 'text-slate-400', label: 'Común' },
  rare: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', label: 'Raro' },
  epic: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', label: 'Épico' },
  legendary: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', label: 'Legendario' },
};

export default function LogrosPage() {
  const { user } = useAppStore();
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked);
  const locked = ACHIEVEMENTS.filter(a => !a.unlocked);
  const totalXPFromAchievements = unlocked.reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Mis Logros 🏆</h1>
        <p className="text-white/50">Desbloquea medallas completando retos y objetivos</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Desbloqueados', value: `${unlocked.length}/${ACHIEVEMENTS.length}`, icon: '🏅' },
          { label: 'XP de logros', value: `+${totalXPFromAchievements}`, icon: '⚡' },
          { label: 'Próximo logro', value: locked[0]?.title || 'Todos desbloqueados', icon: '🎯', small: true },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card hover padding="md" className="text-center">
              <span className="text-2xl block mb-1">{s.icon}</span>
              <p className={`text-white font-black ${s.small ? 'text-sm' : 'text-xl'} mb-0.5`}>{s.value}</p>
              <p className="text-white/40 text-xs">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Unlocked */}
      <div className="mb-8">
        <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <Trophy size={18} className="text-[#fdcb6e]" />
          Desbloqueados ({unlocked.length})
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlocked.map((achievement, i) => {
            const rarity = rarityColors[achievement.rarity];
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.03 }}
                className={`rounded-2xl p-5 border ${rarity.bg} ${rarity.border} transition-all cursor-default`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-lg">
                    {achievement.emoji}
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${rarity.text}`}>{rarity.label}</span>
                    <p className="text-[#fdcb6e] text-xs font-bold mt-1">+{achievement.xpReward} XP</p>
                  </div>
                </div>
                <h3 className="text-white font-bold mb-1">{achievement.title}</h3>
                <p className="text-white/50 text-xs mb-3">{achievement.description}</p>
                {achievement.unlockedAt && (
                  <p className="text-white/20 text-xs flex items-center gap-1">
                    ✓ Desbloqueado el {new Date(achievement.unlockedAt).toLocaleDateString('es')}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Locked */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <Lock size={18} className="text-white/30" />
          Por desbloquear ({locked.length})
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locked.map((achievement, i) => {
            const rarity = rarityColors[achievement.rarity];
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-5 border border-[#2a2a3e] bg-[#12121a] opacity-60 relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Lock size={24} className="text-white/10" />
                </div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#2a2a3e] flex items-center justify-center text-3xl filter grayscale">
                      {achievement.emoji}
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold ${rarity.text} opacity-50`}>{rarity.label}</span>
                      <p className="text-white/20 text-xs font-bold mt-1">+{achievement.xpReward} XP</p>
                    </div>
                  </div>
                  <h3 className="text-white/60 font-bold mb-1">{achievement.title}</h3>
                  <p className="text-white/30 text-xs">{achievement.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

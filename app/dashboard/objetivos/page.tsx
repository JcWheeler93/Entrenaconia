'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Target, Plus, CheckCircle, Calendar, Zap } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const GOAL_TEMPLATES = [
  { title: 'Perder 5kg', unit: 'kg', target: 5, emoji: '⚖️', sport: undefined },
  { title: 'Correr 5km sin parar', unit: 'km', target: 5, emoji: '🏃', sport: 'running' },
  { title: 'Completar 30 entrenamientos', unit: 'entrenos', target: 30, emoji: '🏋️', sport: undefined },
  { title: 'Alcanzar nivel 15', unit: 'nivel', target: 15, emoji: '⚡', sport: undefined },
  { title: 'Racha de 30 días', unit: 'días', target: 30, emoji: '🔥', sport: undefined },
  { title: 'Mejorar saque de pádel', unit: 'nivel', target: 1, emoji: '🎾', sport: 'padel' },
];

export default function ObjetivosPage() {
  const { user } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  if (!user) return null;

  const gradients = [
    'linear-gradient(90deg, #6c5ce7, #00d2ff)',
    'linear-gradient(90deg, #00b894, #00cec9)',
    'linear-gradient(90deg, #e17055, #fd79a8)',
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Mis Objetivos 🎯</h1>
          <p className="text-white/50">Define metas y deja que la IA te guíe</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)}>
          <Plus size={16} className="inline mr-2" /> Nuevo objetivo
        </Button>
      </motion.div>

      {/* Active Goals */}
      <div className="space-y-4 mb-8">
        <h2 className="text-white font-bold text-lg">Objetivos activos</h2>
        {user.goals.map((goal, i) => {
          const pct = Math.round((goal.current / goal.target) * 100);
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover padding="md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{goal.title}</h3>
                    {goal.sport && <Badge variant="default" size="sm" className="mt-1">{goal.sport}</Badge>}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]">{pct}%</span>
                    <p className="text-white/30 text-xs">{goal.current}/{goal.target} {goal.unit}</p>
                  </div>
                </div>
                <ProgressBar
                  value={goal.current}
                  max={goal.target}
                  height={10}
                  animated={false}
                  color={gradients[i % gradients.length]}
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Calendar size={12} />
                    <span>Hasta {new Date(goal.deadline).toLocaleDateString('es')}</span>
                  </div>
                  {pct >= 100 ? (
                    <Badge variant="success"><CheckCircle size={11} className="mr-1" />Completado</Badge>
                  ) : pct >= 70 ? (
                    <Badge variant="warning">¡Casi!</Badge>
                  ) : (
                    <Badge variant="default">En progreso</Badge>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Goal Templates */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8"
        >
          <h2 className="text-white font-bold text-lg mb-4">Objetivos sugeridos por IA</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GOAL_TEMPLATES.map((tpl) => (
              <motion.button
                key={tpl.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-left bg-[#12121a] border border-[#2a2a3e] hover:border-[#6c5ce7]/50 hover:bg-[#6c5ce7]/5 rounded-2xl p-4 transition-all"
                onClick={() => setShowAdd(false)}
              >
                <span className="text-2xl block mb-2">{tpl.emoji}</span>
                <p className="text-white font-semibold text-sm mb-1">{tpl.title}</p>
                <p className="text-white/40 text-xs">Meta: {tpl.target} {tpl.unit}</p>
                {tpl.sport && <span className="text-xs text-[#6c5ce7] mt-1 block">{tpl.sport}</span>}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI Recommendation */}
      <Card padding="md" className="!bg-gradient-to-br from-[#6c5ce7]/10 to-[#12121a] border-[#6c5ce7]/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-white font-semibold mb-1">Recomendación IA</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Basándome en tu progreso actual, te recomiendo focalizarte en <strong className="text-white">completar tu objetivo de running</strong>.
              Estás al 76% — con 3 sesiones más esta semana lo conseguirás.
              Tu racha de <strong className="text-white">15 días</strong> indica que tienes la disciplina necesaria. 💪
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, Clock, Zap, Brain, ChevronRight, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PADEL_EXERCISES, DEMO_WORKOUTS } from '@/lib/data';
import Link from 'next/link';

const PADEL_LEVELS = [
  { level: 1, name: 'Iniciación', color: '#00b894', description: 'Golpes básicos y posicionamiento' },
  { level: 2, name: 'Intermedio', color: '#fdcb6e', description: 'Reflejos y paredes' },
  { level: 3, name: 'Avanzado', color: '#e17055', description: 'Táctica y potencia' },
  { level: 4, name: 'Élite', color: '#6c5ce7', description: 'Alto rendimiento' },
];

const PADEL_TIPS = [
  { emoji: '🎯', title: 'Posición de espera', tip: 'Talones ligeramente separados, peso en las puntas de los pies, paleta a la altura del pecho.' },
  { emoji: '💨', title: 'Trabajo de pies', tip: 'Siempre mueve los pies antes del golpe. El desplazamiento correcto marca la diferencia.' },
  { emoji: '🧱', title: 'Juego de paredes', tip: 'Aprende a leer los rebotes. La pared es tu aliada, no tu enemiga.' },
  { emoji: '🤝', title: 'Comunicación', tip: 'En pádel dobles, habla constantemente con tu compañero. La coordinación es clave.' },
];

const WEEKLY_PADEL = [
  { day: 'Lun', focus: 'Técnica de saque', duration: 45, type: 'técnica' },
  { day: 'Mié', focus: 'Reflejos y agilidad', duration: 40, type: 'físico' },
  { day: 'Vie', focus: 'Volea y globo', duration: 50, type: 'técnica' },
  { day: 'Sáb', focus: 'Partido de práctica', duration: 90, type: 'juego' },
];

export default function PadelPage() {
  const [activeTab, setActiveTab] = useState<'entrenar' | 'plan' | 'tips' | 'ia'>('entrenar');
  const padelWorkout = DEMO_WORKOUTS.find(w => w.sport.id === 'padel');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative overflow-hidden rounded-3xl p-8"
        style={{ background: 'linear-gradient(135deg, rgba(253,203,110,0.15) 0%, rgba(225,112,85,0.1) 100%)', border: '1px solid rgba(253,203,110,0.2)' }}
      >
        <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none pointer-events-none">🎾</div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🎾</span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#fdcb6e]/20 text-[#fdcb6e] font-bold">Sección Premium</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Entrena tu pádel<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fdcb6e] to-[#e17055]">con Inteligencia Artificial</span>
          </h1>
          <p className="text-white/60 mb-6 max-w-xl">
            La IA analiza tu nivel, crea rutinas específicas y te guía para mejorar en cada aspecto técnico y físico del pádel.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-[#fdcb6e] to-[#e17055]" onClick={() => setActiveTab('ia')}>
              <Brain size={15} className="inline mr-2" /> Generar plan con IA
            </Button>
            <Button variant="secondary" onClick={() => setActiveTab('entrenar')}>
              <Play size={15} className="inline mr-2 fill-white" /> Empezar entrenamiento
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[
          { id: 'entrenar', label: '🏃 Entrenar' },
          { id: 'plan', label: '📅 Plan semanal' },
          { id: 'tips', label: '💡 Técnica' },
          { id: 'ia', label: '🤖 IA Pádel' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#fdcb6e] to-[#e17055] text-black font-bold'
                : 'bg-[#1e1e2e] text-white/50 hover:text-white border border-[#2a2a3e]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'entrenar' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Level Progress */}
          <Card padding="md">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Target size={16} className="text-[#fdcb6e]" /> Tu nivel en pádel
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {PADEL_LEVELS.map((lvl, i) => (
                <div
                  key={lvl.level}
                  className={`rounded-xl p-3 border text-center transition-all ${
                    i === 1
                      ? 'border-[#fdcb6e]/50 bg-[#fdcb6e]/10'
                      : i < 1
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-[#2a2a3e] bg-[#1e1e2e] opacity-50'
                  }`}
                >
                  <p className="font-bold text-sm" style={{ color: lvl.color }}>{lvl.name}</p>
                  <p className="text-white/40 text-xs mt-1">{lvl.description}</p>
                  {i === 1 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdcb6e]/20 text-[#fdcb6e] mt-2 inline-block">Tu nivel</span>}
                </div>
              ))}
            </div>
            <ProgressBar value={65} max={100} showLabel label="Progreso nivel Intermedio" animated={false} color="linear-gradient(90deg, #fdcb6e, #e17055)" />
          </Card>

          {/* Exercises */}
          <div>
            <h3 className="text-white font-bold mb-4">Ejercicios específicos</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PADEL_EXERCISES.map((ex, i) => (
                <motion.div
                  key={ex.name}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-[#12121a] border border-[#2a2a3e] hover:border-[#fdcb6e]/30 rounded-2xl p-5 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{ex.emoji}</span>
                    <div className="flex items-center gap-1 text-xs text-white/40">
                      <Clock size={11} /> {ex.duration}
                    </div>
                  </div>
                  <p className="text-white font-semibold mb-1">{ex.name}</p>
                  <p className="text-white/50 text-xs mb-4">{ex.desc}</p>
                  <Button size="sm" className="w-full bg-gradient-to-r from-[#fdcb6e]/20 to-[#e17055]/20 !text-[#fdcb6e] border border-[#fdcb6e]/30 hover:from-[#fdcb6e] hover:to-[#e17055] hover:!text-black transition-all">
                    Iniciar
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {padelWorkout && (
            <Card padding="md" className="!bg-gradient-to-br from-[#fdcb6e]/10 to-[#12121a] border-[#fdcb6e]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#fdcb6e]/20 flex items-center justify-center text-2xl">🎾</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{padelWorkout.title}</h3>
                  <p className="text-white/50 text-sm mb-3">{padelWorkout.description}</p>
                  <div className="flex gap-3 text-xs text-white/50 mb-4">
                    <span><Clock size={11} className="inline mr-1" />{padelWorkout.duration} min</span>
                    <span className="text-[#fdcb6e]"><Zap size={11} className="inline mr-1" />+{padelWorkout.xpReward} XP</span>
                  </div>
                  <Link href="/dashboard/entrenar">
                    <Button className="bg-gradient-to-r from-[#fdcb6e] to-[#e17055] text-black">
                      Empezar sesión de pádel →
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      )}

      {activeTab === 'plan' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-bold text-lg">Plan semanal recomendado por IA</h3>
            <span className="text-xs text-[#fdcb6e] flex items-center gap-1">🤖 Personalizado</span>
          </div>
          {WEEKLY_PADEL.map((session, i) => (
            <motion.div
              key={session.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover padding="md" className="!flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#fdcb6e]/10 border border-[#fdcb6e]/20 flex flex-col items-center justify-center flex-shrink-0">
                  <p className="text-[#fdcb6e] font-black text-sm">{session.day}</p>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{session.focus}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/40 text-xs flex items-center gap-1">
                      <Clock size={10} /> {session.duration} min
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      session.type === 'técnica' ? 'bg-blue-500/20 text-blue-400' :
                      session.type === 'físico' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-[#fdcb6e]/20 text-[#fdcb6e]'
                    }`}>
                      {session.type}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/30" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'tips' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-4">
          {PADEL_TIPS.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover padding="md">
                <span className="text-3xl mb-3 block">{tip.emoji}</span>
                <h3 className="text-white font-bold mb-2">{tip.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{tip.tip}</p>
              </Card>
            </motion.div>
          ))}

          {/* Injury Prevention */}
          <Card padding="md" className="sm:col-span-2 !bg-red-500/5 !border-red-500/20">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              🩺 Prevención de lesiones en pádel
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { area: 'Codo', desc: 'Epicondilitis (codo de tenista). Fortalece el antebrazo, no fuerces golpes.' },
                { area: 'Hombro', desc: 'Evita smashes sin calentamiento. Trabaja rotadores externos.' },
                { area: 'Rodillas', desc: 'Cambios de dirección bruscos. Fortalece cuádriceps e isquiotibiales.' },
                { area: 'Zona lumbar', desc: 'Trabajo de core para estabilizar. Evita hiperextensiones en smash.' },
              ].map((item) => (
                <div key={item.area} className="flex items-start gap-3">
                  <span className="text-red-400 font-bold text-sm flex-shrink-0 w-20">{item.area}</span>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'ia' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <Card padding="md" className="!bg-gradient-to-br from-[#fdcb6e]/10 to-[#12121a] border-[#fdcb6e]/20">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#fdcb6e]/20 flex items-center justify-center text-xl flex-shrink-0">🤖</div>
              <div className="flex-1 bg-[#1e1e2e] rounded-2xl rounded-tl-sm p-4">
                <p className="text-white text-sm">Hola! Soy tu entrenador de pádel IA. Basándome en tu nivel <strong>Intermedio</strong>, veo que puedes mejorar significativamente en:</p>
                <ul className="mt-2 space-y-1 text-sm text-white/70">
                  <li>• 🎯 Precisión en la volea de drive (actualmente 62%)</li>
                  <li>• 💨 Velocidad de desplazamiento lateral</li>
                  <li>• 🧱 Juego de paredes en zona de fondos</li>
                </ul>
                <p className="mt-3 text-white text-sm">¿Quieres un plan personalizado para las próximas 4 semanas?</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Plan 4 semanas', desc: 'Programa completo personalizado' },
                { label: 'Mejora volea', desc: 'Técnica específica de volea' },
                { label: 'Cardio para pádel', desc: 'Resistencia aeróbica' },
                { label: 'Análisis de mi juego', desc: 'Puntos fuertes y débiles' },
              ].map((item) => (
                <Link key={item.label} href="/dashboard/ia">
                  <button className="w-full text-left bg-[#1e1e2e] border border-[#2a2a3e] hover:border-[#fdcb6e]/50 hover:bg-[#fdcb6e]/5 rounded-xl p-3 transition-all">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </button>
                </Link>
              ))}
            </div>

            <Link href="/dashboard/ia">
              <Button fullWidth className="bg-gradient-to-r from-[#fdcb6e] to-[#e17055] text-black">
                Abrir chat IA para pádel →
              </Button>
            </Link>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

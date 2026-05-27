'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Zap, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from './Button';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: 'workout' | 'ai' | 'sport' | 'feature';
}

const REASONS = {
  workout: {
    emoji: '🏋️',
    title: '¡Has alcanzado tu límite diario!',
    desc: 'Con el plan gratuito solo puedes hacer 1 entrenamiento al día. Pasa a Premium y entrena sin límites las 24h.',
    feature: '1 entrenamiento/día en gratuito',
  },
  ai: {
    emoji: '🤖',
    title: '5 mensajes IA al día consumidos',
    desc: 'Con el plan gratuito tienes 5 mensajes con la IA. Con Premium, chat ilimitado 24/7 con tu entrenador personal.',
    feature: '5 mensajes IA/día en gratuito',
  },
  sport: {
    emoji: '🎾',
    title: 'Deporte exclusivo Premium',
    desc: 'Esta disciplina y sus planes personalizados están disponibles solo para usuarios Premium.',
    feature: '2 deportes en plan gratuito',
  },
  feature: {
    emoji: '⚡',
    title: 'Función exclusiva Premium',
    desc: 'Desbloquea todas las funciones avanzadas: análisis de progreso, planes nutricionales, ranking y mucho más.',
    feature: 'Funciones limitadas en gratuito',
  },
};

const PREMIUM_HIGHLIGHTS = [
  'Entrenamientos ilimitados cada día',
  'Chat IA ilimitado 24/7',
  'Los 11 deportes disponibles',
  'Planes personalizados con IA',
  'Competición y ranking global',
  'Análisis avanzado de progreso',
];

export function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
  const r = REASONS[reason];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.7)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-[#12121a] border border-[#6c5ce7]/40 rounded-3xl p-6 sm:p-8 max-w-md w-full relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c5ce7] via-[#00d2ff] to-[#fd79a8]" />

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #6c5ce7, transparent)', filter: 'blur(40px)' }} />

            <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="text-5xl mb-4">{r.emoji}</div>
              <h2 className="text-2xl font-black text-white mb-2">{r.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{r.desc}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <Lock size={11} />
                {r.feature}
              </div>
            </div>

            {/* Premium features */}
            <div className="bg-gradient-to-br from-[#6c5ce7]/10 to-[#00d2ff]/5 border border-[#6c5ce7]/20 rounded-2xl p-4 mb-5">
              <p className="text-[#a29bfe] text-xs font-bold mb-3 flex items-center gap-1.5">
                <Zap size={12} /> CON PREMIUM TIENES:
              </p>
              <div className="space-y-2">
                {PREMIUM_HIGHLIGHTS.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle size={13} className="text-[#6c5ce7] flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="text-white/40 text-sm line-through">€29.99/mes</span>
              <span className="text-3xl font-black text-white">€14.99</span>
              <span className="text-white/40 text-sm">/mes</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-bold">-50%</span>
            </div>

            <Link href="/dashboard/premium" onClick={onClose}>
              <Button fullWidth size="lg">
                🚀 Pasarme a Premium ahora
              </Button>
            </Link>

            <p className="text-center text-white/20 text-xs mt-3">7 días gratis · Sin compromiso · Cancela cuando quieras</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

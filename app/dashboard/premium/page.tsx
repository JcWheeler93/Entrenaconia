'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Zap, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAppStore } from '@/lib/store';
import { PRICING_PLANS } from '@/lib/data';

const PREMIUM_FEATURES = [
  { emoji: '🤖', title: 'IA Entrenadora ilimitada', desc: 'Chat y planes generados sin límite, 24/7' },
  { emoji: '🎾', title: 'Todos los deportes', desc: '11 disciplinas con planes específicos' },
  { emoji: '🏆', title: 'Gamificación completa', desc: 'XP, logros, rankings y retos semanales' },
  { emoji: '📊', title: 'Análisis avanzado', desc: 'Estadísticas detalladas y predicciones IA' },
  { emoji: '🥗', title: 'Nutrición con IA', desc: 'Planes nutricionales personalizados' },
  { emoji: '💬', title: 'Soporte prioritario', desc: 'Respuesta en menos de 2 horas' },
];

export default function PremiumPage() {
  const { user } = useAppStore();

  const handleSubscribe = (planId: string) => {
    alert(`Redirigiendo a Stripe para el plan ${planId}...\n\nEn producción, aquí se integraría Stripe Checkout.`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#fdcb6e]/30 bg-[#fdcb6e]/10 mb-6">
          <Star size={14} className="text-[#fdcb6e]" />
          <span className="text-sm text-[#fdcb6e] font-medium">Desbloquea todo el potencial</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Pasa a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fdcb6e] to-[#e17055]">Premium</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Accede a la plataforma fitness más avanzada con IA sin ningún límite
        </p>

        {user?.isPremium && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">¡Ya tienes Premium activo!</span>
          </div>
        )}
      </motion.div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {PREMIUM_FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card hover padding="md">
              <span className="text-2xl mb-3 block">{f.emoji}</span>
              <h3 className="text-white font-bold mb-1">{f.title}</h3>
              <p className="text-white/50 text-sm">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {PRICING_PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 border relative ${
              plan.highlighted
                ? 'border-[#6c5ce7] bg-gradient-to-b from-[#6c5ce7]/10 to-[#12121a]'
                : 'border-[#2a2a3e] bg-[#12121a]'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] rounded-t-2xl" />
            )}
            {plan.highlighted && (
              <div className="inline-block px-3 py-1 rounded-full bg-[#6c5ce7]/20 text-[#a29bfe] text-xs font-bold mb-4">
                MÁS POPULAR
              </div>
            )}
            {plan.id === 'annual' && (
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
                MEJOR VALOR
              </div>
            )}

            <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
            <div className="mb-1">
              <span className="text-4xl font-black text-white">{plan.price === 0 ? 'Gratis' : `€${plan.price}`}</span>
              {plan.price > 0 && <span className="text-white/40 text-sm ml-1">/mes</span>}
            </div>
            {plan.id === 'annual' && (
              <p className="text-emerald-400 text-xs mb-4">€119.88/año · Ahorra 60€</p>
            )}

            <div className="h-px bg-[#2a2a3e] my-4" />

            <ul className="space-y-2.5 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle size={14} className={`flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-[#6c5ce7]' : 'text-emerald-500'}`} />
                  {f}
                </li>
              ))}
            </ul>

            {plan.id === 'free' ? (
              <Button fullWidth variant="secondary" disabled={!user?.isPremium}>
                {user?.isPremium ? 'Plan actual' : 'Plan actual'}
              </Button>
            ) : (
              <Button
                fullWidth
                variant={plan.highlighted ? 'primary' : 'secondary'}
                onClick={() => handleSubscribe(plan.id)}
              >
                {user?.isPremium ? '✓ Activo' : 'Suscribirse'}
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Guarantees */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Shield, title: 'Sin compromiso', desc: 'Cancela en cualquier momento sin penalización' },
          { icon: Zap, title: 'Acceso inmediato', desc: 'Activa Premium en segundos con Stripe' },
          { icon: Star, title: '7 días gratis', desc: 'Prueba Premium sin cargo durante 7 días' },
        ].map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="text-center p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#6c5ce7]/15 flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-[#6c5ce7]" />
              </div>
              <p className="text-white font-semibold text-sm mb-1">{g.title}</p>
              <p className="text-white/40 text-xs">{g.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

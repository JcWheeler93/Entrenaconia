'use client';

import { motion } from 'framer-motion';
import { CheckCircle, X, Zap, Star, Shield, CreditCard, Users, TrendingUp, Brain, Trophy, Dumbbell, MessageSquare, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/lib/store';

const PLANS = [
  {
    id: 'free',
    name: 'Gratis',
    price: 0,
    priceLabel: '€0',
    sub: 'Para siempre',
    color: 'border-[#2a2a3e]',
    badge: null,
    features: [
      { label: '1 entrenamiento por día', ok: true },
      { label: '5 mensajes IA al día', ok: true },
      { label: '2 deportes disponibles', ok: true },
      { label: 'Dashboard básico', ok: true },
      { label: 'Sin gamificación avanzada', ok: false },
      { label: 'Sin planes personalizados', ok: false },
      { label: 'Sin análisis de progreso', ok: false },
      { label: 'Sin ranking ni competición', ok: false },
      { label: 'Sin nutrición IA', ok: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 14.99,
    priceLabel: '€14.99',
    originalPrice: '€29.99',
    sub: '/mes',
    color: 'border-[#6c5ce7]',
    badge: { label: 'MÁS POPULAR', color: 'bg-[#6c5ce7] text-white' },
    gradient: true,
    features: [
      { label: 'Entrenamientos ilimitados', ok: true },
      { label: 'Chat IA ilimitado 24/7', ok: true },
      { label: 'Los 11 deportes disponibles', ok: true },
      { label: 'Gamificación completa + logros', ok: true },
      { label: 'Planes personalizados con IA', ok: true },
      { label: 'Análisis avanzado de progreso', ok: true },
      { label: 'Nutrición IA personalizada', ok: true },
      { label: 'Ranking global + retos', ok: true },
      { label: 'Soporte prioritario <2h', ok: true },
    ],
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 9.99,
    priceLabel: '€9.99',
    originalPrice: '€14.99',
    yearlyTotal: '€119.88/año',
    sub: '/mes',
    color: 'border-[#00d2ff]/50',
    badge: { label: 'MEJOR VALOR', color: 'bg-emerald-500 text-white' },
    features: [
      { label: 'Todo lo de Premium', ok: true },
      { label: 'Ahorra 60€ al año (33% off)', ok: true },
      { label: 'Acceso anticipado a funciones', ok: true },
      { label: 'Integración Apple Health / Google Fit', ok: true },
      { label: 'Análisis biomecánico IA (próx.)', ok: true },
      { label: '1 sesión 1:1 entrenador/mes (próx.)', ok: true },
      { label: 'Badge exclusiva anual en perfil', ok: true },
      { label: 'Liga anual exclusiva', ok: true },
      { label: 'Prioridad máxima en soporte', ok: true },
    ],
  },
];

const FEATURE_COMPARE = [
  { label: 'Entrenamientos', free: '1/día', premium: 'Ilimitados', annual: 'Ilimitados', icon: Dumbbell },
  { label: 'Chat IA', free: '5/día', premium: 'Ilimitado', annual: 'Ilimitado', icon: MessageSquare },
  { label: 'Deportes', free: '2', premium: '11', annual: '11', icon: Trophy },
  { label: 'Planes IA', free: '—', premium: '✓', annual: '✓', icon: Brain },
  { label: 'Ranking', free: '—', premium: 'Global', annual: 'Liga exclusiva', icon: TrendingUp },
  { label: 'Análisis', free: 'Básico', premium: 'Avanzado', annual: 'Premium+', icon: TrendingUp },
];

const FAQS = [
  { q: '¿Hay período de prueba gratuito?', a: 'Sí, tienes 7 días completamente gratis sin introducir tu tarjeta de crédito. Al finalizar, decides si continuas.' },
  { q: '¿Puedo cancelar cuando quiera?', a: 'Por supuesto. Cancela en cualquier momento desde Ajustes > Cuenta > Suscripción. Sin penalizaciones ni preguntas.' },
  { q: '¿Qué pasa si cancelo?', a: 'Tu cuenta pasa a plan gratuito de forma inmediata. No pierdes tu historial ni logros.' },
  { q: '¿Cómo funciona el pago anual?', a: 'Se cobra una vez al año (€119.88) en vez de mensualmente. El ahorro total es de 60€ respecto al plan mensual.' },
  { q: '¿Es seguro el pago?', a: 'Usamos Stripe, el proveedor de pagos de confianza de Netflix, Amazon y millones de empresas. Nunca almacenamos tu tarjeta.' },
];

export default function PremiumPage() {
  const { user, plan } = useAppStore();
  const [billingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') return;
    setLoading(planId);
    // Simulate Stripe redirect
    await new Promise(r => setTimeout(r, 1200));
    setLoading(null);
    alert(`🚀 Redirigiendo a Stripe Checkout para el plan ${planId}...\n\nEn producción, aquí se abre la pasarela de pago de Stripe con tu sesión de suscripción.`);
  };

  const isPremium = plan !== 'free';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#fdcb6e]/30 bg-[#fdcb6e]/10 mb-6">
          <Star size={14} className="text-[#fdcb6e]" />
          <span className="text-sm text-[#fdcb6e] font-medium">50% de descuento · Solo esta semana</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Entrena sin{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]">límites</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Únete a los miles de deportistas que ya entrenan con IA personalizada
        </p>
        {isPremium && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">¡Ya eres Premium! Disfruta de todos los beneficios</span>
          </div>
        )}
      </motion.div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-3xl border ${p.color} ${p.gradient ? 'bg-gradient-to-b from-[#6c5ce7]/10 to-[#12121a]' : 'bg-[#12121a]'} overflow-hidden flex flex-col`}
          >
            {/* Top bar for highlighted */}
            {p.gradient && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]" />
            )}

            {/* Badge */}
            {p.badge && (
              <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-black ${p.badge.color}`}>
                {p.badge.label}
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
              {/* Plan name */}
              <p className="text-white/50 text-sm font-medium mb-1">{p.name}</p>

              {/* Price */}
              <div className="mb-1">
                {p.originalPrice && (
                  <span className="text-white/30 text-sm line-through mr-2">{p.originalPrice}</span>
                )}
                <span className="text-4xl font-black text-white">{p.price === 0 ? 'Gratis' : p.priceLabel}</span>
                {p.price > 0 && <span className="text-white/40 text-sm ml-1">{p.sub}</span>}
              </div>
              {p.yearlyTotal && (
                <p className="text-emerald-400 text-xs mb-1">{p.yearlyTotal} · Ahorra €60</p>
              )}
              {p.originalPrice && (
                <div className="inline-flex items-center gap-1 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">-50% OFF</span>
                </div>
              )}

              <div className="h-px bg-[#2a2a3e] my-4" />

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f.label} className={`flex items-start gap-2 text-sm ${f.ok ? 'text-white/75' : 'text-white/25'}`}>
                    {f.ok ? (
                      <CheckCircle size={14} className={`flex-shrink-0 mt-0.5 ${p.gradient ? 'text-[#6c5ce7]' : 'text-emerald-500'}`} />
                    ) : (
                      <X size={14} className="flex-shrink-0 mt-0.5 text-white/20" />
                    )}
                    {f.label}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {p.id === 'free' ? (
                <button disabled className="w-full py-3 rounded-xl bg-[#1e1e2e] border border-[#2a2a3e] text-white/30 text-sm font-medium cursor-not-allowed">
                  {plan === 'free' ? 'Plan actual' : 'Plan básico'}
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribe(p.id)}
                  disabled={!!loading || isPremium}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    isPremium
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-default'
                      : p.gradient
                      ? 'bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] text-white hover:opacity-90 shadow-lg shadow-[#6c5ce7]/20'
                      : 'bg-[#1e1e2e] border border-[#00d2ff]/30 text-[#00d2ff] hover:bg-[#00d2ff]/10'
                  }`}
                >
                  {loading === p.id ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isPremium ? (
                    <><CheckCircle size={15} /> Activo</>
                  ) : (
                    <><CreditCard size={15} /> Empezar {p.name}</>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature comparison table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-14">
        <h2 className="text-2xl font-black text-white text-center mb-6">Comparativa completa</h2>
        <div className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-0 border-b border-[#2a2a3e]">
            <div className="p-4 text-white/40 text-xs font-bold">FUNCIÓN</div>
            {['Gratis', 'Premium', 'Anual'].map((h) => (
              <div key={h} className={`p-4 text-center text-xs font-bold ${h === 'Premium' ? 'text-[#a29bfe] bg-[#6c5ce7]/5' : 'text-white/40'}`}>{h}</div>
            ))}
          </div>
          {FEATURE_COMPARE.map((row, i) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className={`grid grid-cols-4 gap-0 ${i < FEATURE_COMPARE.length - 1 ? 'border-b border-[#2a2a3e]/50' : ''}`}>
                <div className="p-4 flex items-center gap-2">
                  <Icon size={13} className="text-white/30 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{row.label}</span>
                </div>
                <div className="p-4 text-center text-sm text-white/40">{row.free}</div>
                <div className="p-4 text-center text-sm text-[#a29bfe] font-medium bg-[#6c5ce7]/5">{row.premium}</div>
                <div className="p-4 text-center text-sm text-emerald-400 font-medium">{row.annual}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-14">
        <h2 className="text-2xl font-black text-white text-center mb-6">Lo que dicen nuestros usuarios</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'María G.', sport: '🎾 Pádel', text: 'En 3 meses mejoré mi nivel de pádel más que en 2 años. La IA personaliza cada sesión.', stars: 5 },
            { name: 'Carlos R.', sport: '🏋️ Gym', text: 'Perdí 8kg en 4 meses. Los planes de nutrición y entrenamiento son increíbles.', stars: 5 },
            { name: 'Laura M.', sport: '🥊 Boxeo', text: 'El chat IA ilimitado me ayuda en tiempo real durante el entrenamiento. Brutal.', stars: 5 },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] p-5"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={12} className="text-[#fdcb6e] fill-[#fdcb6e]" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center text-white font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.sport}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Guarantees */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="grid sm:grid-cols-3 gap-4 mb-14">
        {[
          { icon: Shield, title: '7 días gratis', desc: 'Prueba sin tarjeta. Cancela si no te convence.', color: 'text-[#6c5ce7]', bg: 'bg-[#6c5ce7]/10' },
          { icon: Zap, title: 'Activa en segundos', desc: 'Stripe procesa el pago y activa el premium al instante.', color: 'text-[#00d2ff]', bg: 'bg-[#00d2ff]/10' },
          { icon: Users, title: '+12.000 usuarios', desc: 'Comunidad activa de deportistas que ya confían en nosotros.', color: 'text-[#fd79a8]', bg: 'bg-[#fd79a8]/10' },
        ].map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] p-5 flex items-start gap-4"
            >
              <div className={`w-10 h-10 rounded-xl ${g.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={g.color} />
              </div>
              <div>
                <p className="text-white font-bold mb-0.5">{g.title}</p>
                <p className="text-white/40 text-sm">{g.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* FAQ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-8">
        <h2 className="text-2xl font-black text-white text-center mb-6">Preguntas frecuentes</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium text-sm">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-white/40 transition-transform flex-shrink-0 ml-3 ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Final CTA */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative text-center bg-gradient-to-r from-[#6c5ce7]/20 via-[#0d0d14] to-[#00d2ff]/10 border border-[#6c5ce7]/30 rounded-3xl p-8 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]" />
          <p className="text-5xl mb-4">🚀</p>
          <h3 className="text-2xl font-black text-white mb-2">¿Listo para empezar?</h3>
          <p className="text-white/50 mb-6">7 días gratis · Sin tarjeta · Cancela cuando quieras</p>
          <button
            onClick={() => handleSubscribe('premium')}
            disabled={!!loading}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] rounded-2xl text-white font-black text-lg hover:opacity-90 transition-all shadow-2xl shadow-[#6c5ce7]/30"
          >
            {loading === 'premium' ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>⚡ Empezar gratis 7 días</>
            )}
          </button>
          <p className="text-white/25 text-xs mt-4">Al terminar la prueba, €14.99/mes. Cancela cuando quieras.</p>
        </motion.div>
      )}
    </div>
  );
}

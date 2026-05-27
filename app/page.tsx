'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Zap, Brain, Trophy, Target, TrendingUp, Shield,
  Star, CheckCircle, ArrowRight, Play, ChevronRight,
  Flame, Clock, Users
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SPORTS, PRICING_PLANS, PADEL_EXERCISES } from '@/lib/data';

const FEATURES = [
  { icon: Brain, title: 'IA Entrenadora 24/7', desc: 'Tu entrenador personal con inteligencia artificial, disponible en cualquier momento para guiarte.', color: '#6c5ce7' },
  { icon: Target, title: 'Planes 100% Personalizados', desc: 'Rutinas adaptadas a tu nivel, objetivos, lesiones y tiempo disponible.', color: '#00d2ff' },
  { icon: Trophy, title: 'Gamificación Total', desc: 'XP, niveles, medallas, rachas diarias y rankings para mantenerte motivado.', color: '#fdcb6e' },
  { icon: TrendingUp, title: 'Análisis de Progreso', desc: 'Estadísticas detalladas de tu evolución. Visualiza cada mejora en tiempo real.', color: '#00b894' },
  { icon: Shield, title: 'Prevención de Lesiones', desc: 'La IA detecta señales de sobrecarga y ajusta tu plan para evitar lesiones.', color: '#e17055' },
  { icon: Zap, title: 'Progresión Automática', desc: 'El plan aumenta de dificultad conforme mejoras. Nunca te estancas.', color: '#fd79a8' },
];

const STATS = [
  { value: '50K+', label: 'Usuarios activos', icon: Users },
  { value: '11', label: 'Disciplinas deportivas', icon: Zap },
  { value: '95%', label: 'Satisfacción', icon: Star },
  { value: '4.8★', label: 'Valoración media', icon: Trophy },
];

const TESTIMONIALS = [
  { name: 'Carlos M.', sport: 'Boxeo + Gym', avatar: 'C', text: 'En 3 meses subí de nivel beginner a intermedio en boxeo. La IA me ajusta los entrenamientos perfectamente.', stars: 5 },
  { name: 'Sara L.', sport: 'Pádel', avatar: 'S', text: 'Llevo 6 semanas y mi saque ha mejorado increíblemente. Los entrenamientos de reflejos son brutales.', stars: 5 },
  { name: 'Miguel A.', sport: 'CrossFit + Running', avatar: 'M', text: 'La gamificación me enganchó desde el día 1. Ya llevo 45 días de racha consecutiva. ¡No puedo parar!', stars: 5 },
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: heroY }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ background: 'radial-gradient(circle, #6c5ce7, transparent)', filter: 'blur(60px)' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            style={{ background: 'radial-gradient(circle, #00d2ff, transparent)', filter: 'blur(80px)' }}
          />
          <motion.div
            className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 12, repeat: Infinity, delay: 4 }}
            style={{ background: 'radial-gradient(circle, #fd79a8, transparent)', filter: 'blur(100px)', opacity: 0.1 }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 mb-8">
              <Zap size={14} className="text-[#6c5ce7]" />
              <span className="text-sm text-[#a29bfe] font-medium">Impulsado por GPT-4 + Machine Learning</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              <span className="text-white">Tu Entrenador</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#00d2ff] to-[#fd79a8]">
                Personal con IA
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Entrena más inteligente, no más duro. La plataforma fitness más avanzada con IA que aprende de ti,
              crea tus rutinas y te motiva cada día para alcanzar tus metas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" className="px-10">
                  <span className="flex items-center gap-2">
                    Empezar gratis
                    <ArrowRight size={18} />
                  </span>
                </Button>
              </Link>
              <button className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#6c5ce7] transition-colors">
                  <Play size={16} className="text-white ml-0.5" />
                </div>
                <span className="text-sm">Ver cómo funciona</span>
              </button>
            </div>

            {/* Hero Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" />
                Sin tarjeta de crédito
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" />
                7 días de prueba gratis
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" />
                Cancela cuando quieras
              </span>
            </div>
          </motion.div>

          {/* Animated UI Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl overflow-hidden shadow-2xl shadow-[#6c5ce7]/10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a3e] bg-[#0d0d14]">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-white/30">EntrenaConIA — Dashboard</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center text-white font-bold">A</div>
                  <div>
                    <p className="text-white font-semibold">¡Buenos días, Alex! 💪</p>
                    <p className="text-white/40 text-sm">Hoy toca Fuerza + Core según tu progreso</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-white/40">Racha</p>
                    <p className="text-[#fdcb6e] font-bold flex items-center gap-1">🔥 15 días</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Nv. 12', sub: 'XP 4750/5000', color: '#6c5ce7', emoji: '⚡' },
                    { label: '87 entrenos', sub: 'Este mes', color: '#00b894', emoji: '🏋️' },
                    { label: '3,240 min', sub: 'Tiempo total', color: '#00d2ff', emoji: '⏱️' },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#1e1e2e] rounded-xl p-3 text-center">
                      <span className="text-lg">{s.emoji}</span>
                      <p className="text-white text-sm font-bold mt-1">{s.label}</p>
                      <p className="text-white/40 text-xs">{s.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-[#6c5ce7]/15 to-[#00d2ff]/5 border border-[#6c5ce7]/20 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#6c5ce7]/20 flex items-center justify-center text-xl">🤖</div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">IA: Hoy toca sentadillas + press</p>
                    <p className="text-white/40 text-xs">55 min · 380 kcal · 250 XP</p>
                  </div>
                  <ChevronRight size={16} className="text-[#6c5ce7]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-[#2a2a3e] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] mb-1">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section id="sports" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              11 Disciplinas,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]"> Una Plataforma</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Entrena cualquier deporte con planes personalizados creados por inteligencia artificial
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SPORTS.map((sport, i) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: sport.gradient, minHeight: '140px' }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="relative p-5 flex flex-col justify-between h-full">
                  <span className="text-3xl">{sport.emoji}</span>
                  <div>
                    <p className="text-white font-bold text-sm">{sport.name}</p>
                    <p className="text-white/70 text-xs">{sport.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Tecnología al servicio
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7]">de tu rendimiento</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Cada función está diseñada para maximizar tus resultados y mantener la motivación alta
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6 hover:border-[#2a2a3e] transition-all group"
                  style={{ '--feature-color': f.color } as React.CSSProperties}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${f.color}20` }}
                  >
                    <Icon size={22} style={{ color: f.color }} />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Padel Section */}
      <section id="padel" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#fdcb6e]/30 bg-[#fdcb6e]/10 mb-6">
                <span>🎾</span>
                <span className="text-sm text-[#fdcb6e] font-medium">Sección especial Pádel</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Lleva tu pádel
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fdcb6e] to-[#e17055]">al siguiente nivel</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                La IA analiza tu juego, crea planes específicos y te ayuda a mejorar en cada aspecto técnico y físico del pádel.
              </p>
              <div className="space-y-3 mb-8">
                {['Rutinas específicas para pádel', 'Técnica de saque y volea', 'Reflejos y tiempo de reacción', 'Prevención de lesiones de codo y muñeca', 'Cardio y explosividad para pistas'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-[#fdcb6e] flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-[#fdcb6e] to-[#e17055]">
                  Entrenar pádel con IA <ArrowRight size={16} className="inline ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              {PADEL_EXERCISES.map((ex, i) => (
                <motion.div
                  key={ex.name}
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-5 hover:border-[#fdcb6e]/30 transition-all"
                >
                  <span className="text-2xl mb-3 block">{ex.emoji}</span>
                  <p className="text-white font-semibold text-sm mb-1">{ex.name}</p>
                  <p className="text-white/40 text-xs mb-2">{ex.desc}</p>
                  <div className="flex items-center gap-1 text-[#fdcb6e] text-xs">
                    <Clock size={10} />
                    {ex.duration}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-24 px-4 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-bold mb-4">🏆 Sistema de Progresión</h3>

                <div className="bg-[#1e1e2e] rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold">Nivel 12</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#fdcb6e]/20 text-[#fdcb6e]">+250 XP hoy</span>
                  </div>
                  <ProgressBar value={4750} max={5000} animated={false} />
                  <p className="text-white/40 text-xs mt-2">250 XP para subir de nivel</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { emoji: '🌟', name: 'Primer Paso', unlocked: true },
                    { emoji: '🔥', name: 'Semana Perfecta', unlocked: true },
                    { emoji: '🌅', name: 'Madrugador', unlocked: true },
                    { emoji: '🥊', name: 'Boxeador', unlocked: false },
                    { emoji: '🏆', name: 'Maestro Pádel', unlocked: false },
                    { emoji: '💯', name: 'Centenario', unlocked: false },
                  ].map((a) => (
                    <div
                      key={a.name}
                      className={`rounded-xl p-3 text-center border ${a.unlocked ? 'border-[#6c5ce7]/30 bg-[#6c5ce7]/10' : 'border-[#2a2a3e] bg-[#1e1e2e] opacity-50'}`}
                    >
                      <span className="text-xl block mb-1">{a.emoji}</span>
                      <p className="text-white text-xs font-medium">{a.name}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
                  <span className="text-3xl">🔥</span>
                  <div>
                    <p className="text-white font-bold">15 días de racha</p>
                    <p className="text-white/50 text-sm">¡Tu mejor racha ever! Sigue así</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#fdcb6e]/30 bg-[#fdcb6e]/10 mb-6">
                <Trophy size={14} className="text-[#fdcb6e]" />
                <span className="text-sm text-[#fdcb6e] font-medium">Gamificación</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Entrena como si
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fdcb6e] to-[#fd79a8]">fuera un juego</span>
              </h2>
              <p className="text-white/60 text-lg mb-6 leading-relaxed">
                Sistema de recompensas, niveles, medallas y rachas que hacen que quieras volver a entrenar cada día.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '⚡', title: 'XP & Niveles', desc: 'Gana experiencia en cada entrenamiento y sube de nivel' },
                  { icon: '🔥', title: 'Rachas diarias', desc: 'Mantén tu racha y consigue multiplicadores de XP' },
                  { icon: '🏅', title: '50+ Logros', desc: 'Desbloquea medallas al superar retos y metas' },
                  { icon: '🏆', title: 'Rankings', desc: 'Compite con amigos y la comunidad global' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Resultados reales,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]"> historias reales</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6 hover:border-[#6c5ce7]/30 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#fdcb6e] fill-[#fdcb6e]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.sport}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-[#0d0d14]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Precios simples,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]"> resultados reales</span>
            </h2>
            <p className="text-white/50 text-lg">7 días de prueba gratuita. Sin compromisos.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border ${
                  plan.highlighted
                    ? 'border-[#6c5ce7] bg-gradient-to-b from-[#6c5ce7]/10 to-[#12121a] relative overflow-hidden'
                    : 'border-[#2a2a3e] bg-[#12121a]'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]" />
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
                  {plan.price > 0 && <span className="text-white/40 text-sm ml-1">/{plan.interval === 'month' ? 'mes' : 'año'}</span>}
                </div>
                {plan.id === 'annual' && (
                  <p className="text-emerald-400 text-xs mb-4">Facturado anualmente (€119.88/año)</p>
                )}
                <div className="h-px bg-[#2a2a3e] my-5" />
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle size={16} className={`flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-[#6c5ce7]' : 'text-emerald-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button
                    fullWidth
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                  >
                    {plan.price === 0 ? 'Empezar gratis' : 'Iniciar prueba'}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#6c5ce7]/20 via-[#12121a] to-[#00d2ff]/10 border border-[#6c5ce7]/30 rounded-3xl p-12"
          >
            <span className="text-5xl mb-6 block">🚀</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Empieza a entrenar
              <br />con IA hoy mismo
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Miles de usuarios ya entrenan más inteligente con EntrenaConIA. ¿A qué esperas?
            </p>
            <Link href="/register">
              <Button size="lg" className="px-12">
                Crear cuenta gratis <ArrowRight size={18} className="inline ml-2" />
              </Button>
            </Link>
            <p className="text-white/30 text-sm mt-4">Sin tarjeta de crédito · 7 días gratis</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a3e] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
                <Zap size={13} className="text-white" />
              </div>
              <span className="font-bold text-white">EntrenaConIA</span>
            </div>
            <p className="text-white/30 text-sm">© 2025 EntrenaConIA.com · Todos los derechos reservados</p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

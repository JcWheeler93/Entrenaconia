'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Zap, Brain, Trophy, Target, TrendingUp, Shield,
  Star, CheckCircle, ArrowRight, ChevronRight,
  Flame, Clock, Users, Heart, Smile,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

/* ─── Photo data ─────────────────────────────────────────────────────── */

const SPORT_PHOTOS: Record<string, string> = {
  gym:       'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=280&fit=crop&q=80',
  boxing:    'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=280&fit=crop&q=80',
  yoga:      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=280&fit=crop&q=80',
  padel:     'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=280&fit=crop&q=80',
  running:   'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=280&fit=crop&q=80',
  crossfit:  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=280&fit=crop&q=80',
  pilates:   'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=280&fit=crop&q=80',
  calistenia:'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=280&fit=crop&q=80',
  funcional: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=280&fit=crop&q=80',
  hiit:      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=280&fit=crop&q=80',
  movilidad: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=280&fit=crop&q=80',
};

const SPORTS_GRID = [
  { id: 'gym', name: 'Gimnasio', desc: 'Fuerza y musculación', color: '#6c5ce7' },
  { id: 'boxing', name: 'Boxeo', desc: 'Cardio y técnica de combate', color: '#e17055' },
  { id: 'yoga', name: 'Yoga', desc: 'Flexibilidad y bienestar', color: '#00cec9' },
  { id: 'padel', name: 'Pádel', desc: 'Técnica y condición física', color: '#fdcb6e' },
  { id: 'running', name: 'Running', desc: 'Resistencia y cardio', color: '#00b894' },
  { id: 'crossfit', name: 'CrossFit', desc: 'Entrenamiento funcional', color: '#fd79a8' },
  { id: 'pilates', name: 'Pilates', desc: 'Core y postura perfecta', color: '#a29bfe' },
  { id: 'calistenia', name: 'Calistenia', desc: 'Peso corporal y control', color: '#55efc4' },
  { id: 'funcional', name: 'Funcional', desc: 'Movimientos del día a día', color: '#fdcb6e' },
  { id: 'hiit', name: 'HIIT', desc: 'Quema máxima en poco tiempo', color: '#e84393' },
  { id: 'movilidad', name: 'Movilidad', desc: 'Articulaciones y estiramientos', color: '#74b9ff' },
];

const HERO_PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=340&h=420&fit=crop&q=80', alt: 'Persona entrenando en casa' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=340&h=420&fit=crop&q=80', alt: 'Yoga en casa' },
  { src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=340&h=420&fit=crop&q=80', alt: 'Running al aire libre' },
];

const AGES_SECTIONS = [
  {
    range: '18 — 35',
    title: 'Jóvenes activos',
    desc: 'Maximiza tu rendimiento, gana masa muscular y bate tus récords personales. La IA crea tu plan ideal para crecer rápido.',
    photo: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=360&fit=crop&q=80',
    alt: 'Joven entrenando en el gimnasio',
    tags: ['Hipertrofia', 'HIIT', 'CrossFit', 'Running'],
    color: '#6c5ce7',
  },
  {
    range: '35 — 55',
    title: 'En plena forma',
    desc: 'Mantén tu energía, controla el estrés con ejercicio y cuida tu salud articular. Entrena de forma inteligente, no agresiva.',
    photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=360&fit=crop&q=80',
    alt: 'Persona de mediana edad entrenando yoga',
    tags: ['Yoga', 'Pilates', 'Funcional', 'Pádel'],
    color: '#00b894',
  },
  {
    range: '55+',
    title: 'Activos sin límites',
    desc: 'La edad es un número. Planes suaves y efectivos para mantener la movilidad, la fuerza y la calidad de vida.',
    photo: 'https://images.unsplash.com/photo-1510894347150-7f06c773af55?w=500&h=360&fit=crop&q=80',
    alt: 'Persona mayor haciendo ejercicio',
    tags: ['Movilidad', 'Yoga', 'Caminata', 'Equilibrio'],
    color: '#fdcb6e',
  },
];

const PHOTO_STRIP = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=220&fit=crop&q=75',
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&h=220&fit=crop&q=75',
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&h=220&fit=crop&q=75',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=220&fit=crop&q=75',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=220&fit=crop&q=75',
  'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=220&fit=crop&q=75',
];

const TESTIMONIALS = [
  {
    name: 'Carlos M., 28',
    sport: 'Boxeo + Gym',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
    text: 'En 3 meses pasé de principiante a nivel intermedio en boxeo. La IA ajusta los entrenos según cómo me encuentro cada día.',
    stars: 5,
    result: '−8kg · +Nivel boxeo'
  },
  {
    name: 'Ana P., 43',
    sport: 'Yoga + Pilates',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&q=80',
    text: 'Trabajo desde casa y tenía la espalda destrozada. Con los planes de pilates de la IA, llevo 4 meses sin dolor. Increíble.',
    stars: 5,
    result: 'Sin dolor de espalda · 4 meses'
  },
  {
    name: 'Manuel G., 64',
    sport: 'Movilidad + Yoga',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80',
    text: 'Empecé con miedo, pensé que era una app solo para jóvenes. Nada más lejos. Los planes son suaves, perfectos para mi edad.',
    stars: 5,
    result: 'Más energía · Mejor movilidad'
  },
];

const FEATURES = [
  { icon: Brain, title: 'IA que te conoce', desc: 'Aprende de tu progreso diario y adapta cada plan a tu cuerpo, horario y objetivos reales.', color: '#6c5ce7' },
  { icon: Target, title: 'Planes 100% tuyos', desc: 'Ninguna rutina es igual. Tu nivel, tus lesiones, tu tiempo disponible. Todo personalizado.', color: '#00d2ff' },
  { icon: Trophy, title: 'Te mantenemos motivados', desc: 'Rachas, XP, logros y ranking. El ejercicio más efectivo es el que repites cada día.', color: '#fdcb6e' },
  { icon: Heart, title: 'Para toda la familia', desc: 'Planes desde los 16 hasta los 80+. Sin importar tu punto de partida, hay un plan para ti.', color: '#fd79a8' },
  { icon: Shield, title: 'Cuida tus articulaciones', desc: 'La IA detecta señales de sobrecarga y previene lesiones antes de que aparezcan.', color: '#e17055' },
  { icon: Smile, title: 'Fácil desde el día 1', desc: 'Sin tecnicismos. Solo dinos tu objetivo y empezamos. La IA hace el resto.', color: '#00b894' },
];

/* ─── Component ─────────────────────────────────────────────────────── */

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* bg glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #6c5ce7, transparent)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #00d2ff, transparent)', filter: 'blur(100px)' }} />
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 mb-6">
                <Zap size={14} className="text-[#6c5ce7]" />
                <span className="text-sm text-[#a29bfe] font-medium">Para todas las edades · 11 deportes · IA 24/7</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6">
                <span className="text-white">Tu entrenador</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#00d2ff] to-[#fd79a8]">
                  personal con IA
                </span>
                <br />
                <span className="text-white">en casa</span>
              </h1>

              <p className="text-xl text-white/60 mb-6 leading-relaxed">
                Entrena en casa, en el gym o al aire libre. La IA crea tu plan
                perfecto según tu edad, nivel y objetivos. <strong className="text-white/80">Sin importar si tienes 20 o 65 años.</strong>
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['Gratis para empezar', 'Sin tarjeta de crédito', 'Cancela cuando quieras'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-white/50">
                    <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />{t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="px-10 shadow-xl shadow-[#6c5ce7]/20">
                    Empezar gratis <ArrowRight size={18} className="inline ml-2" />
                  </Button>
                </Link>
                <Link href="#sports">
                  <button className="px-8 py-3.5 rounded-xl border border-[#2a2a3e] text-white/60 hover:text-white hover:border-white/30 transition-all text-sm font-medium">
                    Ver deportes
                  </button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {['1507003211169-0a1dd7228f2d','1531746020798-e6953c6e8e04','1472099645785-5658abf4ff4e'].map((id, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] overflow-hidden relative">
                      <Image src={`https://images.unsplash.com/photo-${id}?w=64&h=64&fit=crop&q=80`} alt="Usuario" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#fdcb6e] fill-[#fdcb6e]" />)}
                    <span className="text-white font-bold text-sm ml-1">4.9</span>
                  </div>
                  <p className="text-white/40 text-xs">+50.000 usuarios activos</p>
                </div>
              </div>
            </motion.div>

            {/* Right photo collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative h-[520px] hidden lg:block"
            >
              {/* Main large photo */}
              <div className="absolute top-0 left-8 w-56 h-72 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 z-20">
                <Image src={HERO_PHOTOS[0].src} alt={HERO_PHOTOS[0].alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                    <p className="text-white text-xs font-bold">🔥 15 días de racha</p>
                  </div>
                </div>
              </div>

              {/* Middle photo */}
              <div className="absolute top-16 right-0 w-52 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 z-10">
                <Image src={HERO_PHOTOS[1].src} alt={HERO_PHOTOS[1].alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Bottom photo */}
              <div className="absolute bottom-0 left-20 w-56 h-52 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 z-30">
                <Image src={HERO_PHOTOS[2].src} alt={HERO_PHOTOS[2].alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                    <p className="text-white text-xs font-bold">⚡ +250 XP · Plan completado</p>
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 right-8 bg-[#12121a] border border-[#6c5ce7]/40 rounded-2xl px-4 py-3 shadow-xl z-40"
              >
                <p className="text-white/40 text-[10px] mb-1">XP esta semana</p>
                <p className="text-[#a29bfe] font-black text-xl">+1.240</p>
              </motion.div>

              {/* Floating AI card */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-16 right-4 bg-[#12121a] border border-[#00d2ff]/30 rounded-2xl px-4 py-3 shadow-xl z-40 max-w-[180px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
                    <Zap size={10} className="text-white" />
                  </div>
                  <p className="text-white/40 text-[10px]">IA Entrenadora</p>
                </div>
                <p className="text-white text-xs font-medium">Hoy toca piernas 💪 55 min</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <section className="py-10 border-y border-[#2a2a3e] bg-[#0d0d14]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '50K+', label: 'Usuarios activos' },
              { value: '11', label: 'Disciplinas deportivas' },
              { value: '18-80', label: 'Rango de edades' },
              { value: '4.9★', label: 'Valoración media' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] mb-1">{s.value}</p>
                <p className="text-white/40 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA TODAS LAS EDADES ─────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#fd79a8]/30 bg-[#fd79a8]/10 mb-6">
              <Heart size={14} className="text-[#fd79a8]" />
              <span className="text-sm text-[#fd79a8] font-medium">Para todos, de 18 a 80</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              El deporte no tiene
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7]"> edad</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              La IA adapta cada plan a tu edad, condición física y objetivos.
              Tanto si eres deportista de élite como si empiezas desde cero.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {AGES_SECTIONS.map((age, i) => (
              <motion.div
                key={age.range}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="group bg-[#12121a] border border-[#2a2a3e] rounded-3xl overflow-hidden hover:border-white/20 transition-all"
              >
                {/* Photo */}
                <div className="relative h-52 overflow-hidden">
                  <Image src={age.photo} alt={age.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-sm font-black px-3 py-1 rounded-full text-white"
                      style={{ background: age.color }}
                    >
                      {age.range} años
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-xl mb-2">{age.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{age.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {age.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ───────────────────────────────────── */}
      <div className="overflow-hidden py-6 bg-[#0d0d14]">
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...PHOTO_STRIP, ...PHOTO_STRIP].map((src, i) => (
            <div key={i} className="relative w-64 h-44 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
              <Image src={src} alt="Entrenamiento" fill className="object-cover" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── SPORTS SECTION ───────────────────────────────── */}
      <section id="sports" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              11 deportes,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]"> 1 plataforma</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Planes personalizados con IA para cada disciplina. Elige tu deporte y empieza hoy.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SPORTS_GRID.map((sport, i) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-40"
              >
                <Image
                  src={SPORT_PHOTOS[sport.id] || SPORT_PHOTOS.gym}
                  alt={sport.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                {/* Color tint on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ background: sport.color }}
                />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-sm">{sport.name}</p>
                  <p className="text-white/60 text-xs">{sport.desc}</p>
                </div>
                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  style={{ background: sport.color }}
                />
              </motion.div>
            ))}
            {/* Last card: CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: SPORTS_GRID.length * 0.05 }}
              className="relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] cursor-pointer"
              whileHover={{ scale: 1.04, y: -4 }}
            >
              <Link href="/register" className="absolute inset-0 flex flex-col items-center justify-center">
                <Zap size={28} className="text-white mb-2" />
                <p className="text-white font-bold text-sm">Empezar gratis</p>
                <p className="text-white/70 text-xs">7 días de prueba</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ─────────────────────────────── */}
      <section id="features" className="py-24 px-4 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Todo lo que necesitas,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7]">en un solo lugar</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6 hover:border-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}20` }}>
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

      {/* ── HOME WORKOUT SECTION ─────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photos grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="relative h-56 rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=320&fit=crop&q=80" alt="Entrenamiento en casa" fill className="object-cover" />
              </div>
              <div className="relative h-56 rounded-2xl overflow-hidden mt-6">
                <Image src="https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=320&fit=crop&q=80" alt="Fitness en casa" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=280&fit=crop&q=80" alt="Yoga en casa" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden mt-3">
                <Image src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=280&fit=crop&q=80" alt="Pilates en casa" fill className="object-cover" />
              </div>
            </motion.div>

            {/* Copy */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10 mb-6">
                <Zap size={14} className="text-[#00d2ff]" />
                <span className="text-sm text-[#00d2ff] font-medium">Entrena donde quieras</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                En casa, en el gym
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#6c5ce7]">o al aire libre</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                No necesitas equipamiento especial. La IA crea planes adaptados
                a lo que tienes: tu salón, unas mancuernas, un parque o el gym completo.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: '🏠', text: 'Planes de entrenamiento sin material en casa' },
                  { icon: '🏋️', text: 'Rutinas de gym adaptadas a tu equipamiento' },
                  { icon: '🌳', text: 'Entrenamientos al aire libre y running' },
                  { icon: '✈️', text: 'Planes de viaje sin gimnasio' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="text-xl">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
              <Link href="/register">
                <Button>
                  Empezar gratis <ArrowRight size={16} className="inline ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GAMIFICATION ─────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="order-2 lg:order-1">
              <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-bold mb-4">🏆 Tu progreso en tiempo real</h3>
                <div className="bg-[#1e1e2e] rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold">Nivel 12</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#fdcb6e]/20 text-[#fdcb6e]">+250 XP hoy</span>
                  </div>
                  <ProgressBar value={4750} max={5000} animated={false} />
                  <p className="text-white/40 text-xs mt-2">250 XP para el siguiente nivel</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { emoji: '🌟', name: 'Primer Paso', ok: true },
                    { emoji: '🔥', name: 'Semana Perfecta', ok: true },
                    { emoji: '🌅', name: 'Madrugador', ok: true },
                    { emoji: '🥊', name: 'Boxeador', ok: false },
                    { emoji: '🏆', name: 'Maestro Pádel', ok: false },
                    { emoji: '💯', name: 'Centenario', ok: false },
                  ].map((a) => (
                    <div key={a.name} className={`rounded-xl p-3 text-center border ${a.ok ? 'border-[#6c5ce7]/30 bg-[#6c5ce7]/10' : 'border-[#2a2a3e] bg-[#1e1e2e] opacity-40'}`}>
                      <span className="text-xl block mb-1">{a.emoji}</span>
                      <p className="text-white text-xs font-medium">{a.name}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-xl p-4">
                  <span className="text-3xl">🔥</span>
                  <div>
                    <p className="text-white font-bold">15 días de racha</p>
                    <p className="text-white/50 text-sm">¡Record personal! Sigue así</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="order-1 lg:order-2">
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
                XP, niveles, medallas, rachas y rankings. El secreto de la constancia
                es que cada sesión se sienta como una victoria.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '⚡', title: 'XP y niveles', desc: 'Gana experiencia en cada entreno y sube de nivel' },
                  { icon: '🔥', title: 'Rachas diarias', desc: 'Mantén tu racha y consigue bonificaciones de XP' },
                  { icon: '🏅', title: '+50 logros', desc: 'Desbloquea medallas al superar retos y metas' },
                  { icon: '🏆', title: 'Ranking global', desc: 'Compite con la comunidad y sube a lo más alto' },
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

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">
              Resultados reales,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]"> personas reales</span>
            </h2>
            <p className="text-white/40">De 28 a 64 años. Todos niveles. Todos deportes.</p>
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
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} className="text-[#fdcb6e] fill-[#fdcb6e]" />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-[#2a2a3e]">
                    <Image src={t.photo} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.sport}</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 inline-flex items-center gap-1.5">
                  <CheckCircle size={11} className="text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-medium">{t.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 bg-[#0d0d14]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Empieza gratis,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]"> crece sin límites</span>
            </h2>
            <p className="text-white/50 text-lg">7 días de prueba Premium. Sin tarjeta. Sin compromisos.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              {
                name: 'Gratis', price: '€0', sub: 'para siempre',
                features: ['1 entrenamiento al día', '5 mensajes IA/día', '2 deportes disponibles', 'Dashboard básico'],
                cta: 'Empezar gratis', highlight: false,
              },
              {
                name: 'Premium', price: '€14.99', sub: '/mes',
                badge: '-50% ESTA SEMANA',
                original: '€29.99',
                features: ['Entrenamientos ilimitados', 'Chat IA ilimitado 24/7', '11 deportes disponibles', 'Planes IA personalizados', 'Ranking + retos', 'Análisis avanzado'],
                cta: '7 días gratis →', highlight: true,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border relative ${plan.highlight ? 'border-[#6c5ce7] bg-gradient-to-b from-[#6c5ce7]/10 to-[#12121a]' : 'border-[#2a2a3e] bg-[#12121a]'}`}
              >
                {plan.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] rounded-t-2xl" />}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#6c5ce7] rounded-full text-xs font-black text-white whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-2 mt-2">{plan.name}</h3>
                <div className="mb-1 flex items-baseline gap-2 justify-center">
                  {plan.original && <span className="text-white/30 text-sm line-through">{plan.original}</span>}
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.sub}</span>
                </div>
                <div className="h-px bg-[#2a2a3e] my-4" />
                <ul className="space-y-2.5 mb-6 text-left">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle size={13} className={plan.highlight ? 'text-[#6c5ce7] flex-shrink-0' : 'text-emerald-500 flex-shrink-0'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${plan.highlight ? 'bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] text-white hover:opacity-90 shadow-lg shadow-[#6c5ce7]/20' : 'bg-[#1e1e2e] border border-[#2a2a3e] text-white/60 hover:text-white'}`}>
                    {plan.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-[#6c5ce7]/20 via-[#12121a] to-[#00d2ff]/10 border border-[#6c5ce7]/30 rounded-3xl p-12 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c5ce7] via-[#00d2ff] to-[#fd79a8]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #6c5ce7, transparent)', filter: 'blur(60px)' }} />

            {/* Real people mini photos */}
            <div className="flex justify-center -space-x-3 mb-6">
              {['1507003211169-0a1dd7228f2d','1531746020798-e6953c6e8e04','1472099645785-5658abf4ff4e','1534528741775-53994a69daeb','1517836357463-d25dfeac3438'].map((id, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] overflow-hidden relative">
                  <Image src={`https://images.unsplash.com/photo-${id}?w=80&h=80&fit=crop&q=80`} alt="Usuario" fill className="object-cover" />
                </div>
              ))}
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 relative">
              Únete a más de
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]">50.000 personas</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 relative">
              De todas las edades y niveles. Tu momento es ahora.
            </p>
            <Link href="/register">
              <Button size="lg" className="px-12 shadow-2xl shadow-[#6c5ce7]/30 relative">
                Crear cuenta gratis <ArrowRight size={18} className="inline ml-2" />
              </Button>
            </Link>
            <p className="text-white/25 text-sm mt-4 relative">Sin tarjeta de crédito · 7 días Premium gratis</p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-[#2a2a3e] py-12 px-4 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
                <Zap size={13} className="text-white" />
              </div>
              <span className="font-bold text-white">EntrenaConIA</span>
            </div>
            <p className="text-white/30 text-sm text-center">
              © 2025 EntrenaConIA.com · Para todas las edades y niveles
            </p>
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

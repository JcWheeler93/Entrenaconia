'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  User, Bell, Palette, Shield, LogOut, Trash2,
  ChevronRight, Check, Camera, Mail, Phone, Lock,
  Moon, Sun, Smartphone, Globe, Volume2, VolumeX,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

type Tab = 'perfil' | 'notificaciones' | 'apariencia' | 'cuenta';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
  { id: 'apariencia', label: 'Apariencia', icon: Palette },
  { id: 'cuenta', label: 'Cuenta', icon: Shield },
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full transition-all relative ${value ? 'bg-[#6c5ce7]' : 'bg-[#2a2a3e]'}`}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? 'left-6' : 'left-1'}`}
      />
    </button>
  );
}

function SettingRow({
  label,
  desc,
  children,
}: {
  label: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#2a2a3e] last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-white text-sm font-medium">{label}</p>
        {desc && <p className="text-white/40 text-xs mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function AjustesPage() {
  const { user, plan, logout, setUser } = useAppStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('perfil');
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Perfil state
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [bio, setBio] = useState('');

  // Notifications state
  const [notifs, setNotifs] = useState({
    dailyReminder: true,
    achievements: true,
    rankingUpdates: true,
    weeklyReport: true,
    aiGreeting: true,
    push: false,
  });

  // Appearance state
  const [theme] = useState<'dark' | 'darker'>('dark');
  const [accentColor, setAccentColor] = useState('#6c5ce7');
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const accentColors = ['#6c5ce7', '#00d2ff', '#fd79a8', '#00b894', '#fdcb6e', '#e17055'];

  const handleSaveProfile = () => {
    if (user) {
      setUser({ ...user, name });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Ajustes ⚙️</h1>
        <p className="text-white/50">Personaliza tu experiencia en EntrenaConIA</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#12121a] rounded-2xl p-1 mb-8 border border-[#2a2a3e]">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                active ? 'bg-[#6c5ce7] text-white shadow-lg shadow-[#6c5ce7]/20' : 'text-white/40 hover:text-white'
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* ─── PERFIL ─── */}
        {activeTab === 'perfil' && (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-5 bg-[#12121a] rounded-2xl p-5 border border-[#2a2a3e]">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center text-white text-3xl font-black">
                  {name.charAt(0) || '?'}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#6c5ce7] rounded-lg flex items-center justify-center border-2 border-[#0a0a0f] hover:bg-[#5543c5] transition-colors">
                  <Camera size={12} className="text-white" />
                </button>
              </div>
              <div>
                <p className="text-white font-bold text-lg">{name || 'Usuario'}</p>
                <p className="text-white/40 text-sm">{email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    plan === 'free' ? 'bg-[#2a2a3e] text-white/50' : 'bg-gradient-to-r from-[#fdcb6e] to-[#e17055] text-black'
                  }`}>
                    {plan === 'free' ? 'Plan Gratis' : plan === 'annual' ? '⭐ Premium Anual' : '⚡ Premium'}
                  </span>
                  <span className="text-xs text-white/30">Nv. {user?.level || 1}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] overflow-hidden">
              <div className="p-5 border-b border-[#2a2a3e]">
                <h3 className="text-white font-bold">Información personal</h3>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Nombre de usuario</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-9"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      className="pl-9 opacity-60 cursor-not-allowed"
                      disabled
                      placeholder="tu@email.com"
                    />
                  </div>
                  <p className="text-white/25 text-xs mt-1">El email no se puede cambiar</p>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Bio (opcional)</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="resize-none"
                    rows={3}
                    placeholder="Cuéntanos sobre tus objetivos fitness..."
                  />
                </div>

                <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
                  {saved ? (
                    <span className="flex items-center gap-2">
                      <Check size={16} />
                      ¡Guardado!
                    </span>
                  ) : 'Guardar cambios'}
                </Button>
              </div>
            </div>

            {/* Stats overview */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Entrenamientos', value: user?.totalWorkouts || 0, emoji: '🏋️' },
                { label: 'Racha', value: `${user?.streak || 0}d`, emoji: '🔥' },
                { label: 'Nivel', value: user?.level || 1, emoji: '⭐' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] p-4 text-center">
                  <p className="text-2xl mb-1">{stat.emoji}</p>
                  <p className="text-white font-black text-xl">{stat.value}</p>
                  <p className="text-white/40 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── NOTIFICACIONES ─── */}
        {activeTab === 'notificaciones' && (
          <div className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] overflow-hidden">
            <div className="p-5 border-b border-[#2a2a3e]">
              <h3 className="text-white font-bold">Preferencias de notificaciones</h3>
              <p className="text-white/40 text-sm mt-1">Elige qué quieres recibir y cuándo</p>
            </div>
            <div className="p-5">
              <SettingRow
                label="Recordatorio diario"
                desc="Te avisamos si no has entrenado hoy"
              >
                <Toggle value={notifs.dailyReminder} onChange={(v) => setNotifs({ ...notifs, dailyReminder: v })} />
              </SettingRow>
              <SettingRow
                label="Saludo diario IA"
                desc="La IA te saluda cada mañana con tu plan del día"
              >
                <Toggle value={notifs.aiGreeting} onChange={(v) => setNotifs({ ...notifs, aiGreeting: v })} />
              </SettingRow>
              <SettingRow
                label="Logros desbloqueados"
                desc="Notificación al conseguir un logro"
              >
                <Toggle value={notifs.achievements} onChange={(v) => setNotifs({ ...notifs, achievements: v })} />
              </SettingRow>
              <SettingRow
                label="Actualizaciones de ranking"
                desc="Cuando alguien te supera o bajes de posición"
              >
                <Toggle value={notifs.rankingUpdates} onChange={(v) => setNotifs({ ...notifs, rankingUpdates: v })} />
              </SettingRow>
              <SettingRow
                label="Informe semanal"
                desc="Resumen de tu progreso cada domingo"
              >
                <Toggle value={notifs.weeklyReport} onChange={(v) => setNotifs({ ...notifs, weeklyReport: v })} />
              </SettingRow>
              <SettingRow
                label="Notificaciones push"
                desc="Permite notificaciones en tu dispositivo"
              >
                <Toggle value={notifs.push} onChange={(v) => setNotifs({ ...notifs, push: v })} />
              </SettingRow>
            </div>
          </div>
        )}

        {/* ─── APARIENCIA ─── */}
        {activeTab === 'apariencia' && (
          <div className="space-y-4">
            <div className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] overflow-hidden">
              <div className="p-5 border-b border-[#2a2a3e]">
                <h3 className="text-white font-bold">Apariencia</h3>
              </div>
              <div className="p-5">
                <SettingRow
                  label="Animaciones"
                  desc="Efectos de movimiento en la interfaz"
                >
                  <Toggle value={animations} onChange={setAnimations} />
                </SettingRow>
                <SettingRow
                  label="Modo compacto"
                  desc="Reduce el espaciado para ver más contenido"
                >
                  <Toggle value={compactMode} onChange={setCompactMode} />
                </SettingRow>
                <div className="py-4">
                  <p className="text-white text-sm font-medium mb-1">Color de acento</p>
                  <p className="text-white/40 text-xs mb-3">Color principal de la interfaz</p>
                  <div className="flex gap-2 flex-wrap">
                    {accentColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setAccentColor(color)}
                        className={`w-9 h-9 rounded-xl transition-all ${accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#12121a] scale-110' : 'hover:scale-105'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Theme cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'dark', label: 'Dark', sub: 'Fondo oscuro estándar', icon: Moon },
                { id: 'darker', label: 'Ultra Dark', sub: 'Máximo contraste', icon: Smartphone },
              ].map((t) => {
                const Icon = t.icon;
                const active = theme === t.id;
                return (
                  <div
                    key={t.id}
                    className={`bg-[#12121a] rounded-2xl border p-4 cursor-pointer transition-all ${active ? 'border-[#6c5ce7]' : 'border-[#2a2a3e] hover:border-[#6c5ce7]/50'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${active ? 'bg-[#6c5ce7]' : 'bg-[#2a2a3e]'}`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <p className="text-white font-semibold text-sm">{t.label}</p>
                    <p className="text-white/40 text-xs">{t.sub}</p>
                    {active && (
                      <div className="mt-2 flex items-center gap-1 text-[#6c5ce7] text-xs">
                        <Check size={11} />
                        Activo
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── CUENTA ─── */}
        {activeTab === 'cuenta' && (
          <div className="space-y-4">
            {/* Plan info */}
            <div className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] overflow-hidden">
              <div className="p-5 border-b border-[#2a2a3e]">
                <h3 className="text-white font-bold">Tu suscripción</h3>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-white font-semibold">
                      {plan === 'free' ? 'Plan Gratuito' : plan === 'annual' ? 'Premium Anual' : 'Premium Mensual'}
                    </p>
                    <p className="text-white/40 text-sm">
                      {plan === 'free' ? '1 entrenamiento/día · 5 mensajes IA/día' : 'Acceso ilimitado a todo'}
                    </p>
                  </div>
                  {plan === 'free' ? (
                    <a href="/dashboard/premium">
                      <button className="text-xs px-3 py-1.5 bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] rounded-lg font-bold text-white hover:opacity-90 transition-all">
                        Upgrade
                      </button>
                    </a>
                  ) : (
                    <span className="text-xs px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg font-bold text-emerald-400">
                      Activo
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-[#12121a] rounded-2xl border border-[#2a2a3e] overflow-hidden">
              <div className="p-5 border-b border-[#2a2a3e]">
                <h3 className="text-white font-bold">Seguridad</h3>
              </div>
              <div className="p-5">
                <button className="flex items-center justify-between w-full py-3 group">
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-white/40" />
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors">Cambiar contraseña</span>
                  </div>
                  <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
                </button>
                <div className="h-px bg-[#2a2a3e]" />
                <button className="flex items-center justify-between w-full py-3 group">
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-white/40" />
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors">Sesiones activas</span>
                  </div>
                  <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-[#12121a] rounded-2xl border border-red-500/20 overflow-hidden">
              <div className="p-5 border-b border-red-500/20">
                <h3 className="text-red-400 font-bold">Zona de peligro</h3>
              </div>
              <div className="p-5 space-y-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full p-3 rounded-xl text-white/60 hover:text-white hover:bg-[#1e1e2e] transition-all text-sm"
                >
                  <LogOut size={16} />
                  Cerrar sesión en este dispositivo
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
                >
                  <Trash2 size={16} />
                  Eliminar cuenta permanentemente
                </button>
              </div>
            </div>

            {/* Version info */}
            <p className="text-center text-white/15 text-xs">
              EntrenaConIA v2.0 · © 2025 · Hecho con ❤️
            </p>
          </div>
        )}
      </motion.div>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.8)' }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#12121a] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl text-center mb-4">⚠️</div>
            <h3 className="text-white font-black text-xl text-center mb-2">¿Eliminar cuenta?</h3>
            <p className="text-white/50 text-sm text-center mb-6">
              Esta acción es irreversible. Perderás todo tu progreso, XP, logros y entrenamientos.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </Button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-colors"
              >
                Sí, eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

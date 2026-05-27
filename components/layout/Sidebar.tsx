'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Dumbbell, Trophy, Target, MessageSquare,
  TrendingUp, User, Settings, Zap, LogOut, CreditCard,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { ProgressBar } from '../ui/ProgressBar';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Inicio' },
  { href: '/dashboard/entrenar', icon: Dumbbell, label: 'Entrenar' },
  { href: '/dashboard/ia', icon: MessageSquare, label: 'IA Entrenadora' },
  { href: '/dashboard/progreso', icon: TrendingUp, label: 'Mi Progreso' },
  { href: '/dashboard/objetivos', icon: Target, label: 'Objetivos' },
  { href: '/dashboard/logros', icon: Trophy, label: 'Logros' },
  { href: '/dashboard/padel', icon: '🎾', label: 'Pádel', isEmoji: true },
];

const bottomItems = [
  { href: '/dashboard/premium', icon: CreditCard, label: 'Premium' },
  { href: '/dashboard/perfil', icon: User, label: 'Perfil' },
  { href: '/dashboard/ajustes', icon: Settings, label: 'Ajustes' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAppStore();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r border-[#2a2a3e] bg-[#0d0d14] z-40 hidden lg:flex"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-[#2a2a3e]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-bold text-lg">
          <span className="text-white">Entrena</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]">ConIA</span>
        </span>
      </div>

      {/* User Level */}
      {user && (
        <div className="px-4 py-4 border-b border-[#2a2a3e]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center font-bold text-white text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white truncate">{user.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] text-white font-bold">
                  Nv. {user.level}
                </span>
                <span className="text-xs text-white/40">🔥 {user.streak}</span>
              </div>
            </div>
          </div>
          <ProgressBar
            value={user.xp}
            max={user.xpToNextLevel}
            height={4}
            showLabel
            label={`${user.xp} / ${user.xpToNextLevel} XP`}
            animated={false}
          />
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.isEmoji ? null : item.icon as React.ElementType;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#6c5ce7]/15 text-[#6c5ce7] border border-[#6c5ce7]/20'
                      : 'text-white/50 hover:text-white hover:bg-[#1e1e2e]'
                  }`}
                >
                  {item.isEmoji ? (
                    <span className="text-base">{item.icon as string}</span>
                  ) : Icon ? (
                    <Icon size={18} />
                  ) : null}
                  {item.label}
                  {item.href === '/dashboard/ia' && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-[#6c5ce7]/20 text-[#6c5ce7]">IA</span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#2a2a3e] space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon as React.ElementType;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]' : 'text-white/50 hover:text-white hover:bg-[#1e1e2e]'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                  {item.href === '/dashboard/premium' && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">PRO</span>
                  )}
                </motion.div>
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 w-full transition-all"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </nav>
    </motion.aside>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, MessageSquare, TrendingUp, Swords } from 'lucide-react';

const items = [
  { href: '/dashboard', icon: Home, label: 'Inicio' },
  { href: '/dashboard/entrenar', icon: Dumbbell, label: 'Entrenar' },
  { href: '/dashboard/ia', icon: MessageSquare, label: 'IA' },
  { href: '/dashboard/progreso', icon: TrendingUp, label: 'Progreso' },
  { href: '/dashboard/ranking', icon: Swords, label: 'Ranking' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d14] border-t border-[#2a2a3e]">
      <div className="flex">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div className={`flex flex-col items-center py-3 gap-1 transition-colors ${isActive ? 'text-[#6c5ce7]' : 'text-white/40 hover:text-white/70'}`}>
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

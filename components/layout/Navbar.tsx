'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '#sports', label: 'Deportes' },
    { href: '#features', label: 'Funciones' },
    { href: '#pricing', label: 'Precios' },
    { href: '#padel', label: 'Pádel' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
      style={{ background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">Entrena</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]">ConIA</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Iniciar sesión</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Empezar gratis</Button>
            </Link>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/5 bg-[#0a0a0f] px-4 py-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white transition-colors text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link href="/login">
            <Button variant="secondary" size="sm" fullWidth>Iniciar sesión</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" fullWidth>Empezar gratis</Button>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}

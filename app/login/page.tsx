'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AIWordmark } from '@/components/ui/AILogo';
import { useAppStore } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithFirebase, loginWithGoogle } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      // Try Firebase first
      const { signInWithGoogle } = await import('@/lib/firebase');
      const firebaseUser = await signInWithGoogle();
      loginWithFirebase({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('not configured') || msg.includes('Firebase')) {
        // Fallback: demo mode
        await loginWithGoogle();
        router.push('/dashboard');
      } else {
        setError('Error al iniciar sesión con Google. Inténtalo de nuevo.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
      const auth = getAuth();
      const cred = await signInWithEmailAndPassword(auth, email, password);
      loginWithFirebase({
        uid: cred.user.uid,
        displayName: cred.user.displayName,
        email: cred.user.email,
        photoURL: cred.user.photoURL,
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('not configured') || msg.includes('Firebase')) {
        // Demo fallback
        await loginWithGoogle();
        router.push('/dashboard');
      } else {
        setError('Email o contraseña incorrectos.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#6c5ce7]/20 via-[#0d0d14] to-[#00d2ff]/10">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #6c5ce7, transparent)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #00d2ff, transparent)', filter: 'blur(80px)' }} />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12">
          <Link href="/" className="mb-16 inline-block">
            <AIWordmark size={38} />
          </Link>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl font-black text-white mb-6 leading-tight">Bienvenido<br />de vuelta 💪</h1>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">Tu entrenador IA te ha preparado la sesión de hoy.</p>
            <div className="space-y-4">
              {[
                { emoji: '🔥', text: 'Tu racha sigue activa', sub: '¡No la pierdas hoy!' },
                { emoji: '⚡', text: 'Nuevo entrenamiento listo', sub: 'Generado por IA según tu progreso' },
                { emoji: '🏆', text: 'Logros por desbloquear', sub: 'Estás muy cerca' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.text}</p>
                    <p className="text-white/40 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-10">
            <AIWordmark size={34} />
          </div>

          <h2 className="text-3xl font-black text-white mb-2">Iniciar sesión</h2>
          <p className="text-white/40 mb-8">¿No tienes cuenta? <Link href="/register" className="text-[#6c5ce7] hover:underline">Regístrate gratis</Link></p>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-xl px-6 py-3.5 mb-6 font-medium text-white disabled:opacity-50"
          >
            {googleLoading
              ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
            }
            Continuar con Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#2a2a3e]" />
            <span className="text-white/30 text-sm">o con email</span>
            <div className="flex-1 h-px bg-[#2a2a3e]" />
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm">{error}</div>}

          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <label>Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" className="pl-10" required />
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <label>Contraseña</label>
                <a href="#" className="text-xs text-[#6c5ce7] hover:underline">¿Olvidaste la contraseña?</a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <Button type="submit" fullWidth loading={loading} className="mt-2">Iniciar sesión</Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

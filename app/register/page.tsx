'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { AIWordmark } from '@/components/ui/AILogo';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/lib/store';
import { SPORTS } from '@/lib/data';

const STEPS = ['Cuenta', 'Perfil', 'Deportes'];

export default function RegisterPage() {
  const router = useRouter();
  const { loginWithGoogle, setUser } = useAppStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    level: 'beginner',
    goal: 'health',
    time: '30-45',
  });

  const updateForm = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));
  const toggleSport = (id: string) => setSelectedSports(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleGoogle = async () => {
    setLoading(true);
    await loginWithGoogle();
    router.push('/onboarding');
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const { DEMO_USER } = await import('@/lib/data');
    setUser({ ...DEMO_USER, name: form.name || 'Nuevo Usuario', email: form.email, sports: selectedSports.length > 0 ? selectedSports : ['gym'] });
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-10">
          <Link href="/">
            <AIWordmark size={34} />
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-[#6c5ce7] text-white' : 'bg-[#2a2a3e] text-white/30'
              }`}>
                {i < step ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className={`text-xs ${i === step ? 'text-white' : 'text-white/30'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-emerald-500' : 'bg-[#2a2a3e]'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-black text-white mb-1">Crea tu cuenta</h2>
              <p className="text-white/40 text-sm mb-6">¿Ya tienes cuenta? <Link href="/login" className="text-[#6c5ce7] hover:underline">Inicia sesión</Link></p>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-xl px-6 py-3 mb-4 font-medium text-white disabled:opacity-50"
              >
                {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Registrarse con Google
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[#2a2a3e]" />
                <span className="text-white/30 text-xs">o con email</span>
                <div className="flex-1 h-px bg-[#2a2a3e]" />
              </div>

              <div className="space-y-3">
                <div>
                  <label>Nombre completo</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="text" value={form.name} onChange={e => updateForm('name', e.target.value)} placeholder="Tu nombre" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label>Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} placeholder="tu@email.com" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label>Contraseña</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => updateForm('password', e.target.value)} placeholder="Mínimo 8 caracteres" className="pl-10 pr-10" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              <Button fullWidth className="mt-5" onClick={() => setStep(1)}>
                Continuar →
              </Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-black text-white mb-1">Cuéntanos sobre ti</h2>
              <p className="text-white/40 text-sm mb-6">La IA adaptará los entrenamientos a tu perfil</p>

              <div className="space-y-4">
                <div>
                  <label>Edad</label>
                  <input type="number" value={form.age} onChange={e => updateForm('age', e.target.value)} placeholder="25" min="14" max="90" />
                </div>

                <div>
                  <label>Nivel de condición física</label>
                  <select value={form.level} onChange={e => updateForm('level', e.target.value)}>
                    <option value="beginner">Principiante — Poco o nada de ejercicio</option>
                    <option value="intermediate">Intermedio — Entreno regularmente</option>
                    <option value="advanced">Avanzado — Alto rendimiento</option>
                  </select>
                </div>

                <div>
                  <label>Objetivo principal</label>
                  <select value={form.goal} onChange={e => updateForm('goal', e.target.value)}>
                    <option value="health">Mejorar salud general</option>
                    <option value="weight_loss">Perder peso</option>
                    <option value="muscle">Ganar músculo</option>
                    <option value="endurance">Mejorar resistencia</option>
                    <option value="sport">Mejorar en un deporte</option>
                  </select>
                </div>

                <div>
                  <label>Tiempo disponible por sesión</label>
                  <select value={form.time} onChange={e => updateForm('time', e.target.value)}>
                    <option value="20-30">20-30 minutos</option>
                    <option value="30-45">30-45 minutos</option>
                    <option value="45-60">45-60 minutos</option>
                    <option value="60+">Más de 60 minutos</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <Button variant="secondary" onClick={() => setStep(0)}>← Atrás</Button>
                <Button fullWidth onClick={() => setStep(2)}>Continuar →</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-black text-white mb-1">¿Qué deportes practicas?</h2>
              <p className="text-white/40 text-sm mb-6">Selecciona todos los que quieras (puedes cambiarlos después)</p>

              <div className="grid grid-cols-3 gap-2 mb-6 max-h-72 overflow-y-auto pr-1">
                {SPORTS.map((sport) => {
                  const selected = selectedSports.includes(sport.id);
                  return (
                    <button
                      key={sport.id}
                      onClick={() => toggleSport(sport.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selected
                          ? 'border-[#6c5ce7] bg-[#6c5ce7]/15 text-white'
                          : 'border-[#2a2a3e] bg-[#1e1e2e] text-white/50 hover:border-[#6c5ce7]/50'
                      }`}
                    >
                      <span className="text-xl block">{sport.emoji}</span>
                      <span className="text-xs font-medium block mt-1 leading-tight">{sport.name}</span>
                      {selected && <CheckCircle size={12} className="text-[#6c5ce7] mx-auto mt-1" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)}>← Atrás</Button>
                <Button fullWidth loading={loading} onClick={handleSubmit}>
                  ¡Empezar a entrenar! 🚀
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-4">
          Al registrarte, aceptas los <a href="#" className="text-white/40 hover:text-white">Términos de uso</a>
        </p>
      </motion.div>
    </div>
  );
}

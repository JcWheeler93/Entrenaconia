'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Send, Zap, RefreshCw, Sparkles, Lock } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { ChatMessage } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { UpgradeModal } from '@/components/ui/UpgradeModal';

const QUICK_PROMPTS = [
  'Crea mi rutina de hoy',
  'Tengo 30 minutos. ¿Qué hago?',
  '¿Cómo puedo mejorar mi saque de pádel?',
  'Dame un plan semanal de boxeo',
  'Tengo agujetas en piernas. ¿Qué toca?',
  'Consejos de nutrición post-entreno',
  '¿Cuánto debo descansar entre series?',
  'Quiero ganar masa muscular rápido',
];

const AI_RESPONSES: Record<string, string> = {
  default: '¡Hola! Soy tu entrenador IA. Puedo crear rutinas personalizadas, analizar tu progreso y darte consejos específicos para cada deporte. ¿Qué necesitas hoy?',
  rutina: `💪 **Tu rutina de hoy: Fuerza + Core**\n\n**Calentamiento (10 min)**\n• 5 min cardio ligero\n• Movilidad articular\n\n**Bloque principal (35 min)**\n• Sentadilla: 4×10 @ 70% RM | Descanso: 90s\n• Press banca: 4×8 @ 75% RM | Descanso: 90s\n• Peso muerto rumano: 3×12 | Descanso: 75s\n• Dominadas: 3×max | Descanso: 60s\n\n**Core (10 min)**\n• Plancha: 3×60s\n• Crunch bicicleta: 3×20\n• Russian twist: 3×20\n\n**Vuelta a la calma (5 min)**\n\n⚡ Ganarás **250 XP** al completar.\n¿Quieres que ajuste algo?`,
  '30 minutos': `⏱️ **Plan de 30 minutos: HIIT Express**\n\n**Ronda 1-3 (circuito)**\n• Burpees: 45s trabajo / 15s descanso\n• Mountain climbers: 45s / 15s\n• Jump squats: 45s / 15s\n• Flexiones: 45s / 15s\n\n**Descanso** 2 min entre rondas\n\n🔥 Quemarás aprox. **280 kcal**\n⚡ **+180 XP** al completar`,
  padel: `🎾 **Mejora tu saque de pádel**\n\n**Técnica básica:**\n1. Posición: pies a la anchura de hombros, peso en pie de atrás\n2. Empuñadura continental\n3. Lanza la bola ligeramente hacia delante y arriba\n4. Golpea con el brazo extendido\n5. Acompaña el movimiento\n\n**Ejercicios específicos:**\n• 50 saques contra pared: trabaja precisión\n• Saque con paracaídas: aumenta potencia\n• Vídeo análisis: pide a alguien que te grabe\n\n**Rutina preventiva:**\n• Estiramientos de muñeca y codo antes\n• Fortalece antebrazo con ejercicios de agarre`,
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('rutina') || lower.includes('hoy')) return AI_RESPONSES.rutina;
  if (lower.includes('30 min') || lower.includes('poco tiempo')) return AI_RESPONSES['30 minutos'];
  if (lower.includes('pádel') || lower.includes('padel') || lower.includes('saque')) return AI_RESPONSES.padel;
  if (lower.includes('boxeo')) return `🥊 **Plan semanal de boxeo para nivel intermedio:**\n\n**Lunes — Técnica:** Jab-cross-hook, 5 rondas de 3 min\n**Miércoles — Cardio:** Saltar comba + sombra 45min\n**Viernes — Potencia:** Saco pesado + sparring\n\n💡 Tip: La constancia es clave en boxeo. La técnica mejora con repetición.\n\n¿Quieres que genere la sesión de hoy?`;
  if (lower.includes('agujeta') || lower.includes('dolor')) return `🩺 **Tienes agujetas en piernas. Aquí tu plan:**\n\n✅ **Hoy: Activo-Recuperación**\n• 20min caminata suave o bici estática nivel bajo\n• Yoga de piernas (15min): cuádriceps, isquios, gemelos\n• Foam roller en zonas afectadas\n• Ducha con contraste frío/caliente\n\n🔄 **Mañana podrás entrenar con normalidad**\n\n💧 Hidratación extra y magnesio te ayudarán.`;
  if (lower.includes('nutrici') || lower.includes('comer') || lower.includes('comida')) return `🥗 **Nutrición post-entrenamiento**\n\n**Ventana anabólica (0-30 min):**\n• Proteína: 20-40g (batido whey, huevos, yogur griego)\n• Carbohidratos rápidos: plátano, arroz blanco\n\n**Comida completa (1-2h después):**\n• Proteína magra: pollo, pez, legumbres\n• Carbohidratos complejos: patata, avena, quinoa\n• Grasas buenas: aguacate, aceite de oliva\n• Verduras variadas\n\n💡 Hidratación: 500ml agua por hora de entreno`;
  return `Entiendo tu pregunta sobre "${message}". Basándome en tu perfil y progreso actual, te recomiendo:\n\n✅ Mantener la consistencia es tu mayor ventaja ahora mismo\n📊 Según tus estadísticas, estás mejorando un 12% respecto a la semana pasada\n⚡ Tu próximo objetivo: completar 90 entrenamientos totales (llevas 87)\n\n¿Quieres que cree un plan específico para esto? Puedo adaptar todo a tu horario y nivel.`;
}

function formatMessage(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-bold text-white mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
    }
    if (line.startsWith('• ')) {
      return <li key={i} className="ml-4 text-white/80 text-sm">{line.replace('• ', '')}</li>;
    }
    if (line.startsWith('#')) {
      const content = line.replace(/^#+\s/, '');
      return <h4 key={i} className="font-bold text-white text-base mb-1">{content}</h4>;
    }
    if (line.includes('**')) {
      const parts = line.split(/(\*\*[^*]+\*\*)/);
      return (
        <p key={i} className="text-white/80 text-sm leading-relaxed">
          {parts.map((p, j) =>
            p.startsWith('**') ? <strong key={j} className="text-white font-semibold">{p.replace(/\*\*/g, '')}</strong> : p
          )}
        </p>
      );
    }
    return line ? <p key={i} className="text-white/80 text-sm leading-relaxed">{line}</p> : <br key={i} />;
  });
}

export default function IAPage() {
  const { user, chatMessages, addChatMessage, clearChat, canSendAIMessage, incrementAIMessage, aiMessagesToday, plan } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const FREE_LIMIT = 5;

  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        id: 'welcome',
        role: 'assistant',
        content: AI_RESPONSES.default,
        timestamp: new Date(),
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return;

    if (!canSendAIMessage()) {
      setShowUpgrade(true);
      return;
    }

    incrementAIMessage();

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    addChatMessage(userMsg);
    setInput('');
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1000;
    await new Promise(r => setTimeout(r, delay));

    const aiMsg: ChatMessage = {
      id: `a_${Date.now()}`,
      role: 'assistant',
      content: getAIResponse(content),
      timestamp: new Date(),
    };
    addChatMessage(aiMsg);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
    <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} reason="ai" />
    <div className="flex flex-col h-screen lg:h-[100dvh] max-h-screen">
      {/* Free plan usage bar */}
      {plan === 'free' && (
        <div className={`px-4 py-2 text-xs flex items-center gap-2 ${aiMessagesToday >= FREE_LIMIT ? 'bg-red-500/10 border-b border-red-500/20' : 'bg-[#6c5ce7]/5 border-b border-[#2a2a3e]'}`}>
          {aiMessagesToday >= FREE_LIMIT ? (
            <>
              <Lock size={11} className="text-red-400" />
              <span className="text-red-300 font-medium">Límite de mensajes alcanzado.</span>
              <button onClick={() => setShowUpgrade(true)} className="text-[#a29bfe] underline">Pasa a Premium →</button>
            </>
          ) : (
            <>
              <Zap size={11} className="text-[#6c5ce7]" />
              <span className="text-white/40">{FREE_LIMIT - aiMessagesToday} mensajes restantes hoy</span>
              <div className="flex gap-0.5 ml-auto">
                {Array.from({ length: FREE_LIMIT }).map((_, i) => (
                  <div key={i} className={`w-3 h-1.5 rounded-full ${i < aiMessagesToday ? 'bg-red-500' : 'bg-[#2a2a3e]'}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#2a2a3e] bg-[#0d0d14] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h1 className="font-bold text-white flex items-center gap-2">
              IA Entrenadora
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
            <p className="text-white/40 text-xs">Potenciado por GPT-4 · Disponible 24/7</p>
          </div>
        </div>
        <button onClick={clearChat} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-[#1e1e2e] transition-all" title="Limpiar chat">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-3 border-b border-[#2a2a3e] bg-[#0a0a0f] flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              disabled={isTyping || (plan === 'free' && aiMessagesToday >= FREE_LIMIT)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-[#2a2a3e] text-white/60 hover:text-white hover:border-[#6c5ce7]/50 hover:bg-[#6c5ce7]/10 transition-all disabled:opacity-40"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {chatMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap size={14} className="text-white" />
                </div>
              )}

              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#6c5ce7] to-[#5543c5] rounded-br-sm'
                      : 'bg-[#12121a] border border-[#2a2a3e] rounded-tl-sm'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="space-y-1">{formatMessage(msg.content)}</div>
                  ) : (
                    <p className="text-white text-sm">{msg.content}</p>
                  )}
                </div>
                <p className="text-white/20 text-[10px] mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {msg.role === 'user' && user && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center flex-shrink-0 mt-1 text-white font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#6c5ce7]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
                <span className="text-white/30 text-xs ml-2">La IA está escribiendo...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-[#2a2a3e] bg-[#0d0d14] flex-shrink-0">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pregunta a tu entrenador IA... (Enter para enviar)"
              rows={1}
              className="resize-none min-h-[48px] max-h-32 overflow-y-auto pr-12 !py-3 !rounded-2xl"
              style={{ lineHeight: '1.5' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping || (plan === 'free' && aiMessagesToday >= FREE_LIMIT)}
              className="absolute right-3 bottom-3 w-7 h-7 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center disabled:opacity-30 transition-all hover:scale-110"
            >
              <Send size={13} className="text-white" />
            </button>
          </div>
        </div>
        <p className="text-center text-white/20 text-xs mt-2 flex items-center justify-center gap-1">
          <Sparkles size={10} />
          IA basada en tu perfil personal y progreso real
        </p>
      </div>
    </div>
    </>
  );
}

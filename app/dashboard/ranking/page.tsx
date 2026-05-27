'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, Zap, Flame, Users, Crown, Swords, TrendingUp, Medal } from 'lucide-react';
import { useAppStore } from '@/lib/store';

type Period = 'week' | 'month' | 'alltime';
type League = 'all' | 'free' | 'premium';

interface RankPlayer {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  workouts: number;
  plan: 'free' | 'premium' | 'annual';
  sport: string;
  change: number; // position change since last period
}

const MOCK_PLAYERS: RankPlayer[] = [
  { id: 'p1', name: 'Carlos M.', avatar: 'C', xp: 12400, level: 24, streak: 45, workouts: 186, plan: 'annual', sport: '🏋️', change: 0 },
  { id: 'p2', name: 'Laura S.', avatar: 'L', xp: 11800, level: 22, streak: 38, workouts: 174, plan: 'premium', sport: '🎾', change: 2 },
  { id: 'p3', name: 'Marcos R.', avatar: 'M', xp: 10950, level: 21, streak: 29, workouts: 163, plan: 'premium', sport: '🥊', change: -1 },
  { id: 'p4', name: 'Ana P.', avatar: 'A', xp: 9200, level: 19, streak: 22, workouts: 141, plan: 'premium', sport: '🧘', change: 1 },
  { id: 'p5', name: 'Diego V.', avatar: 'D', xp: 8600, level: 17, streak: 17, workouts: 128, plan: 'annual', sport: '🏃', change: -2 },
  { id: 'p6', name: 'Sara N.', avatar: 'S', xp: 7800, level: 16, streak: 14, workouts: 112, plan: 'free', sport: '🏋️', change: 3 },
  { id: 'p7', name: 'Javi K.', avatar: 'J', xp: 6500, level: 14, streak: 11, workouts: 98, plan: 'free', sport: '⚡', change: 0 },
  { id: 'p8', name: 'Marta T.', avatar: 'M', xp: 5900, level: 13, streak: 9, workouts: 87, plan: 'premium', sport: '🌀', change: -1 },
  { id: 'p9', name: 'Pablo G.', avatar: 'P', xp: 4800, level: 11, streak: 7, workouts: 74, plan: 'free', sport: '💪', change: 2 },
  { id: 'p10', name: 'Nuria F.', avatar: 'N', xp: 3950, level: 9, streak: 5, workouts: 61, plan: 'free', sport: '🌿', change: -3 },
];

const CHALLENGES = [
  {
    id: 'c1',
    title: 'Rey del Cardio',
    desc: 'El que más calorías queme esta semana gana 500 XP extra',
    prize: '500 XP',
    emoji: '🔥',
    participants: 234,
    timeLeft: '3 días',
    type: 'all',
  },
  {
    id: 'c2',
    title: 'Racha Imparable',
    desc: 'Mantén la racha más larga. El top 3 recibe insignias especiales',
    prize: '🏅 Insignia',
    emoji: '⚡',
    participants: 189,
    timeLeft: '5 días',
    type: 'premium',
  },
  {
    id: 'c3',
    title: 'Guerrero del Gym',
    desc: 'Más entrenamientos de fuerza en 7 días. Premio: 1 mes Premium gratis',
    prize: '1 mes Premium',
    emoji: '🏋️',
    participants: 98,
    timeLeft: '1 día',
    type: 'free',
  },
  {
    id: 'c4',
    title: 'Duelo Pádel',
    desc: 'Reto exclusivo pádel. Los 3 mejores suben de categoría',
    prize: 'Subida de liga',
    emoji: '🎾',
    participants: 56,
    timeLeft: '6 días',
    type: 'premium',
  },
];

function PodiumCard({ player, position }: { player: RankPlayer; position: number }) {
  const colors = ['from-[#fdcb6e] to-[#e17055]', 'from-[#b2bec3] to-[#636e72]', 'from-[#cd7f32] to-[#a0522d]'];
  const sizes = ['w-20 h-20', 'w-16 h-16', 'w-16 h-16'];
  const heights = ['mt-0', 'mt-6', 'mt-8'];
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.1 }}
      className={`flex flex-col items-center ${heights[position]}`}
    >
      <div className={`${sizes[position]} rounded-full bg-gradient-to-br ${colors[position]} flex items-center justify-center font-black text-white text-xl shadow-lg relative`}>
        {player.avatar}
        <span className="absolute -bottom-1 -right-1 text-base">{medals[position]}</span>
      </div>
      <p className="text-white font-bold text-sm mt-2">{player.name}</p>
      <p className="text-white/40 text-xs">{player.xp.toLocaleString()} XP</p>
      <div className={`mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${player.plan !== 'free' ? 'bg-[#fdcb6e]/20 text-[#fdcb6e]' : 'bg-[#2a2a3e] text-white/50'}`}>
        {player.plan !== 'free' ? '⭐ Premium' : 'Free'}
      </div>
    </motion.div>
  );
}

export default function RankingPage() {
  const { user, plan } = useAppStore();
  const [period, setPeriod] = useState<Period>('week');
  const [league, setLeague] = useState<League>('all');
  const [activeTab, setActiveTab] = useState<'ranking' | 'retos'>('ranking');

  const myPosition = 7; // Simulated user position

  const filteredPlayers = MOCK_PLAYERS.filter(p => {
    if (league === 'all') return true;
    if (league === 'free') return p.plan === 'free';
    return p.plan === 'premium' || p.plan === 'annual';
  });

  const myPlayer: RankPlayer = {
    id: 'me',
    name: user?.name || 'Tú',
    avatar: user?.name?.charAt(0) || 'T',
    xp: user?.xp || 0,
    level: user?.level || 1,
    streak: user?.streak || 0,
    workouts: user?.totalWorkouts || 0,
    plan: plan as 'free' | 'premium' | 'annual',
    sport: '🏋️',
    change: 2,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Ranking 🏆</h1>
        <p className="text-white/50">Compite con la comunidad y sube a lo más alto</p>
      </motion.div>

      {/* My position card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-r from-[#6c5ce7]/20 to-[#00d2ff]/10 border border-[#6c5ce7]/30 rounded-2xl p-5 mb-6 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff]" />
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center text-white font-black text-xl">
            {myPlayer.avatar}
          </div>
          <div className="flex-1">
            <p className="text-white/50 text-xs mb-0.5">Tu posición actual</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">#{myPosition}</span>
              <span className="text-emerald-400 text-sm font-bold flex items-center gap-0.5">
                <TrendingUp size={12} />
                +{myPlayer.change}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#6c5ce7] font-black text-lg">{(user?.xp || 0).toLocaleString()} XP</p>
            <p className="text-white/40 text-xs">esta semana</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Entrenam.', value: user?.totalWorkouts || 0, icon: '🏋️' },
            { label: 'Racha', value: `${user?.streak || 0}d`, icon: '🔥' },
            { label: 'Nivel', value: user?.level || 1, icon: '⭐' },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-xl p-2 text-center">
              <p className="text-lg">{s.icon}</p>
              <p className="text-white font-bold text-sm">{s.value}</p>
              <p className="text-white/40 text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-[#12121a] rounded-xl p-1 mb-6 border border-[#2a2a3e]">
        <button
          onClick={() => setActiveTab('ranking')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'ranking' ? 'bg-[#6c5ce7] text-white' : 'text-white/40 hover:text-white'}`}
        >
          <Trophy size={15} />
          Clasificación
        </button>
        <button
          onClick={() => setActiveTab('retos')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'retos' ? 'bg-[#6c5ce7] text-white' : 'text-white/40 hover:text-white'}`}
        >
          <Swords size={15} />
          Retos
        </button>
      </div>

      {activeTab === 'ranking' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex gap-1 bg-[#12121a] rounded-xl p-1 border border-[#2a2a3e]">
              {(['week', 'month', 'alltime'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${period === p ? 'bg-[#6c5ce7] text-white' : 'text-white/40 hover:text-white'}`}
                >
                  {p === 'week' ? 'Semana' : p === 'month' ? 'Mes' : 'Histórico'}
                </button>
              ))}
            </div>
            <div className="flex gap-1 bg-[#12121a] rounded-xl p-1 border border-[#2a2a3e]">
              {(['all', 'free', 'premium'] as League[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLeague(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${league === l ? 'bg-[#6c5ce7] text-white' : 'text-white/40 hover:text-white'}`}
                >
                  {l === 'all' ? 'Todos' : l === 'free' ? 'Gratis' : 'Premium'}
                </button>
              ))}
            </div>
          </div>

          {/* Podium */}
          {filteredPlayers.length >= 3 && (
            <div className="mb-8">
              <div className="flex items-end justify-center gap-4 py-4">
                <PodiumCard player={filteredPlayers[1]} position={1} />
                <PodiumCard player={filteredPlayers[0]} position={0} />
                <PodiumCard player={filteredPlayers[2]} position={2} />
              </div>
            </div>
          )}

          {/* Full list */}
          <div className="space-y-2">
            {filteredPlayers.map((player, i) => {
              const isMe = player.id === 'me';
              const rank = i + 1;
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                    isMe
                      ? 'bg-[#6c5ce7]/15 border-[#6c5ce7]/40'
                      : 'bg-[#12121a] border-[#2a2a3e] hover:border-[#2a2a3e]/80'
                  }`}
                >
                  {/* Rank */}
                  <div className={`w-8 text-center font-black text-sm ${rank <= 3 ? 'text-[#fdcb6e]' : 'text-white/40'}`}>
                    {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
                  </div>

                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0 ${
                    isMe
                      ? 'bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff]'
                      : 'bg-gradient-to-br from-[#2a2a3e] to-[#1e1e2e]'
                  }`}>
                    {player.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={`font-semibold text-sm truncate ${isMe ? 'text-[#a29bfe]' : 'text-white'}`}>
                        {isMe ? `${player.name} (tú)` : player.name}
                      </p>
                      {player.plan !== 'free' && (
                        <Crown size={10} className="text-[#fdcb6e] flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-white/30 text-[11px] flex items-center gap-0.5">
                        <Flame size={10} className="text-orange-400" />{player.streak}d
                      </span>
                      <span className="text-white/30 text-[11px]">Nv.{player.level}</span>
                      <span className="text-white/30 text-[11px]">{player.sport}</span>
                    </div>
                  </div>

                  {/* XP + change */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-bold text-sm">{player.xp.toLocaleString()}</p>
                    <p className="text-white/30 text-[10px]">XP</p>
                  </div>
                  <div className={`w-12 text-right text-[11px] font-bold ${player.change > 0 ? 'text-emerald-400' : player.change < 0 ? 'text-red-400' : 'text-white/20'}`}>
                    {player.change > 0 ? `↑${player.change}` : player.change < 0 ? `↓${Math.abs(player.change)}` : '—'}
                  </div>
                </motion.div>
              );
            })}

            {/* My position at bottom if not in top list */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#6c5ce7]/40 bg-[#6c5ce7]/10 mt-4"
            >
              <div className="w-8 text-center font-black text-sm text-white/40">#{myPosition + filteredPlayers.length}</div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center font-bold text-white text-sm">
                {myPlayer.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-[#a29bfe]">{myPlayer.name} (tú)</p>
                <p className="text-white/30 text-[11px]">Nv.{myPlayer.level} · {myPlayer.streak}d racha</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-sm">{myPlayer.xp.toLocaleString()}</p>
                <p className="text-white/30 text-[10px]">XP</p>
              </div>
            </motion.div>
          </div>

          {/* League info */}
          {plan === 'free' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 bg-gradient-to-r from-[#fdcb6e]/10 to-[#e17055]/5 border border-[#fdcb6e]/20 rounded-2xl p-4 text-center"
            >
              <Crown size={24} className="text-[#fdcb6e] mx-auto mb-2" />
              <p className="text-white font-bold mb-1">¡Únete a la Liga Premium!</p>
              <p className="text-white/50 text-sm mb-3">Los usuarios Premium compiten por premios mensuales: meses gratis, merchandising y más</p>
              <a href="/dashboard/premium">
                <button className="px-6 py-2 bg-gradient-to-r from-[#fdcb6e] to-[#e17055] rounded-xl text-black font-bold text-sm hover:opacity-90 transition-all">
                  Ver Premium
                </button>
              </a>
            </motion.div>
          )}
        </>
      )}

      {activeTab === 'retos' && (
        <div className="space-y-4">
          <p className="text-white/40 text-sm">Retos activos esta semana</p>

          {CHALLENGES.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#12121a] rounded-2xl border p-5 ${
                challenge.type === 'premium' && plan === 'free'
                  ? 'border-[#2a2a3e] opacity-70'
                  : 'border-[#2a2a3e] hover:border-[#6c5ce7]/40'
              } transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{challenge.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-bold">{challenge.title}</h3>
                    {challenge.type === 'premium' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdcb6e]/20 text-[#fdcb6e] font-bold">PREMIUM</span>
                    )}
                    {challenge.type === 'free' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">TODOS</span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm mb-3">{challenge.desc}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-white/40">
                      <Users size={12} />
                      {challenge.participants} participantes
                    </span>
                    <span className="text-white/40">⏳ {challenge.timeLeft}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white/30 text-[10px] mb-1">Premio</p>
                  <p className="text-[#fdcb6e] font-bold text-sm">{challenge.prize}</p>
                </div>
              </div>

              <div className="mt-4">
                {challenge.type === 'premium' && plan === 'free' ? (
                  <a href="/dashboard/premium">
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#fdcb6e] to-[#e17055] text-black font-bold text-sm hover:opacity-90 transition-all">
                      🔒 Requiere Premium
                    </button>
                  </a>
                ) : (
                  <button className="w-full py-2.5 rounded-xl bg-[#6c5ce7]/15 border border-[#6c5ce7]/30 text-[#a29bfe] font-bold text-sm hover:bg-[#6c5ce7]/25 transition-all">
                    ⚡ Unirse al reto
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {/* Coming soon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#12121a] rounded-2xl border border-dashed border-[#2a2a3e] p-6 text-center"
          >
            <Medal size={28} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/40 font-semibold">Duelos 1vs1 · Próximamente</p>
            <p className="text-white/20 text-sm mt-1">Reta directamente a otro usuario y compite por XP</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

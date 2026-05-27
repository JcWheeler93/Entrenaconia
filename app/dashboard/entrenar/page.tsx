'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Play, Clock, Flame, Zap, CheckCircle, ChevronDown, Filter, Search } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DEMO_WORKOUTS, SPORTS } from '@/lib/data';
import { Workout } from '@/lib/types';

const DIFFICULTIES = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
const DURATIONS = ['Todos', '< 30min', '30-45min', '45-60min', '60+min'];

function WorkoutCard({ workout, onStart }: { workout: Workout; onStart: (w: Workout) => void }) {
  const [expanded, setExpanded] = useState(false);
  const sport = SPORTS.find(s => s.id === workout.sport.id) || workout.sport;

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${sport.color}20` }}
          >
            {sport.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant="default" size="sm">{sport.name}</Badge>
              <Badge
                variant={workout.difficulty === 'beginner' ? 'success' : workout.difficulty === 'intermediate' ? 'warning' : 'epic'}
                size="sm"
              >
                {workout.difficulty === 'beginner' ? 'Principiante' : workout.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
              </Badge>
            </div>
            <h3 className="text-white font-bold">{workout.title}</h3>
            <p className="text-white/50 text-xs mt-1 line-clamp-2">{workout.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-white/50">
            <Clock size={13} />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-white/50">
            <Flame size={13} className="text-orange-400" />
            <span>{workout.caloriesBurn} kcal</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#fdcb6e] ml-auto">
            <Zap size={13} />
            <span>+{workout.xpReward} XP</span>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors w-full mb-4"
        >
          <span>{workout.exercises.length} ejercicios</span>
          <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="space-y-2 border-t border-[#2a2a3e] pt-4">
                {workout.exercises.map((ex, i) => (
                  <div key={ex.id} className="flex items-center gap-3 text-sm">
                    <span className="text-white/30 w-5 text-right">{i + 1}</span>
                    <span className="text-white flex-1">{ex.name}</span>
                    <span className="text-white/40 text-xs">
                      {ex.sets && ex.reps ? `${ex.sets}×${ex.reps}` : ex.sets && ex.duration ? `${ex.sets}×${ex.duration}s` : ex.duration ? `${ex.duration}s` : ''}
                    </span>
                    {ex.rest && <span className="text-white/30 text-xs">{ex.rest}s rest</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button fullWidth onClick={() => onStart(workout)}>
          <span className="flex items-center gap-2 justify-center">
            <Play size={15} className="fill-white" />
            Iniciar entrenamiento
          </span>
        </Button>
      </div>
    </Card>
  );
}

function ActiveWorkout({ workout, onFinish }: { workout: Workout; onFinish: () => void }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [currentEx, setCurrentEx] = useState(0);
  const { addXP, completeWorkout } = useAppStore();

  const toggleExercise = (id: string) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const allDone = completed.length === workout.exercises.length;

  const handleFinish = () => {
    addXP(workout.xpReward);
    completeWorkout(workout.id);
    onFinish();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col"
    >
      {/* Header */}
      <div
        className="px-4 py-5 flex items-center justify-between border-b border-[#2a2a3e]"
        style={{ background: `${workout.sport.color}15` }}
      >
        <div>
          <p className="text-white/40 text-xs mb-1">{workout.sport.emoji} {workout.sport.name}</p>
          <h1 className="text-white font-black text-xl">{workout.title}</h1>
        </div>
        <div className="text-right">
          <p className="text-white/40 text-xs">Progreso</p>
          <p className="text-white font-bold">{completed.length}/{workout.exercises.length}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#2a2a3e]">
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${workout.sport.color}, #00d2ff)` }}
          animate={{ width: `${(completed.length / workout.exercises.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Exercises */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
        {workout.exercises.map((ex, i) => {
          const done = completed.includes(ex.id);
          const current = i === currentEx && !done;
          return (
            <motion.button
              key={ex.id}
              onClick={() => {
                toggleExercise(ex.id);
                if (!done && i === currentEx) setCurrentEx(Math.min(i + 1, workout.exercises.length - 1));
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left rounded-2xl p-4 border transition-all ${
                done
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : current
                  ? 'bg-[#6c5ce7]/15 border-[#6c5ce7]/40 shadow-lg shadow-[#6c5ce7]/10'
                  : 'bg-[#12121a] border-[#2a2a3e]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  done ? 'bg-emerald-500 text-white' : current ? 'bg-[#6c5ce7] text-white' : 'bg-[#2a2a3e] text-white/50'
                }`}>
                  {done ? <CheckCircle size={18} /> : i + 1}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${done ? 'text-emerald-400 line-through opacity-70' : 'text-white'}`}>{ex.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{ex.description}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${done ? 'text-emerald-400' : current ? 'text-[#6c5ce7]' : 'text-white/50'}`}>
                    {ex.sets && ex.reps ? `${ex.sets}×${ex.reps}` : ex.sets && ex.duration ? `${ex.sets}×${ex.duration}s` : ex.duration ? `${ex.duration}s` : ''}
                  </p>
                  {ex.rest && <p className="text-white/30 text-xs">{ex.rest}s descanso</p>}
                </div>
              </div>
              {current && !done && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-[#6c5ce7]/20"
                >
                  <p className="text-[#a29bfe] text-sm">💡 {ex.description}</p>
                  {ex.muscleGroups && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {ex.muscleGroups.map(m => (
                        <span key={m} className="text-xs px-2 py-0.5 bg-[#6c5ce7]/10 text-[#a29bfe] rounded-full">{m}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#2a2a3e] bg-[#0d0d14]">
        <div className="flex items-center gap-3 mb-3 text-sm text-white/50">
          <span className="flex items-center gap-1"><Flame size={13} className="text-orange-400" />{workout.caloriesBurn} kcal</span>
          <span className="flex items-center gap-1"><Zap size={13} className="text-[#fdcb6e]" />+{workout.xpReward} XP</span>
          <span className="flex items-center gap-1 ml-auto"><Clock size={13} />{workout.duration} min</span>
        </div>
        {allDone ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <Button fullWidth className="bg-gradient-to-r from-emerald-600 to-emerald-500" onClick={handleFinish}>
              🎉 ¡Entrenamiento completado! +{workout.xpReward} XP
            </Button>
          </motion.div>
        ) : (
          <Button fullWidth variant="secondary" onClick={handleFinish}>
            Finalizar entrenamiento
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default function EntrenarPage() {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [sportFilter, setSportFilter] = useState('Todos');
  const [diffFilter, setDiffFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [finished, setFinished] = useState<string[]>([]);

  const allWorkouts = [...DEMO_WORKOUTS, ...DEMO_WORKOUTS.map(w => ({
    ...w,
    id: w.id + '_2',
    title: w.title + ' Pro',
    difficulty: 'advanced' as const,
    xpReward: w.xpReward + 100,
  }))];

  const filtered = allWorkouts.filter(w => {
    const matchSport = sportFilter === 'Todos' || w.sport.name === sportFilter;
    const matchDiff = diffFilter === 'Todos' ||
      (diffFilter === 'Principiante' && w.difficulty === 'beginner') ||
      (diffFilter === 'Intermedio' && w.difficulty === 'intermediate') ||
      (diffFilter === 'Avanzado' && w.difficulty === 'advanced');
    const matchSearch = w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.sport.name.toLowerCase().includes(search.toLowerCase());
    return matchSport && matchDiff && matchSearch;
  });

  return (
    <>
      {activeWorkout && (
        <ActiveWorkout
          workout={activeWorkout}
          onFinish={() => {
            setFinished(prev => [...prev, activeWorkout.id]);
            setActiveWorkout(null);
          }}
        />
      )}

      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Entrenar 🏋️</h1>
          <p className="text-white/50">Elige tu entrenamiento o deja que la IA elija por ti</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar entrenamientos..."
              className="pl-11"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {DIFFICULTIES.map(d => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  diffFilter === d ? 'bg-[#6c5ce7] text-white' : 'bg-[#1e1e2e] text-white/50 hover:text-white border border-[#2a2a3e]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {['Todos', ...SPORTS.slice(0, 6).map(s => s.name)].map(s => (
              <button
                key={s}
                onClick={() => setSportFilter(s)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  sportFilter === s ? 'bg-[#6c5ce7] text-white' : 'bg-[#1e1e2e] text-white/50 hover:text-white border border-[#2a2a3e]'
                }`}
              >
                {s !== 'Todos' && SPORTS.find(sp => sp.name === s)?.emoji} {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-white/30 text-sm mb-4">{filtered.length} entrenamientos disponibles</p>

        {/* Workouts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((workout, i) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {finished.includes(workout.id) ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl z-10 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle size={32} className="text-emerald-400 mx-auto mb-2" />
                      <p className="text-emerald-400 font-bold text-sm">¡Completado!</p>
                    </div>
                  </div>
                  <div className="opacity-40 pointer-events-none">
                    <WorkoutCard workout={workout} onStart={() => {}} />
                  </div>
                </div>
              ) : (
                <WorkoutCard workout={workout} onStart={setActiveWorkout} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

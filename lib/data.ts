import { Sport, Achievement, Workout, User, WeeklyProgress, Plan } from './types';

export const SPORTS: Sport[] = [
  { id: 'gym', name: 'Gimnasio', emoji: '🏋️', color: '#6c5ce7', gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', description: 'Musculación y fuerza' },
  { id: 'boxing', name: 'Boxeo', emoji: '🥊', color: '#e17055', gradient: 'linear-gradient(135deg, #e17055, #fd79a8)', description: 'Cardio y técnica de combate' },
  { id: 'yoga', name: 'Yoga', emoji: '🧘', color: '#00cec9', gradient: 'linear-gradient(135deg, #00cec9, #55efc4)', description: 'Flexibilidad y bienestar' },
  { id: 'padel', name: 'Pádel', emoji: '🎾', color: '#fdcb6e', gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)', description: 'Técnica y condición física' },
  { id: 'running', name: 'Running', emoji: '🏃', color: '#00b894', gradient: 'linear-gradient(135deg, #00b894, #00cec9)', description: 'Resistencia y cardio' },
  { id: 'crossfit', name: 'CrossFit', emoji: '⚡', color: '#fd79a8', gradient: 'linear-gradient(135deg, #fd79a8, #e84393)', description: 'Entrenamiento funcional intenso' },
  { id: 'pilates', name: 'Pilates', emoji: '🌀', color: '#a29bfe', gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', description: 'Core y postura' },
  { id: 'calistenia', name: 'Calistenia', emoji: '💪', color: '#55efc4', gradient: 'linear-gradient(135deg, #55efc4, #00b894)', description: 'Peso corporal y control' },
  { id: 'funcional', name: 'Funcional', emoji: '🔥', color: '#fdcb6e', gradient: 'linear-gradient(135deg, #fdcb6e, #fd79a8)', description: 'Movimientos funcionales' },
  { id: 'hiit', name: 'HIIT', emoji: '⏱️', color: '#e84393', gradient: 'linear-gradient(135deg, #e84393, #e17055)', description: 'Intervalos de alta intensidad' },
  { id: 'movilidad', name: 'Movilidad', emoji: '🌿', color: '#74b9ff', gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)', description: 'Estiramientos y movilidad' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_workout', title: 'Primer Paso', description: 'Completa tu primer entrenamiento', emoji: '🌟', xpReward: 100, unlocked: true, unlockedAt: '2024-01-15', condition: 'workouts >= 1', rarity: 'common' },
  { id: 'week_streak', title: 'Semana Perfecta', description: 'Entrena 7 días seguidos', emoji: '🔥', xpReward: 500, unlocked: true, unlockedAt: '2024-01-22', condition: 'streak >= 7', rarity: 'rare' },
  { id: 'boxing_10', title: 'Boxeador Novato', description: 'Completa 10 sesiones de boxeo', emoji: '🥊', xpReward: 300, unlocked: false, condition: 'boxing_workouts >= 10', rarity: 'common' },
  { id: 'padel_master', title: 'Maestro del Pádel', description: 'Alcanza nivel 5 en pádel', emoji: '🏆', xpReward: 1000, unlocked: false, condition: 'padel_level >= 5', rarity: 'epic' },
  { id: 'century', title: 'Centenario', description: 'Completa 100 entrenamientos', emoji: '💯', xpReward: 2000, unlocked: false, condition: 'workouts >= 100', rarity: 'legendary' },
  { id: 'early_bird', title: 'Madrugador', description: 'Entrena antes de las 7am', emoji: '🌅', xpReward: 200, unlocked: true, unlockedAt: '2024-01-18', condition: 'early_workout = true', rarity: 'common' },
  { id: 'iron_will', title: 'Voluntad de Hierro', description: 'Entrena 30 días consecutivos', emoji: '⚡', xpReward: 3000, unlocked: false, condition: 'streak >= 30', rarity: 'legendary' },
  { id: 'calorie_burn', title: 'Quemacalorías', description: 'Quema 10,000 calorías en total', emoji: '🔥', xpReward: 500, unlocked: false, condition: 'total_calories >= 10000', rarity: 'rare' },
];

export const DEMO_WORKOUTS: Workout[] = [
  {
    id: 'w1',
    title: 'Fuerza Piernas & Core',
    description: 'Rutina completa de piernas y abdominales para ganar masa muscular y fuerza',
    sport: SPORTS[0],
    duration: 55,
    difficulty: 'intermediate',
    xpReward: 250,
    caloriesBurn: 380,
    exercises: [
      { id: 'e1', name: 'Sentadillas', sets: 4, reps: 12, rest: 90, description: 'Sentadilla profunda con barra', muscleGroups: ['Cuádriceps', 'Glúteos'] },
      { id: 'e2', name: 'Prensa de piernas', sets: 3, reps: 15, rest: 75, description: 'Prensa 45 grados', muscleGroups: ['Cuádriceps', 'Glúteos'] },
      { id: 'e3', name: 'Zancadas', sets: 3, reps: 12, rest: 60, description: 'Zancadas con mancuernas', muscleGroups: ['Cuádriceps', 'Glúteos'] },
      { id: 'e4', name: 'Plancha', sets: 3, duration: 60, rest: 45, description: 'Plancha isométrica', muscleGroups: ['Core', 'Abdominales'] },
      { id: 'e5', name: 'Crunch bicicleta', sets: 3, reps: 20, rest: 45, description: 'Abdominales bicicleta', muscleGroups: ['Oblicuos', 'Abdominales'] },
    ],
  },
  {
    id: 'w2',
    title: 'Boxeo Técnico + Cardio',
    description: 'Combina técnica de boxeo con intervalos de alta intensidad para máxima quema calórica',
    sport: SPORTS[1],
    duration: 45,
    difficulty: 'intermediate',
    xpReward: 300,
    caloriesBurn: 450,
    exercises: [
      { id: 'e6', name: 'Calentamiento sombra', duration: 300, description: '5 minutos de sombra ligera', muscleGroups: ['Cuerpo completo'] },
      { id: 'e7', name: 'Jab-Cross-Hook', sets: 5, duration: 120, rest: 60, description: 'Combinación básica en saco', muscleGroups: ['Hombros', 'Core'] },
      { id: 'e8', name: 'Saltar comba', sets: 4, duration: 120, rest: 30, description: 'Salto continuo con comba', muscleGroups: ['Cardio', 'Piernas'] },
      { id: 'e9', name: 'Uppercuts al saco', sets: 3, duration: 90, rest: 60, description: 'Uppercuts potentes', muscleGroups: ['Bíceps', 'Hombros'] },
    ],
  },
  {
    id: 'w3',
    title: 'Pádel: Velocidad y Reflejos',
    description: 'Mejora tu velocidad de reacción, reflejos y movilidad específica para pádel',
    sport: SPORTS[3],
    duration: 40,
    difficulty: 'intermediate',
    xpReward: 280,
    caloriesBurn: 320,
    exercises: [
      { id: 'e10', name: 'Escalera de agilidad', sets: 4, duration: 30, rest: 30, description: 'Patrones de pies con escalera', muscleGroups: ['Coordinación', 'Piernas'] },
      { id: 'e11', name: 'Lateral shuffle', sets: 5, duration: 20, rest: 20, description: 'Desplazamientos laterales explosivos', muscleGroups: ['Piernas', 'Core'] },
      { id: 'e12', name: 'Globos de volea', sets: 3, reps: 20, rest: 45, description: 'Práctica de volea alta', muscleGroups: ['Hombros', 'Antebrazo'] },
      { id: 'e13', name: 'Sprint 10m', sets: 8, duration: 10, rest: 30, description: 'Sprints cortos explosivos', muscleGroups: ['Piernas', 'Cardio'] },
    ],
  },
];

export const DEMO_USER: User = {
  id: 'u1',
  name: 'Alex García',
  email: 'alex@entrenaconia.com',
  level: 12,
  xp: 4750,
  xpToNextLevel: 5000,
  streak: 15,
  totalWorkouts: 87,
  totalMinutes: 3240,
  joinDate: '2024-01-01',
  isPremium: true,
  sports: ['gym', 'boxing', 'padel', 'running'],
  goals: [
    { id: 'g1', title: 'Perder 5kg', target: 5, current: 3.2, unit: 'kg', deadline: '2024-03-01', completed: false },
    { id: 'g2', title: 'Correr 5km seguidos', target: 5, current: 3.8, unit: 'km', deadline: '2024-02-15', sport: 'running', completed: false },
    { id: 'g3', title: 'Dominar el saque de boxeo', target: 1, current: 0.7, unit: 'nivel', deadline: '2024-02-28', sport: 'boxing', completed: false },
  ],
  stats: {
    weeklyWorkouts: 5,
    weeklyMinutes: 285,
    monthlyCalories: 8420,
    bestStreak: 21,
    favoriteTime: 'Mañana',
  },
};

export const WEEKLY_PROGRESS: WeeklyProgress[] = [
  { day: 'Lun', minutes: 55, calories: 420, workouts: 1 },
  { day: 'Mar', minutes: 0, calories: 0, workouts: 0 },
  { day: 'Mié', minutes: 45, calories: 380, workouts: 1 },
  { day: 'Jue', minutes: 60, calories: 510, workouts: 1 },
  { day: 'Vie', minutes: 40, calories: 290, workouts: 1 },
  { day: 'Sáb', minutes: 75, calories: 620, workouts: 1 },
  { day: 'Dom', minutes: 30, calories: 200, workouts: 1 },
];

export const PRICING_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Gratis',
    price: 0,
    interval: 'month',
    features: [
      '3 entrenamientos por semana',
      '2 deportes disponibles',
      'Chat IA básico (5 mensajes/día)',
      'Dashboard básico',
      'Sin gamificación',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 14.99,
    interval: 'month',
    highlighted: true,
    features: [
      'Entrenamientos ilimitados',
      'Todos los deportes (11 disciplinas)',
      'Chat IA ilimitado 24/7',
      'Planes personalizados con IA',
      'Gamificación completa + logros',
      'Análisis de progreso avanzado',
      'Nutrición y consejos IA',
      'Retos semanales',
      'Soporte prioritario',
    ],
  },
  {
    id: 'annual',
    name: 'Premium Anual',
    price: 9.99,
    interval: 'month',
    features: [
      'Todo lo de Premium',
      '33% de descuento vs mensual',
      'Acceso anticipado a nuevas funciones',
      'Análisis biomecánico (próximamente)',
      'Integración Apple Health / Google Fit',
      'Sesiones 1:1 con entrenadores (próximamente)',
    ],
  },
];

export const PADEL_EXERCISES = [
  { name: 'Trabajo de pies', emoji: '👟', desc: 'Mejora tu posicionamiento', duration: '20 min' },
  { name: 'Reflejos y reacción', emoji: '⚡', desc: 'Velocidad de respuesta', duration: '15 min' },
  { name: 'Técnica de saque', emoji: '🎾', desc: 'Perfecciona tu saque', duration: '25 min' },
  { name: 'Volea de pared', emoji: '🧱', desc: 'Control en las paredes', duration: '20 min' },
  { name: 'Cardio específico', emoji: '❤️', desc: 'Resistencia para pádel', duration: '30 min' },
  { name: 'Prevención lesiones', emoji: '🩺', desc: 'Codo, muñeca, hombro', duration: '15 min' },
];

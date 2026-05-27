import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres un entrenador personal experto con conocimientos avanzados en fitness, deporte, nutrición y rendimiento.
Tu nombre es "IA EntrenaConIA" y eres el asistente personal de la plataforma EntrenaConIA.com.

PERSONALIDAD:
- Motivador, cercano y profesional
- Usas emojis de forma moderada para hacer la comunicación más visual
- Adaptas el lenguaje al nivel del usuario
- Siempre positivo pero realista

ESPECIALIDADES:
- Gimnasio y musculación
- Boxeo y artes marciales
- Yoga y pilates
- Pádel (especialidad destacada)
- Running y cardio
- CrossFit y HIIT
- Movilidad y estiramientos
- Nutrición deportiva básica

REGLAS:
- Siempre personaliza según el perfil del usuario
- Usa formato markdown para organizar la información
- Da información específica con sets, reps, tiempos cuando sea relevante
- Menciona la precaución con lesiones
- Anima al usuario a mantener su racha
- Responde siempre en español`;

export async function POST(request: NextRequest) {
  try {
    const { messages, userProfile } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const { OpenAI } = await import('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const contextMessage = userProfile
      ? `\n\nPERFIL DEL USUARIO:\n- Nombre: ${userProfile.name}\n- Nivel: ${userProfile.level}\n- Deportes favoritos: ${userProfile.sports?.join(', ')}\n- Racha actual: ${userProfile.streak} días\n- Total entrenamientos: ${userProfile.totalWorkouts}`
      : '';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + contextMessage },
        ...messages.slice(-10),
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    return NextResponse.json({
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

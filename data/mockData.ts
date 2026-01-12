// DATOS MOCK - Reemplazar con consultas a Supabase
// Tablas en Supabase: equipos, jugadores, partidos, goles_jugadores, posiciones, noticias

export interface Equipo {
  id: number
  nombre: string
  logo: string
  categoria: string
  jugadores_count: number
  grupo?: string
}

export interface Jugador {
  id: number
  nombre: string
  numero: number
  equipo_id: number
  equipo_nombre: string
  foto: string
  posicion: string
  goles?: number
}

export interface Partido {
  id: number
  equipo_local_id: number
  equipo_local: string
  logo_local: string
  equipo_visitante_id: number
  equipo_visitante: string
  logo_visitante: string
  goles_local: number | null
  goles_visitante: number | null
  fecha: string
  hora: string
  estado: 'finalizado' | 'en-curso' | 'programado'
  grupo?: string
}

export interface Posicion {
  id: number
  equipo_id: number
  equipo: string
  logo: string
  grupo: string
  partidos_jugados: number
  ganados: number
  empatados: number
  perdidos: number
  goles_favor: number
  goles_contra: number
  diferencia_goles: number
  puntos: number
}

export interface Noticia {
  id: number
  titulo: string
  contenido: string
  imagen: string
  fecha: string
  categoria: string
}

// Mock Data
export const equiposMock: Equipo[] = [
  {
    id: 1,
    nombre: 'Los Tigres',
    logo: 'https://via.placeholder.com/150/0066CC/FFFFFF?text=LT',
    categoria: 'Categoría A',
    jugadores_count: 15,
    grupo: 'A'
  },
  {
    id: 2,
    nombre: 'Águilas FC',
    logo: 'https://via.placeholder.com/150/00BCD4/FFFFFF?text=AF',
    categoria: 'Categoría A',
    jugadores_count: 14,
    grupo: 'A'
  },
  {
    id: 3,
    nombre: 'Leones United',
    logo: 'https://via.placeholder.com/150/1A1A1A/FFFFFF?text=LU',
    categoria: 'Categoría A',
    jugadores_count: 16,
    grupo: 'B'
  },
  {
    id: 4,
    nombre: 'Halcones',
    logo: 'https://via.placeholder.com/150/87CEEB/1A1A1A?text=HC',
    categoria: 'Categoría B',
    jugadores_count: 13,
    grupo: 'B'
  },
  {
    id: 5,
    nombre: 'Panteras',
    logo: 'https://via.placeholder.com/150/40E0D0/1A1A1A?text=PT',
    categoria: 'Categoría B',
    jugadores_count: 15,
    grupo: 'A'
  },
  {
    id: 6,
    nombre: 'Dragones',
    logo: 'https://via.placeholder.com/150/004C99/FFFFFF?text=DG',
    categoria: 'Categoría A',
    jugadores_count: 14,
    grupo: 'B'
  }
]

export const jugadoresMock: Jugador[] = [
  {
    id: 1,
    nombre: 'Carlos Martínez',
    numero: 10,
    equipo_id: 1,
    equipo_nombre: 'Los Tigres',
    foto: 'https://i.pravatar.cc/150?img=12',
    posicion: 'Delantero',
    goles: 12
  },
  {
    id: 2,
    nombre: 'Jorge Ramírez',
    numero: 9,
    equipo_id: 2,
    equipo_nombre: 'Águilas FC',
    foto: 'https://i.pravatar.cc/150?img=13',
    posicion: 'Delantero',
    goles: 10
  },
  {
    id: 3,
    nombre: 'Miguel Ángel López',
    numero: 7,
    equipo_id: 3,
    equipo_nombre: 'Leones United',
    foto: 'https://i.pravatar.cc/150?img=14',
    posicion: 'Delantero',
    goles: 9
  },
  {
    id: 4,
    nombre: 'Roberto García',
    numero: 11,
    equipo_id: 1,
    equipo_nombre: 'Los Tigres',
    foto: 'https://i.pravatar.cc/150?img=15',
    posicion: 'Mediocampista',
    goles: 8
  },
  {
    id: 5,
    nombre: 'Fernando Silva',
    numero: 8,
    equipo_id: 4,
    equipo_nombre: 'Halcones',
    foto: 'https://i.pravatar.cc/150?img=33',
    posicion: 'Delantero',
    goles: 7
  },
  {
    id: 6,
    nombre: 'Diego Morales',
    numero: 10,
    equipo_id: 5,
    equipo_nombre: 'Panteras',
    foto: 'https://i.pravatar.cc/150?img=51',
    posicion: 'Delantero',
    goles: 7
  },
  {
    id: 7,
    nombre: 'Andrés Sánchez',
    numero: 9,
    equipo_id: 6,
    equipo_nombre: 'Dragones',
    foto: 'https://i.pravatar.cc/150?img=68',
    posicion: 'Delantero',
    goles: 6
  },
  {
    id: 8,
    nombre: 'Luis Hernández',
    numero: 7,
    equipo_id: 2,
    equipo_nombre: 'Águilas FC',
    foto: 'https://i.pravatar.cc/150?img=56',
    posicion: 'Mediocampista',
    goles: 5
  }
]

export const partidosMock: Partido[] = [
  {
    id: 1,
    equipo_local_id: 1,
    equipo_local: 'Los Tigres',
    logo_local: 'https://via.placeholder.com/80/0066CC/FFFFFF?text=LT',
    equipo_visitante_id: 2,
    equipo_visitante: 'Águilas FC',
    logo_visitante: 'https://via.placeholder.com/80/00BCD4/FFFFFF?text=AF',
    goles_local: 3,
    goles_visitante: 2,
    fecha: '15 Ene 2026',
    hora: '16:00',
    estado: 'finalizado',
    grupo: 'A'
  },
  {
    id: 2,
    equipo_local_id: 3,
    equipo_local: 'Leones United',
    logo_local: 'https://via.placeholder.com/80/1A1A1A/FFFFFF?text=LU',
    equipo_visitante_id: 4,
    equipo_visitante: 'Halcones',
    logo_visitante: 'https://via.placeholder.com/80/87CEEB/1A1A1A?text=HC',
    goles_local: 1,
    goles_visitante: 1,
    fecha: '15 Ene 2026',
    hora: '18:00',
    estado: 'finalizado',
    grupo: 'B'
  },
  {
    id: 3,
    equipo_local_id: 5,
    equipo_local: 'Panteras',
    logo_local: 'https://via.placeholder.com/80/40E0D0/1A1A1A?text=PT',
    equipo_visitante_id: 1,
    equipo_visitante: 'Los Tigres',
    logo_visitante: 'https://via.placeholder.com/80/0066CC/FFFFFF?text=LT',
    goles_local: 2,
    goles_visitante: 4,
    fecha: '18 Ene 2026',
    hora: '16:00',
    estado: 'finalizado',
    grupo: 'A'
  },
  {
    id: 4,
    equipo_local_id: 6,
    equipo_local: 'Dragones',
    logo_local: 'https://via.placeholder.com/80/004C99/FFFFFF?text=DG',
    equipo_visitante_id: 3,
    equipo_visitante: 'Leones United',
    logo_visitante: 'https://via.placeholder.com/80/1A1A1A/FFFFFF?text=LU',
    goles_local: 1,
    goles_visitante: 2,
    fecha: '18 Ene 2026',
    hora: '18:00',
    estado: 'en-curso',
    grupo: 'B'
  },
  {
    id: 5,
    equipo_local_id: 2,
    equipo_local: 'Águilas FC',
    logo_local: 'https://via.placeholder.com/80/00BCD4/FFFFFF?text=AF',
    equipo_visitante_id: 5,
    equipo_visitante: 'Panteras',
    logo_visitante: 'https://via.placeholder.com/80/40E0D0/1A1A1A?text=PT',
    goles_local: null,
    goles_visitante: null,
    fecha: '20 Ene 2026',
    hora: '16:00',
    estado: 'programado',
    grupo: 'A'
  },
  {
    id: 6,
    equipo_local_id: 4,
    equipo_local: 'Halcones',
    logo_local: 'https://via.placeholder.com/80/87CEEB/1A1A1A?text=HC',
    equipo_visitante_id: 6,
    equipo_visitante: 'Dragones',
    logo_visitante: 'https://via.placeholder.com/80/004C99/FFFFFF?text=DG',
    goles_local: null,
    goles_visitante: null,
    fecha: '20 Ene 2026',
    hora: '18:00',
    estado: 'programado',
    grupo: 'B'
  }
]

export const posicionesMock: Posicion[] = [
  {
    id: 1,
    equipo_id: 1,
    equipo: 'Los Tigres',
    logo: 'https://via.placeholder.com/50/0066CC/FFFFFF?text=LT',
    grupo: 'A',
    partidos_jugados: 2,
    ganados: 2,
    empatados: 0,
    perdidos: 0,
    goles_favor: 7,
    goles_contra: 4,
    diferencia_goles: 3,
    puntos: 6
  },
  {
    id: 2,
    equipo_id: 2,
    equipo: 'Águilas FC',
    logo: 'https://via.placeholder.com/50/00BCD4/FFFFFF?text=AF',
    grupo: 'A',
    partidos_jugados: 1,
    ganados: 0,
    empatados: 0,
    perdidos: 1,
    goles_favor: 2,
    goles_contra: 3,
    diferencia_goles: -1,
    puntos: 0
  },
  {
    id: 3,
    equipo_id: 5,
    equipo: 'Panteras',
    logo: 'https://via.placeholder.com/50/40E0D0/1A1A1A?text=PT',
    grupo: 'A',
    partidos_jugados: 1,
    ganados: 0,
    empatados: 0,
    perdidos: 1,
    goles_favor: 2,
    goles_contra: 4,
    diferencia_goles: -2,
    puntos: 0
  },
  {
    id: 4,
    equipo_id: 3,
    equipo: 'Leones United',
    logo: 'https://via.placeholder.com/50/1A1A1A/FFFFFF?text=LU',
    grupo: 'B',
    partidos_jugados: 2,
    ganados: 1,
    empatados: 1,
    perdidos: 0,
    goles_favor: 3,
    goles_contra: 2,
    diferencia_goles: 1,
    puntos: 4
  },
  {
    id: 5,
    equipo_id: 4,
    equipo: 'Halcones',
    logo: 'https://via.placeholder.com/50/87CEEB/1A1A1A?text=HC',
    grupo: 'B',
    partidos_jugados: 1,
    ganados: 0,
    empatados: 1,
    perdidos: 0,
    goles_favor: 1,
    goles_contra: 1,
    diferencia_goles: 0,
    puntos: 1
  },
  {
    id: 6,
    equipo_id: 6,
    equipo: 'Dragones',
    logo: 'https://via.placeholder.com/50/004C99/FFFFFF?text=DG',
    grupo: 'B',
    partidos_jugados: 1,
    ganados: 0,
    empatados: 0,
    perdidos: 1,
    goles_favor: 1,
    goles_contra: 2,
    diferencia_goles: -1,
    puntos: 0
  }
]

export const noticiasMock: Noticia[] = [
  {
    id: 1,
    titulo: '¡Arranca el Torneo de Ex Alumnos 2026!',
    contenido: 'Con gran entusiasmo damos inicio a la nueva edición del torneo. Seis equipos competirán por el título en un ambiente de sana competencia y camaradería.',
    imagen: 'https://via.placeholder.com/400x250/0066CC/FFFFFF?text=Torneo+2026',
    fecha: '10 Ene 2026',
    categoria: 'Torneo'
  },
  {
    id: 2,
    titulo: 'Los Tigres dominan en la primera jornada',
    contenido: 'El equipo campeón demuestra por qué ostenta el título con una victoria convincente 3-2 sobre Águilas FC en un partido lleno de emociones.',
    imagen: 'https://via.placeholder.com/400x250/00BCD4/FFFFFF?text=Victoria',
    fecha: '15 Ene 2026',
    categoria: 'Resultados'
  },
  {
    id: 3,
    titulo: 'Carlos Martínez lidera la tabla de goleadores',
    contenido: 'El delantero de Los Tigres se consolida como el máximo artillero del torneo con 12 goles, demostrando su excelente forma física.',
    imagen: 'https://via.placeholder.com/400x250/40E0D0/1A1A1A?text=Goleador',
    fecha: '18 Ene 2026',
    categoria: 'Jugadores'
  },
  {
    id: 4,
    titulo: 'Empate emocionante entre Leones y Halcones',
    contenido: 'En un partido muy disputado, ambos equipos repartieron puntos con un 1-1 que mantiene viva la competencia en el Grupo B.',
    imagen: 'https://via.placeholder.com/400x250/87CEEB/1A1A1A?text=Empate',
    fecha: '16 Ene 2026',
    categoria: 'Resultados'
  },
  {
    id: 5,
    titulo: 'Próxima fecha promete grandes emociones',
    contenido: 'La jornada del 20 de enero tendrá enfrentamientos clave que podrían definir a los líderes de cada grupo.',
    imagen: 'https://via.placeholder.com/400x250/004C99/FFFFFF?text=Próxima+Fecha',
    fecha: '19 Ene 2026',
    categoria: 'Torneo'
  },
  {
    id: 6,
    titulo: 'Fair Play: El espíritu del torneo',
    contenido: 'Destacamos el comportamiento ejemplar de todos los equipos, manteniendo el respeto y la deportividad en cada partido.',
    imagen: 'https://via.placeholder.com/400x250/1A1A1A/FFFFFF?text=Fair+Play',
    fecha: '17 Ene 2026',
    categoria: 'Torneo'
  }
]

/* 
  ========================================
  INTEGRACIÓN CON SUPABASE
  ========================================
  
  Pasos para integrar con tu base de datos:
  
  1. Instalar dependencia:
     npm install @supabase/supabase-js
  
  2. Crear archivo lib/supabase.ts:
  
  import { createClient } from '@supabase/supabase-js'
  
  export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  3. Configurar variables de entorno (.env.local):
     NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
  
  ========================================
  EJEMPLOS DE CONSULTAS
  ========================================
  
  // OBTENER EQUIPOS
  export async function getEquipos() {
    const { data, error } = await supabase
      .from('equipos')
      .select('id, nombre, grupo, logo_url, entrenador')
      .order('nombre')
    
    if (error) throw error
    return data
  }
  
  // OBTENER JUGADORES CON INFO DE EQUIPO
  export async function getJugadores() {
    const { data, error } = await supabase
      .from('jugadores')
      .select(`
        id,
        nombre,
        dorsal,
        foto_url,
        posicion,
        equipos (
          nombre,
          logo_url
        )
      `)
      .order('nombre')
    
    if (error) throw error
    return data
  }
  
  // OBTENER GOLEADORES (con conteo de goles)
  export async function getGoleadores() {
    const { data, error } = await supabase
      .rpc('get_goleadores') // Ver función SQL más abajo
    
    if (error) throw error
    return data
  }
  
  // OBTENER PARTIDOS CON EQUIPOS
  export async function getPartidos(filtroEstado?: string) {
    let query = supabase
      .from('partidos')
      .select(`
        id,
        fecha,
        hora,
        grupo,
        goles_local,
        goles_visitante,
        estado,
        cancha,
        equipo_local:equipos!equipo_local_id (
          nombre,
          logo_url
        ),
        equipo_visitante:equipos!equipo_visitante_id (
          nombre,
          logo_url
        )
      `)
      .order('fecha', { ascending: false })
    
    if (filtroEstado) {
      query = query.eq('estado', filtroEstado)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }
  
  // OBTENER POSICIONES (si usas tabla precalculada)
  export async function getPosiciones(grupo?: string) {
    let query = supabase
      .from('posiciones')
      .select(`
        *,
        equipos (
          nombre,
          logo_url
        )
      `)
      .order('pts', { ascending: false })
      .order('gf', { ascending: false })
    
    if (grupo) {
      query = query.eq('grupo', grupo)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }
  
  // OBTENER NOTICIAS
  export async function getNoticias(limite?: number) {
    let query = supabase
      .from('noticias')
      .select('*')
      .order('fecha', { ascending: false })
    
    if (limite) {
      query = query.limit(limite)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }
  
  ========================================
  FUNCIONES SQL EN SUPABASE (Opcional)
  ========================================
  
  Para calcular goleadores automáticamente, crea esta función en el SQL Editor de Supabase:
  
  CREATE OR REPLACE FUNCTION get_goleadores()
  RETURNS TABLE (
    jugador_id uuid,
    nombre text,
    dorsal int,
    foto_url text,
    equipo_nombre text,
    equipo_logo text,
    total_goles bigint
  ) AS $$
  BEGIN
    RETURN QUERY
    SELECT 
      j.id as jugador_id,
      j.nombre,
      j.dorsal,
      j.foto_url,
      e.nombre as equipo_nombre,
      e.logo_url as equipo_logo,
      COUNT(g.id) as total_goles
    FROM jugadores j
    LEFT JOIN goles_jugadores g ON j.id = g.jugador_id
    LEFT JOIN equipos e ON j.equipo_id = e.id
    GROUP BY j.id, j.nombre, j.dorsal, j.foto_url, e.nombre, e.logo_url
    HAVING COUNT(g.id) > 0
    ORDER BY total_goles DESC, j.nombre;
  END;
  $$ LANGUAGE plpgsql;
  
  ========================================
  POLÍTICAS DE SEGURIDAD (RLS)
  ========================================
  
  Para habilitar acceso público de lectura (ideal para un sitio web):
  
  -- Habilitar RLS en todas las tablas
  ALTER TABLE equipos ENABLE ROW LEVEL SECURITY;
  ALTER TABLE jugadores ENABLE ROW LEVEL SECURITY;
  ALTER TABLE partidos ENABLE ROW LEVEL SECURITY;
  ALTER TABLE goles_jugadores ENABLE ROW LEVEL SECURITY;
  ALTER TABLE posiciones ENABLE ROW LEVEL SECURITY;
  ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;
  
  -- Permitir lectura pública
  CREATE POLICY "Permitir lectura pública" ON equipos FOR SELECT USING (true);
  CREATE POLICY "Permitir lectura pública" ON jugadores FOR SELECT USING (true);
  CREATE POLICY "Permitir lectura pública" ON partidos FOR SELECT USING (true);
  CREATE POLICY "Permitir lectura pública" ON goles_jugadores FOR SELECT USING (true);
  CREATE POLICY "Permitir lectura pública" ON posiciones FOR SELECT USING (true);
  CREATE POLICY "Permitir lectura pública" ON noticias FOR SELECT USING (true);
  
  ========================================
  STORAGE PARA IMÁGENES
  ========================================
  
  1. Crear un bucket público llamado "imagenes" en Supabase Storage
  2. Crear carpetas: logos/, jugadores/, noticias/
  3. Subir imágenes y obtener URL pública
  4. Guardar URL en logo_url, foto_url, imagen_url según corresponda
  
*/

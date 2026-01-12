import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

type ResponseData = {
  success: boolean
  message: string
  errors?: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' })
  }

  // Opcional: Validar un token secreto para evitar que cualquiera ejecute esto
  const { secret } = req.body
  if (secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ success: false, message: 'No autorizado' })
  }

  const errors: any[] = []

  try {
    // 1. EQUIPOS
    const { error: errorEquipos } = await supabase.from('equipos').insert([
      { nombre: 'Los Titanes', grupo: 'A', logo_url: 'https://api.dicebear.com/7.x/shapes/svg?seed=titanes', entrenador: 'Carlos Méndez' },
      { nombre: 'Águilas FC', grupo: 'A', logo_url: 'https://api.dicebear.com/7.x/shapes/svg?seed=aguilas', entrenador: 'Roberto Silva' },
      { nombre: 'Leones United', grupo: 'A', logo_url: 'https://api.dicebear.com/7.x/shapes/svg?seed=leones', entrenador: 'Diego Vargas' },
      { nombre: 'Dragones FC', grupo: 'B', logo_url: 'https://api.dicebear.com/7.x/shapes/svg?seed=dragones', entrenador: 'Miguel Ángel Torres' },
      { nombre: 'Halcones', grupo: 'B', logo_url: 'https://api.dicebear.com/7.x/shapes/svg?seed=halcones', entrenador: 'Fernando López' },
      { nombre: 'Pumas FC', grupo: 'B', logo_url: 'https://api.dicebear.com/7.x/shapes/svg?seed=pumas', entrenador: 'Javier Ramírez' }
    ])
    if (errorEquipos) errors.push({ tabla: 'equipos', error: errorEquipos })

    // Obtener IDs de equipos
    const { data: equipos } = await supabase.from('equipos').select('id, nombre')
    const equiposMap = new Map(equipos?.map(e => [e.nombre, e.id]))

    // 2. JUGADORES
    const jugadores = [
      // Los Titanes
      { equipo_id: equiposMap.get('Los Titanes'), nombre: 'Juan Pérez', dorsal: 10, foto_url: 'https://i.pravatar.cc/150?img=12', posicion: 'Delantero' },
      { equipo_id: equiposMap.get('Los Titanes'), nombre: 'Carlos Gómez', dorsal: 9, foto_url: 'https://i.pravatar.cc/150?img=13', posicion: 'Delantero' },
      { equipo_id: equiposMap.get('Los Titanes'), nombre: 'Luis Martínez', dorsal: 7, foto_url: 'https://i.pravatar.cc/150?img=14', posicion: 'Mediocampista' },
      // Águilas FC
      { equipo_id: equiposMap.get('Águilas FC'), nombre: 'Miguel Ángel Rodríguez', dorsal: 11, foto_url: 'https://i.pravatar.cc/150?img=15', posicion: 'Delantero' },
      { equipo_id: equiposMap.get('Águilas FC'), nombre: 'Pedro Sánchez', dorsal: 8, foto_url: 'https://i.pravatar.cc/150?img=16', posicion: 'Mediocampista' },
      // Leones United
      { equipo_id: equiposMap.get('Leones United'), nombre: 'Roberto Torres', dorsal: 9, foto_url: 'https://i.pravatar.cc/150?img=17', posicion: 'Delantero' },
      { equipo_id: equiposMap.get('Leones United'), nombre: 'Diego Hernández', dorsal: 10, foto_url: 'https://i.pravatar.cc/150?img=18', posicion: 'Delantero' },
      // Dragones FC
      { equipo_id: equiposMap.get('Dragones FC'), nombre: 'Fernando López', dorsal: 7, foto_url: 'https://i.pravatar.cc/150?img=19', posicion: 'Delantero' },
      // Halcones
      { equipo_id: equiposMap.get('Halcones'), nombre: 'Javier Ramírez', dorsal: 9, foto_url: 'https://i.pravatar.cc/150?img=20', posicion: 'Delantero' },
      // Pumas FC
      { equipo_id: equiposMap.get('Pumas FC'), nombre: 'Andrés Silva', dorsal: 11, foto_url: 'https://i.pravatar.cc/150?img=21', posicion: 'Delantero' }
    ]
    const { error: errorJugadores } = await supabase.from('jugadores').insert(jugadores)
    if (errorJugadores) errors.push({ tabla: 'jugadores', error: errorJugadores })

    // 3. PARTIDOS
    const partidos = [
      // Grupo A - Finalizados
      { fecha: '2026-01-05', hora: '15:00', grupo: 'A', equipo_local_id: equiposMap.get('Los Titanes'), equipo_visitante_id: equiposMap.get('Águilas FC'), goles_local: 3, goles_visitante: 2, estado: 'finalizado', cancha: 'Cancha Principal' },
      { fecha: '2026-01-06', hora: '16:00', grupo: 'A', equipo_local_id: equiposMap.get('Leones United'), equipo_visitante_id: equiposMap.get('Los Titanes'), goles_local: 1, goles_visitante: 1, estado: 'finalizado', cancha: 'Cancha 2' },
      { fecha: '2026-01-07', hora: '17:00', grupo: 'A', equipo_local_id: equiposMap.get('Águilas FC'), equipo_visitante_id: equiposMap.get('Leones United'), goles_local: 2, goles_visitante: 0, estado: 'finalizado', cancha: 'Cancha Principal' },
      // Grupo B - Finalizados
      { fecha: '2026-01-05', hora: '18:00', grupo: 'B', equipo_local_id: equiposMap.get('Dragones FC'), equipo_visitante_id: equiposMap.get('Halcones'), goles_local: 2, goles_visitante: 1, estado: 'finalizado', cancha: 'Cancha 2' },
      { fecha: '2026-01-06', hora: '19:00', grupo: 'B', equipo_local_id: equiposMap.get('Pumas FC'), equipo_visitante_id: equiposMap.get('Dragones FC'), goles_local: 0, goles_visitante: 2, estado: 'finalizado', cancha: 'Cancha Principal' },
      // Próximos partidos
      { fecha: '2026-01-15', hora: '15:00', grupo: 'A', equipo_local_id: equiposMap.get('Los Titanes'), equipo_visitante_id: equiposMap.get('Leones United'), goles_local: null, goles_visitante: null, estado: 'programado', cancha: 'Cancha Principal' },
      { fecha: '2026-01-16', hora: '16:00', grupo: 'B', equipo_local_id: equiposMap.get('Halcones'), equipo_visitante_id: equiposMap.get('Pumas FC'), goles_local: null, goles_visitante: null, estado: 'programado', cancha: 'Cancha 2' },
      { fecha: '2026-01-17', hora: '17:00', grupo: 'A', equipo_local_id: equiposMap.get('Águilas FC'), equipo_visitante_id: equiposMap.get('Los Titanes'), goles_local: null, goles_visitante: null, estado: 'programado', cancha: 'Cancha Principal' }
    ]
    const { error: errorPartidos } = await supabase.from('partidos').insert(partidos)
    if (errorPartidos) errors.push({ tabla: 'partidos', error: errorPartidos })

    // 4. POSICIONES
    const posiciones = [
      // Grupo A
      { equipo_id: equiposMap.get('Los Titanes'), grupo: 'A', pj: 2, pg: 1, pe: 1, pp: 0, gf: 4, gc: 3, pts: 4 },
      { equipo_id: equiposMap.get('Águilas FC'), grupo: 'A', pj: 2, pg: 1, pe: 0, pp: 1, gf: 4, gc: 3, pts: 3 },
      { equipo_id: equiposMap.get('Leones United'), grupo: 'A', pj: 2, pg: 1, pe: 1, pp: 0, gf: 1, gc: 3, pts: 4 },
      // Grupo B
      { equipo_id: equiposMap.get('Dragones FC'), grupo: 'B', pj: 2, pg: 2, pe: 0, pp: 0, gf: 4, gc: 1, pts: 6 },
      { equipo_id: equiposMap.get('Halcones'), grupo: 'B', pj: 1, pg: 0, pe: 0, pp: 1, gf: 1, gc: 2, pts: 0 },
      { equipo_id: equiposMap.get('Pumas FC'), grupo: 'B', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, pts: 0 }
    ]
    const { error: errorPosiciones } = await supabase.from('posiciones').insert(posiciones)
    if (errorPosiciones) errors.push({ tabla: 'posiciones', error: errorPosiciones })

    // 5. OBTENER IDs DE PARTIDOS Y JUGADORES PARA GOLES
    const { data: partidosData } = await supabase.from('partidos').select('id, fecha, grupo').order('fecha')
    const { data: jugadoresData } = await supabase.from('jugadores').select('id, nombre, equipo_id')
    
    const jugadoresMap = new Map(jugadoresData?.map(j => [j.nombre, j]))
    const getPartidoId = (fecha: string, grupo: string) => partidosData?.find(p => p.fecha === fecha && p.grupo === grupo)?.id

    // Goles
    const goles = [
      // Partido 1: Titanes 3-2 Águilas
      { partido_id: getPartidoId('2026-01-05', 'A'), jugador_id: jugadoresMap.get('Juan Pérez')?.id, equipo_id: equiposMap.get('Los Titanes'), minuto: 15 },
      { partido_id: getPartidoId('2026-01-05', 'A'), jugador_id: jugadoresMap.get('Juan Pérez')?.id, equipo_id: equiposMap.get('Los Titanes'), minuto: 45 },
      { partido_id: getPartidoId('2026-01-05', 'A'), jugador_id: jugadoresMap.get('Carlos Gómez')?.id, equipo_id: equiposMap.get('Los Titanes'), minuto: 78 },
      { partido_id: getPartidoId('2026-01-05', 'A'), jugador_id: jugadoresMap.get('Miguel Ángel Rodríguez')?.id, equipo_id: equiposMap.get('Águilas FC'), minuto: 30 },
      { partido_id: getPartidoId('2026-01-05', 'A'), jugador_id: jugadoresMap.get('Pedro Sánchez')?.id, equipo_id: equiposMap.get('Águilas FC'), minuto: 65 },
      // Partido 2: Leones 1-1 Titanes
      { partido_id: getPartidoId('2026-01-06', 'A'), jugador_id: jugadoresMap.get('Roberto Torres')?.id, equipo_id: equiposMap.get('Leones United'), minuto: 25 },
      { partido_id: getPartidoId('2026-01-06', 'A'), jugador_id: jugadoresMap.get('Juan Pérez')?.id, equipo_id: equiposMap.get('Los Titanes'), minuto: 60 },
      // Partido 3: Águilas 2-0 Leones
      { partido_id: getPartidoId('2026-01-07', 'A'), jugador_id: jugadoresMap.get('Miguel Ángel Rodríguez')?.id, equipo_id: equiposMap.get('Águilas FC'), minuto: 20 },
      { partido_id: getPartidoId('2026-01-07', 'A'), jugador_id: jugadoresMap.get('Pedro Sánchez')?.id, equipo_id: equiposMap.get('Águilas FC'), minuto: 55 },
      // Partido 4: Dragones 2-1 Halcones
      { partido_id: getPartidoId('2026-01-05', 'B'), jugador_id: jugadoresMap.get('Fernando López')?.id, equipo_id: equiposMap.get('Dragones FC'), minuto: 10 },
      { partido_id: getPartidoId('2026-01-05', 'B'), jugador_id: jugadoresMap.get('Fernando López')?.id, equipo_id: equiposMap.get('Dragones FC'), minuto: 70 },
      // Partido 5: Pumas 0-2 Dragones
      { partido_id: getPartidoId('2026-01-06', 'B'), jugador_id: jugadoresMap.get('Fernando López')?.id, equipo_id: equiposMap.get('Dragones FC'), minuto: 35 },
      { partido_id: getPartidoId('2026-01-06', 'B'), jugador_id: jugadoresMap.get('Fernando López')?.id, equipo_id: equiposMap.get('Dragones FC'), minuto: 80 }
    ]
    const { error: errorGoles } = await supabase.from('goles_jugadores').insert(goles)
    if (errorGoles) errors.push({ tabla: 'goles_jugadores', error: errorGoles })

    // 6. NOTICIAS
    const noticias = [
      { titulo: '¡Arrancó el Torneo Ex Alumnos 2026!', contenido: 'Con gran entusiasmo y emoción, dio inicio el esperado Torneo de Ex Alumnos 2026. Los equipos se enfrentaron en una jornada inolvidable llena de goles y jugadas espectaculares.', fecha: '2026-01-05', imagen_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop', categoria: 'Torneo' },
      { titulo: 'Fernando López lidera la tabla de goleadores', contenido: 'El delantero de Dragones FC, Fernando López, se ha convertido en el máximo artillero del torneo con impresionantes actuaciones en los primeros partidos.', fecha: '2026-01-08', imagen_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=500&fit=crop', categoria: 'Jugadores' },
      { titulo: 'Dragones FC invicto en el Grupo B', contenido: 'El equipo dirigido por Miguel Ángel Torres mantiene un récord perfecto con dos victorias consecutivas y se perfila como el favorito de su grupo.', fecha: '2026-01-09', imagen_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop', categoria: 'Equipos' },
      { titulo: 'Próxima jornada: Partidos imperdibles', contenido: 'Este fin de semana se disputarán encuentros decisivos que podrían definir a los clasificados. No te pierdas el enfrentamiento entre Titanes y Leones.', fecha: '2026-01-10', imagen_url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop', categoria: 'Torneo' },
      { titulo: 'Juan Pérez: "Queremos llegar a la final"', contenido: 'El capitán de Los Titanes habló sobre las expectativas del equipo y su objetivo de conquistar el campeonato en esta edición del torneo.', fecha: '2026-01-11', imagen_url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=500&fit=crop', categoria: 'Jugadores' },
      { titulo: 'Cambios en el fixture por condiciones climáticas', contenido: 'La organización anunció modificaciones en el calendario debido a las condiciones climáticas previstas para la próxima semana.', fecha: '2026-01-12', imagen_url: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=500&fit=crop', categoria: 'Torneo' }
    ]
    const { error: errorNoticias } = await supabase.from('noticias').insert(noticias)
    if (errorNoticias) errors.push({ tabla: 'noticias', error: errorNoticias })

    if (errors.length > 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'Se completó con algunos errores', 
        errors 
      })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Base de datos cargada exitosamente con datos de ejemplo' 
    })

  } catch (error) {
    console.error('Error en seed:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos',
      errors: [error]
    })
  }
}

import { supabase } from './supabase'

// ========================================
// EQUIPOS
// ========================================
export async function getEquipos() {
  const { data, error } = await supabase
    .from('equipos')
    .select('*')
    .order('nombre')
  
  if (error) {
    console.error('Error obteniendo equipos:', error)
    return []
  }
  return data || []
}

// ========================================
// PARTIDOS
// ========================================
export async function getPartidos() {
  const { data, error } = await supabase
    .from('partidos')
    .select(`
      *,
      equipo_local:equipos!equipo_local_id(nombre, logo_url),
      equipo_visitante:equipos!equipo_visitante_id(nombre, logo_url)
    `)
    .order('fecha', { ascending: false })
  
  if (error) {
    console.error('Error obteniendo partidos:', error)
    return []
  }
  return data || []
}

// ========================================
// POSICIONES
// ========================================
export async function getPosiciones() {
  const { data, error } = await supabase
    .from('posiciones')
    .select(`
      *,
      equipos(nombre, logo_url)
    `)
    .order('pts', { ascending: false })
    .order('gf', { ascending: false })
  
  if (error) {
    console.error('Error obteniendo posiciones:', error)
    return []
  }
  return data || []
}

// ========================================
// GOLEADORES
// ========================================
export async function getGoleadores() {
  // Intentar usar la función SQL si existe
  const { data: dataRpc, error: errorRpc } = await supabase.rpc('get_goleadores')
  
  if (!errorRpc && dataRpc) {
    return dataRpc
  }
  
  // Fallback: consulta manual
  const { data, error } = await supabase
    .from('jugadores')
    .select(`
      *,
      equipos(nombre, logo_url)
    `)
  
  if (error) {
    console.error('Error obteniendo jugadores:', error)
    return []
  }
  
  return data || []
}

// ========================================
// NOTICIAS
// ========================================
export async function getNoticias() {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .order('fecha', { ascending: false })
  
  if (error) {
    console.error('Error obteniendo noticias:', error)
    return []
  }
  return data || []
}

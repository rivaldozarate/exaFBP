-- ========================================
-- SEED DATA PARA TORNEO EX ALUMNOS 2026
-- ========================================
-- Ejecuta este SQL en tu panel de Supabase > SQL Editor

-- 1. EQUIPOS
INSERT INTO equipos (nombre, grupo, logo_url, entrenador) VALUES
('Los Titanes', 'A', 'https://api.dicebear.com/7.x/shapes/svg?seed=titanes', 'Carlos Méndez'),
('Águilas FC', 'A', 'https://api.dicebear.com/7.x/shapes/svg?seed=aguilas', 'Roberto Silva'),
('Leones United', 'A', 'https://api.dicebear.com/7.x/shapes/svg?seed=leones', 'Diego Vargas'),
('Dragones FC', 'B', 'https://api.dicebear.com/7.x/shapes/svg?seed=dragones', 'Miguel Ángel Torres'),
('Halcones', 'B', 'https://api.dicebear.com/7.x/shapes/svg?seed=halcones', 'Fernando López'),
('Pumas FC', 'B', 'https://api.dicebear.com/7.x/shapes/svg?seed=pumas', 'Javier Ramírez');

-- 2. JUGADORES (Obtener IDs de equipos primero)
DO $$
DECLARE
  equipo_titanes_id UUID;
  equipo_aguilas_id UUID;
  equipo_leones_id UUID;
  equipo_dragones_id UUID;
  equipo_halcones_id UUID;
  equipo_pumas_id UUID;
BEGIN
  -- Obtener IDs
  SELECT id INTO equipo_titanes_id FROM equipos WHERE nombre = 'Los Titanes';
  SELECT id INTO equipo_aguilas_id FROM equipos WHERE nombre = 'Águilas FC';
  SELECT id INTO equipo_leones_id FROM equipos WHERE nombre = 'Leones United';
  SELECT id INTO equipo_dragones_id FROM equipos WHERE nombre = 'Dragones FC';
  SELECT id INTO equipo_halcones_id FROM equipos WHERE nombre = 'Halcones';
  SELECT id INTO equipo_pumas_id FROM equipos WHERE nombre = 'Pumas FC';

  -- Jugadores Los Titanes
  INSERT INTO jugadores (equipo_id, nombre, dorsal, foto_url, posicion) VALUES
  (equipo_titanes_id, 'Juan Pérez', 10, 'https://i.pravatar.cc/150?img=12', 'Delantero'),
  (equipo_titanes_id, 'Carlos Gómez', 9, 'https://i.pravatar.cc/150?img=13', 'Delantero'),
  (equipo_titanes_id, 'Luis Martínez', 7, 'https://i.pravatar.cc/150?img=14', 'Mediocampista');

  -- Jugadores Águilas FC
  INSERT INTO jugadores (equipo_id, nombre, dorsal, foto_url, posicion) VALUES
  (equipo_aguilas_id, 'Miguel Ángel Rodríguez', 11, 'https://i.pravatar.cc/150?img=15', 'Delantero'),
  (equipo_aguilas_id, 'Pedro Sánchez', 8, 'https://i.pravatar.cc/150?img=16', 'Mediocampista');

  -- Jugadores Leones United
  INSERT INTO jugadores (equipo_id, nombre, dorsal, foto_url, posicion) VALUES
  (equipo_leones_id, 'Roberto Torres', 9, 'https://i.pravatar.cc/150?img=17', 'Delantero'),
  (equipo_leones_id, 'Diego Hernández', 10, 'https://i.pravatar.cc/150?img=18', 'Delantero');

  -- Jugadores Dragones FC
  INSERT INTO jugadores (equipo_id, nombre, dorsal, foto_url, posicion) VALUES
  (equipo_dragones_id, 'Fernando López', 7, 'https://i.pravatar.cc/150?img=19', 'Delantero');

  -- Jugadores Halcones
  INSERT INTO jugadores (equipo_id, nombre, dorsal, foto_url, posicion) VALUES
  (equipo_halcones_id, 'Javier Ramírez', 9, 'https://i.pravatar.cc/150?img=20', 'Delantero');

  -- Jugadores Pumas FC
  INSERT INTO jugadores (equipo_id, nombre, dorsal, foto_url, posicion) VALUES
  (equipo_pumas_id, 'Andrés Silva', 11, 'https://i.pravatar.cc/150?img=21', 'Delantero');
END $$;

-- 3. PARTIDOS
DO $$
DECLARE
  equipo_titanes_id UUID;
  equipo_aguilas_id UUID;
  equipo_leones_id UUID;
  equipo_dragones_id UUID;
  equipo_halcones_id UUID;
  equipo_pumas_id UUID;
BEGIN
  -- Obtener IDs
  SELECT id INTO equipo_titanes_id FROM equipos WHERE nombre = 'Los Titanes';
  SELECT id INTO equipo_aguilas_id FROM equipos WHERE nombre = 'Águilas FC';
  SELECT id INTO equipo_leones_id FROM equipos WHERE nombre = 'Leones United';
  SELECT id INTO equipo_dragones_id FROM equipos WHERE nombre = 'Dragones FC';
  SELECT id INTO equipo_halcones_id FROM equipos WHERE nombre = 'Halcones';
  SELECT id INTO equipo_pumas_id FROM equipos WHERE nombre = 'Pumas FC';

  -- Partidos Grupo A - Finalizados
  INSERT INTO partidos (fecha, hora, grupo, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, estado, cancha) VALUES
  ('2026-01-05', '15:00', 'A', equipo_titanes_id, equipo_aguilas_id, 3, 2, 'finalizado', 'Cancha Principal'),
  ('2026-01-06', '16:00', 'A', equipo_leones_id, equipo_titanes_id, 1, 1, 'finalizado', 'Cancha 2'),
  ('2026-01-07', '17:00', 'A', equipo_aguilas_id, equipo_leones_id, 2, 0, 'finalizado', 'Cancha Principal');

  -- Partidos Grupo B - Finalizados
  INSERT INTO partidos (fecha, hora, grupo, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, estado, cancha) VALUES
  ('2026-01-05', '18:00', 'B', equipo_dragones_id, equipo_halcones_id, 2, 1, 'finalizado', 'Cancha 2'),
  ('2026-01-06', '19:00', 'B', equipo_pumas_id, equipo_dragones_id, 0, 2, 'finalizado', 'Cancha Principal');

  -- Partidos Próximos - Programados
  INSERT INTO partidos (fecha, hora, grupo, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, estado, cancha) VALUES
  ('2026-01-15', '15:00', 'A', equipo_titanes_id, equipo_leones_id, NULL, NULL, 'programado', 'Cancha Principal'),
  ('2026-01-16', '16:00', 'B', equipo_halcones_id, equipo_pumas_id, NULL, NULL, 'programado', 'Cancha 2'),
  ('2026-01-17', '17:00', 'A', equipo_aguilas_id, equipo_titanes_id, NULL, NULL, 'programado', 'Cancha Principal');
END $$;

-- 4. POSICIONES (Calculadas manualmente por ahora)
DO $$
DECLARE
  equipo_titanes_id UUID;
  equipo_aguilas_id UUID;
  equipo_leones_id UUID;
  equipo_dragones_id UUID;
  equipo_halcones_id UUID;
  equipo_pumas_id UUID;
BEGIN
  -- Obtener IDs
  SELECT id INTO equipo_titanes_id FROM equipos WHERE nombre = 'Los Titanes';
  SELECT id INTO equipo_aguilas_id FROM equipos WHERE nombre = 'Águilas FC';
  SELECT id INTO equipo_leones_id FROM equipos WHERE nombre = 'Leones United';
  SELECT id INTO equipo_dragones_id FROM equipos WHERE nombre = 'Dragones FC';
  SELECT id INTO equipo_halcones_id FROM equipos WHERE nombre = 'Halcones';
  SELECT id INTO equipo_pumas_id FROM equipos WHERE nombre = 'Pumas FC';

  -- Grupo A
  INSERT INTO posiciones (equipo_id, grupo, pj, pg, pe, pp, gf, gc, pts) VALUES
  (equipo_titanes_id, 'A', 2, 1, 1, 0, 4, 3, 4),   -- 1 G, 1 E = 4 pts
  (equipo_aguilas_id, 'A', 2, 1, 0, 1, 4, 3, 3),   -- 1 G, 1 P = 3 pts
  (equipo_leones_id, 'A', 2, 1, 1, 0, 1, 3, 4);    -- 1 G, 1 E = 4 pts

  -- Grupo B
  INSERT INTO posiciones (equipo_id, grupo, pj, pg, pe, pp, gf, gc, pts) VALUES
  (equipo_dragones_id, 'B', 2, 2, 0, 0, 4, 1, 6),  -- 2 G = 6 pts
  (equipo_halcones_id, 'B', 1, 0, 0, 1, 1, 2, 0),  -- 1 P = 0 pts
  (equipo_pumas_id, 'B', 1, 0, 0, 1, 0, 2, 0);     -- 1 P = 0 pts
END $$;

-- 5. GOLES DE JUGADORES (para estadísticas de goleadores)
DO $$
DECLARE
  partido_1_id UUID;
  partido_2_id UUID;
  partido_3_id UUID;
  partido_4_id UUID;
  partido_5_id UUID;
  jugador_juan_id UUID;
  jugador_carlos_id UUID;
  jugador_miguel_id UUID;
  jugador_pedro_id UUID;
  jugador_roberto_id UUID;
  jugador_fernando_id UUID;
  equipo_titanes_id UUID;
  equipo_aguilas_id UUID;
  equipo_leones_id UUID;
  equipo_dragones_id UUID;
  equipo_halcones_id UUID;
BEGIN
  -- Obtener IDs de partidos (por fecha)
  SELECT id INTO partido_1_id FROM partidos WHERE fecha = '2026-01-05' AND grupo = 'A' LIMIT 1;
  SELECT id INTO partido_2_id FROM partidos WHERE fecha = '2026-01-06' AND grupo = 'A' LIMIT 1;
  SELECT id INTO partido_3_id FROM partidos WHERE fecha = '2026-01-07' LIMIT 1;
  SELECT id INTO partido_4_id FROM partidos WHERE fecha = '2026-01-05' AND grupo = 'B' LIMIT 1;
  SELECT id INTO partido_5_id FROM partidos WHERE fecha = '2026-01-06' AND grupo = 'B' LIMIT 1;

  -- Obtener IDs de equipos
  SELECT id INTO equipo_titanes_id FROM equipos WHERE nombre = 'Los Titanes';
  SELECT id INTO equipo_aguilas_id FROM equipos WHERE nombre = 'Águilas FC';
  SELECT id INTO equipo_leones_id FROM equipos WHERE nombre = 'Leones United';
  SELECT id INTO equipo_dragones_id FROM equipos WHERE nombre = 'Dragones FC';
  SELECT id INTO equipo_halcones_id FROM equipos WHERE nombre = 'Halcones';

  -- Obtener IDs de jugadores
  SELECT id INTO jugador_juan_id FROM jugadores WHERE nombre = 'Juan Pérez';
  SELECT id INTO jugador_carlos_id FROM jugadores WHERE nombre = 'Carlos Gómez';
  SELECT id INTO jugador_miguel_id FROM jugadores WHERE nombre = 'Miguel Ángel Rodríguez';
  SELECT id INTO jugador_pedro_id FROM jugadores WHERE nombre = 'Pedro Sánchez';
  SELECT id INTO jugador_roberto_id FROM jugadores WHERE nombre = 'Roberto Torres';
  SELECT id INTO jugador_fernando_id FROM jugadores WHERE nombre = 'Fernando López';

  -- Goles del partido 1: Titanes 3-2 Águilas
  INSERT INTO goles_jugadores (partido_id, jugador_id, equipo_id, minuto) VALUES
  (partido_1_id, jugador_juan_id, equipo_titanes_id, 15),
  (partido_1_id, jugador_juan_id, equipo_titanes_id, 45),
  (partido_1_id, jugador_carlos_id, equipo_titanes_id, 78),
  (partido_1_id, jugador_miguel_id, equipo_aguilas_id, 30),
  (partido_1_id, jugador_pedro_id, equipo_aguilas_id, 65);

  -- Goles del partido 2: Leones 1-1 Titanes
  INSERT INTO goles_jugadores (partido_id, jugador_id, equipo_id, minuto) VALUES
  (partido_2_id, jugador_roberto_id, equipo_leones_id, 25),
  (partido_2_id, jugador_juan_id, equipo_titanes_id, 60);

  -- Goles del partido 3: Águilas 2-0 Leones
  INSERT INTO goles_jugadores (partido_id, jugador_id, equipo_id, minuto) VALUES
  (partido_3_id, jugador_miguel_id, equipo_aguilas_id, 20),
  (partido_3_id, jugador_pedro_id, equipo_aguilas_id, 55);

  -- Goles del partido 4: Dragones 2-1 Halcones
  INSERT INTO goles_jugadores (partido_id, jugador_id, equipo_id, minuto) VALUES
  (partido_4_id, jugador_fernando_id, equipo_dragones_id, 10),
  (partido_4_id, jugador_fernando_id, equipo_dragones_id, 70);

  -- Goles del partido 5: Pumas 0-2 Dragones
  INSERT INTO goles_jugadores (partido_id, jugador_id, equipo_id, minuto) VALUES
  (partido_5_id, jugador_fernando_id, equipo_dragones_id, 35),
  (partido_5_id, jugador_fernando_id, equipo_dragones_id, 80);
END $$;

-- 6. NOTICIAS
INSERT INTO noticias (titulo, contenido, fecha, imagen_url, categoria) VALUES
('¡Arrancó el Torneo Ex Alumnos 2026!', 
 'Con gran entusiasmo y emoción, dio inicio el esperado Torneo de Ex Alumnos 2026. Los equipos se enfrentaron en una jornada inolvidable llena de goles y jugadas espectaculares.', 
 '2026-01-05', 
 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop', 
 'Torneo'),

('Fernando López lidera la tabla de goleadores', 
 'El delantero de Dragones FC, Fernando López, se ha convertido en el máximo artillero del torneo con impresionantes actuaciones en los primeros partidos.', 
 '2026-01-08', 
 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=500&fit=crop', 
 'Jugadores'),

('Dragones FC invicto en el Grupo B', 
 'El equipo dirigido por Miguel Ángel Torres mantiene un récord perfecto con dos victorias consecutivas y se perfila como el favorito de su grupo.', 
 '2026-01-09', 
 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop', 
 'Equipos'),

('Próxima jornada: Partidos imperdibles', 
 'Este fin de semana se disputarán encuentros decisivos que podrían definir a los clasificados. No te pierdas el enfrentamiento entre Titanes y Leones.', 
 '2026-01-10', 
 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop', 
 'Torneo'),

('Juan Pérez: "Queremos llegar a la final"', 
 'El capitán de Los Titanes habló sobre las expectativas del equipo y su objetivo de conquistar el campeonato en esta edición del torneo.', 
 '2026-01-11', 
 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=500&fit=crop', 
 'Jugadores'),

('Cambios en el fixture por condiciones climáticas', 
 'La organización anunció modificaciones en el calendario debido a las condiciones climáticas previstas para la próxima semana.', 
 '2026-01-12', 
 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=500&fit=crop', 
 'Torneo');

-- 7. Crear función para obtener goleadores (opcional pero recomendado)
CREATE OR REPLACE FUNCTION get_goleadores()
RETURNS TABLE (
  jugador_id UUID,
  nombre TEXT,
  dorsal INTEGER,
  foto_url TEXT,
  posicion TEXT,
  equipo_nombre TEXT,
  total_goles BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    j.id AS jugador_id,
    j.nombre,
    j.dorsal,
    j.foto_url,
    j.posicion,
    e.nombre AS equipo_nombre,
    COUNT(gj.id) AS total_goles
  FROM jugadores j
  INNER JOIN equipos e ON j.equipo_id = e.id
  LEFT JOIN goles_jugadores gj ON j.id = gj.jugador_id
  GROUP BY j.id, j.nombre, j.dorsal, j.foto_url, j.posicion, e.nombre
  HAVING COUNT(gj.id) > 0
  ORDER BY total_goles DESC, j.nombre;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- VERIFICACIÓN: Consulta para ver los datos insertados
-- ========================================
-- SELECT * FROM equipos;
-- SELECT * FROM jugadores;
-- SELECT * FROM partidos;
-- SELECT * FROM posiciones;
-- SELECT * FROM goles_jugadores;
-- SELECT * FROM noticias;
-- SELECT * FROM get_goleadores();

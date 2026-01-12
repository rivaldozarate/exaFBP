import Head from 'next/head'
import { useState } from 'react'
import styles from '@/styles/Resultados.module.css'
import PartidoCard from '@/components/PartidoCard'
import { getPartidos } from '@/lib/api'
import { GetServerSideProps } from 'next'

interface ResultadosProps {
  partidos: any[]
}

export default function Resultados({ partidos }: ResultadosProps) {
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos')
  const [filtroGrupo, setFiltroGrupo] = useState<string>('Todos')

  // Obtener grupos únicos
  const grupos = ['Todos', ...Array.from(new Set(partidos.map((p: any) => p.grupo || 'Sin grupo')))]

  // Filtrar partidos
  let partidosFiltrados = partidos

  if (filtroEstado !== 'Todos') {
    partidosFiltrados = partidosFiltrados.filter((p: any) => p.estado === filtroEstado)
  }

  if (filtroGrupo !== 'Todos') {
    partidosFiltrados = partidosFiltrados.filter((p: any) => p.grupo === filtroGrupo)
  }

  // Agrupar por fecha
  const partidosPorFecha = partidosFiltrados.reduce((acc: any, partido: any) => {
    const fecha = partido.fecha
    if (!acc[fecha]) {
      acc[fecha] = []
    }
    acc[fecha].push(partido)
    return acc
  }, {} as Record<string, any[]>)

  return (
    <>
      <Head>
        <title>Resultados - Torneo Ex Alumnos</title>
        <meta name="description" content="Resultados de los partidos del torneo de ex alumnos" />
      </Head>

      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Resultados de Partidos</h1>
          <p className={styles.subtitle}>Consulta todos los partidos y resultados del torneo</p>
        </div>
      </div>

      <div className="container section">
        {/* Filtros */}
        <div className={styles.filtrosContainer}>
          <div className={styles.filtroGrupo}>
            <label className={styles.filtroLabel}>Filtrar por estado:</label>
            <div className={styles.filtros}>
              {['Todos', 'finalizado', 'en-curso', 'programado'].map(estado => (
                <button
                  key={estado}
                  className={`${styles.filtroBtn} ${filtroEstado === estado ? styles.filtroActivo : ''}`}
                  onClick={() => setFiltroEstado(estado)}
                >
                  {estado === 'Todos' ? 'Todos' : 
                   estado === 'finalizado' ? 'Finalizados' :
                   estado === 'en-curso' ? 'En Curso' : 'Programados'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filtroGrupo}>
            <label className={styles.filtroLabel}>Filtrar por grupo:</label>
            <div className={styles.filtros}>
              {grupos.map(grupo => (
                <button
                  key={grupo}
                  className={`${styles.filtroBtn} ${filtroGrupo === grupo ? styles.filtroActivo : ''}`}
                  onClick={() => setFiltroGrupo(grupo)}
                >
                  {grupo === 'Todos' ? 'Todos' : `Grupo ${grupo}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados agrupados por fecha */}
        {Object.keys(partidosPorFecha).length === 0 ? (
          <div className={styles.noResultados}>
            <p>No hay partidos con los filtros seleccionados</p>
          </div>
        ) : (
          (Object.entries(partidosPorFecha) as [string, any[]][]).map(([fecha, partidos]) => (
            <div key={fecha} className={styles.fechaGroup}>
              <h2 className={styles.fechaTitulo}>
                <span className={styles.fechaIcon}>📅</span>
                {fecha}
              </h2>
              <div className={styles.partidosGrid}>
                {partidos.map((partido: any) => (
                  <PartidoCard 
                    key={partido.id}
                    equipoLocal={partido.equipo_local?.nombre || ''}
                    logoLocal={partido.equipo_local?.logo_url || ''}
                    equipoVisitante={partido.equipo_visitante?.nombre || ''}
                    logoVisitante={partido.equipo_visitante?.logo_url || ''}
                    golesLocal={partido.goles_local ?? undefined}
                    golesVisitante={partido.goles_visitante ?? undefined}
                    fecha={partido.fecha}
                    hora={partido.hora}
                    estado={partido.estado}
                  />
                ))}
              </div>
            </div>
          ))
        )}

        {/* Estadísticas rápidas */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{partidos.length}</div>
            <div className={styles.statLabel}>Total Partidos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {partidos.filter((p: any) => p.estado === 'finalizado').length}
            </div>
            <div className={styles.statLabel}>Finalizados</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {partidos.filter((p: any) => p.estado === 'programado').length}
            </div>
            <div className={styles.statLabel}>Por Jugar</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {partidos
                .filter((p: any) => p.goles_local !== null && p.goles_visitante !== null)
                .reduce((total: number, p: any) => total + (p.goles_local || 0) + (p.goles_visitante || 0), 0)}
            </div>
            <div className={styles.statLabel}>Goles Totales</div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const partidos = await getPartidos()

    return {
      props: {
        partidos
      }
    }
  } catch (error) {
    console.error('Error cargando partidos:', error)
    return {
      props: {
        partidos: []
      }
    }
  }
}

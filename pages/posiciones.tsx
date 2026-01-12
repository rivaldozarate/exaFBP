import Head from 'next/head'
import { useState } from 'react'
import styles from '@/styles/Posiciones.module.css'
import { getPosiciones } from '@/lib/api'
import { GetServerSideProps } from 'next'

interface PosicionesProps {
  posiciones: any[]
}

export default function Posiciones({ posiciones }: PosicionesProps) {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string>('Todos')

  // Obtener grupos únicos
  const grupos = ['Todos', ...Array.from(new Set(posiciones.map((p: any) => p.grupo)))]

  // Filtrar por grupo
  const posicionesFiltradas = grupoSeleccionado === 'Todos'
    ? posiciones
    : posiciones.filter((p: any) => p.grupo === grupoSeleccionado)

  // Ordenar por puntos, diferencia de goles
  const posicionesOrdenadas = [...posicionesFiltradas].sort((a: any, b: any) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    const difA = a.gf - a.gc
    const difB = b.gf - b.gc
    if (difB !== difA) return difB - difA
    return b.gf - a.gf
  })

  return (
    <>
      <Head>
        <title>Posiciones - Torneo Ex Alumnos</title>
        <meta name="description" content="Tabla de posiciones del torneo de ex alumnos" />
      </Head>

      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Tabla de Posiciones</h1>
          <p className={styles.subtitle}>Consulta la clasificación actualizada por grupos</p>
        </div>
      </div>

      <div className="container section">
        {/* Filtros por grupo */}
        <div className={styles.filtros}>
          {grupos.map(grupo => (
            <button
              key={grupo}
              className={`${styles.filtroBtn} ${grupoSeleccionado === grupo ? styles.filtroActivo : ''}`}
              onClick={() => setGrupoSeleccionado(grupo)}
            >
              {grupo === 'Todos' ? 'Todos los Grupos' : `Grupo ${grupo}`}
            </button>
          ))}
        </div>

        {/* Tabla de posiciones */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thPos}>Pos</th>
                <th className={styles.thEquipo}>Equipo</th>
                <th className={styles.thCenter}>PJ</th>
                <th className={styles.thCenter}>G</th>
                <th className={styles.thCenter}>E</th>
                <th className={styles.thCenter}>P</th>
                <th className={styles.thCenter}>GF</th>
                <th className={styles.thCenter}>GC</th>
                <th className={styles.thCenter}>DG</th>
                <th className={styles.thPts}>Pts</th>
              </tr>
            </thead>
            <tbody>
              {posicionesOrdenadas.map((posicion: any, index: number) => {
                const diferenciaGoles = posicion.gf - posicion.gc
                return (
                  <tr 
                    key={posicion.id} 
                    className={`${styles.row} ${index < 2 ? styles.rowClasificado : ''}`}
                  >
                    <td className={styles.tdPos}>
                      <span className={styles.posicion}>{index + 1}</span>
                    </td>
                    <td className={styles.tdEquipo}>
                      <div className={styles.equipoInfo}>
                        <img 
                          src={posicion.equipos?.logo_url || 'https://via.placeholder.com/50'} 
                          alt={posicion.equipos?.nombre || ''} 
                          className={styles.logo}
                        />
                        <div className={styles.equipoNombre}>
                          <span className={styles.nombre}>{posicion.equipos?.nombre || ''}</span>
                          <span className={styles.grupo}>Grupo {posicion.grupo}</span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tdCenter}>{posicion.pj}</td>
                    <td className={styles.tdCenter}>{posicion.pg}</td>
                    <td className={styles.tdCenter}>{posicion.pe}</td>
                    <td className={styles.tdCenter}>{posicion.pp}</td>
                    <td className={styles.tdCenter}>{posicion.gf}</td>
                    <td className={styles.tdCenter}>{posicion.gc}</td>
                    <td className={styles.tdCenter}>
                      <span className={diferenciaGoles >= 0 ? styles.dgPositivo : styles.dgNegativo}>
                        {diferenciaGoles > 0 ? '+' : ''}{diferenciaGoles}
                      </span>
                    </td>
                    <td className={styles.tdPts}>
                      <span className={styles.puntos}>{posicion.pts}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Leyenda */}
        <div className={styles.leyenda}>
          <div className={styles.leyendaItem}>
            <div className={styles.cuadroClasificado}></div>
            <span>Clasificados a siguiente fase</span>
          </div>
          <div className={styles.leyendaTexto}>
            <strong>PJ:</strong> Partidos Jugados | <strong>G:</strong> Ganados | <strong>E:</strong> Empatados | 
            <strong>P:</strong> Perdidos | <strong>GF:</strong> Goles a Favor | <strong>GC:</strong> Goles en Contra | 
            <strong>DG:</strong> Diferencia de Goles | <strong>Pts:</strong> Puntos
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posiciones = await getPosiciones()

    return {
      props: {
        posiciones
      }
    }
  } catch (error) {
    console.error('Error cargando posiciones:', error)
    return {
      props: {
        posiciones: []
      }
    }
  }
}

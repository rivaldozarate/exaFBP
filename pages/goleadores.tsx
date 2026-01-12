import Head from 'next/head'
import styles from '@/styles/Goleadores.module.css'
import { getGoleadores } from '@/lib/api'
import { GetServerSideProps } from 'next'

interface GoleadoresProps {
  goleadores: any[]
}

export default function Goleadores({ goleadores }: GoleadoresProps) {
  // Jugadores ya vienen ordenados de la API
  const jugadoresOrdenados = goleadores

  return (
    <>
      <Head>
        <title>Goleadores - Torneo Ex Alumnos</title>
        <meta name="description" content="Tabla de goleadores del torneo de ex alumnos" />
      </Head>

      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>🏆 Tabla de Goleadores</h1>
          <p className={styles.subtitle}>Los máximos anotadores del torneo</p>
        </div>
      </div>

      <div className="container section">
        {/* Top 3 Destacado */}
        <div className={styles.podio}>
          {jugadoresOrdenados.slice(0, 3).map((jugador: any, index: number) => (
            <div 
              key={jugador.id || jugador.jugador_id} 
              className={`${styles.podioCard} ${styles[`podio${index + 1}`]}`}
              style={{ order: index === 0 ? 2 : index === 1 ? 1 : 3 }}
            >
              <div className={styles.medalla}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div className={styles.podioFotoContainer}>
                <img 
                  src={jugador.foto_url || 'https://via.placeholder.com/150'} 
                  alt={jugador.nombre} 
                  className={styles.podioFoto}
                />
              </div>
              <h3 className={styles.podioNombre}>{jugador.nombre}</h3>
              <p className={styles.podioEquipo}>{jugador.equipos?.nombre || jugador.equipo_nombre || ''}</p>
              <div className={styles.podioGoles}>
                <span className={styles.golesIcon}>⚽</span>
                <span className={styles.golesNumero}>{jugador.total_goles || jugador.goles || 0}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla completa */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thPos}>Pos</th>
                <th className={styles.thJugador}>Jugador</th>
                <th className={styles.thCenter}>Número</th>
                <th className={styles.thCenter}>Posición</th>
                <th className={styles.thEquipo}>Equipo</th>
                <th className={styles.thCenter}>Goles</th>
              </tr>
            </thead>
            <tbody>
              {jugadoresOrdenados.map((jugador: any, index: number) => (
                <tr 
                  key={jugador.id || jugador.jugador_id}
                  className={`${styles.row} ${index < 3 ? styles.rowDestacado : ''}`}
                >
                  <td className={styles.tdPos}>
                    <span className={styles.posicion}>{index + 1}</span>
                  </td>
                  <td className={styles.tdJugador}>
                    <div className={styles.jugadorInfo}>
                      <img 
                        src={jugador.foto_url || 'https://via.placeholder.com/50'} 
                        alt={jugador.nombre} 
                        className={styles.foto}
                      />
                      <span className={styles.nombre}>{jugador.nombre}</span>
                    </div>
                  </td>
                  <td className={styles.tdCenter}>
                    <span className={styles.numero}>#{jugador.dorsal || jugador.numero || '-'}</span>
                  </td>
                  <td className={styles.tdCenter}>{jugador.posicion || '-'}</td>
                  <td className={styles.tdEquipo}>{jugador.equipos?.nombre || jugador.equipo_nombre || ''}</td>
                  <td className={styles.tdCenter}>
                    <div className={styles.golesCell}>
                      <span className={styles.golesIconSmall}>⚽</span>
                      <span className={styles.golesCount}>{jugador.total_goles || jugador.goles || 0}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Estadísticas */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {goleadores.reduce((total: number, j: any) => total + (j.total_goles || j.goles || 0), 0)}
            </div>
            <div className={styles.statLabel}>Goles Totales</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {goleadores.length > 0 ? Math.round(goleadores.reduce((total: number, j: any) => total + (j.total_goles || j.goles || 0), 0) / goleadores.length * 10) / 10 : 0}
            </div>
            <div className={styles.statLabel}>Promedio por Jugador</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{jugadoresOrdenados[0]?.total_goles || jugadoresOrdenados[0]?.goles || 0}</div>
            <div className={styles.statLabel}>Máximo Goleador</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{goleadores.length}</div>
            <div className={styles.statLabel}>Total Goleadores</div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const goleadores = await getGoleadores()

    return {
      props: {
        goleadores
      }
    }
  } catch (error) {
    console.error('Error cargando goleadores:', error)
    return {
      props: {
        goleadores: []
      }
    }
  }
}

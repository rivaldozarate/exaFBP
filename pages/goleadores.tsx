import Head from 'next/head'
import styles from '@/styles/Goleadores.module.css'
import { jugadoresMock } from '@/data/mockData'

export default function Goleadores() {
  // Ordenar jugadores por goles
  const jugadoresOrdenados = [...jugadoresMock].sort((a, b) => (b.goles || 0) - (a.goles || 0))

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
          {jugadoresOrdenados.slice(0, 3).map((jugador, index) => (
            <div 
              key={jugador.id} 
              className={`${styles.podioCard} ${styles[`podio${index + 1}`]}`}
              style={{ order: index === 0 ? 2 : index === 1 ? 1 : 3 }}
            >
              <div className={styles.medalla}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div className={styles.podioFotoContainer}>
                <img 
                  src={jugador.foto} 
                  alt={jugador.nombre} 
                  className={styles.podioFoto}
                />
              </div>
              <h3 className={styles.podioNombre}>{jugador.nombre}</h3>
              <p className={styles.podioEquipo}>{jugador.equipo_nombre}</p>
              <div className={styles.podioGoles}>
                <span className={styles.golesIcon}>⚽</span>
                <span className={styles.golesNumero}>{jugador.goles}</span>
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
              {jugadoresOrdenados.map((jugador, index) => (
                <tr 
                  key={jugador.id}
                  className={`${styles.row} ${index < 3 ? styles.rowDestacado : ''}`}
                >
                  <td className={styles.tdPos}>
                    <span className={styles.posicion}>{index + 1}</span>
                  </td>
                  <td className={styles.tdJugador}>
                    <div className={styles.jugadorInfo}>
                      <img 
                        src={jugador.foto} 
                        alt={jugador.nombre} 
                        className={styles.foto}
                      />
                      <span className={styles.nombre}>{jugador.nombre}</span>
                    </div>
                  </td>
                  <td className={styles.tdCenter}>
                    <span className={styles.numero}>#{jugador.numero}</span>
                  </td>
                  <td className={styles.tdCenter}>{jugador.posicion}</td>
                  <td className={styles.tdEquipo}>{jugador.equipo_nombre}</td>
                  <td className={styles.tdCenter}>
                    <div className={styles.golesCell}>
                      <span className={styles.golesIconSmall}>⚽</span>
                      <span className={styles.golesCount}>{jugador.goles}</span>
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
              {jugadoresMock.reduce((total, j) => total + (j.goles || 0), 0)}
            </div>
            <div className={styles.statLabel}>Goles Totales</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {Math.round(jugadoresMock.reduce((total, j) => total + (j.goles || 0), 0) / jugadoresMock.length * 10) / 10}
            </div>
            <div className={styles.statLabel}>Promedio por Jugador</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{jugadoresOrdenados[0]?.goles || 0}</div>
            <div className={styles.statLabel}>Máximo Goleador</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{jugadoresMock.length}</div>
            <div className={styles.statLabel}>Total Goleadores</div>
          </div>
        </div>
      </div>
    </>
  )
}

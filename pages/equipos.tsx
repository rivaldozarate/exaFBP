import Head from 'next/head'
import styles from '@/styles/Equipos.module.css'
import EquipoCard from '@/components/EquipoCard'
import { equiposMock } from '@/data/mockData'

export default function Equipos() {
  return (
    <>
      <Head>
        <title>Equipos - Torneo Ex Alumnos</title>
        <meta name="description" content="Conoce todos los equipos participantes del torneo" />
      </Head>

      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>⚽ Equipos Participantes</h1>
          <p className={styles.subtitle}>Conoce a los equipos que compiten por el título</p>
        </div>
      </div>

      <div className="container section">
        <div className={styles.equiposGrid}>
          {equiposMock.map(equipo => (
            <EquipoCard
              key={equipo.id}
              nombre={equipo.nombre}
              logo={equipo.logo}
              jugadores={equipo.jugadores_count}
              categoria={equipo.categoria}
            />
          ))}
        </div>

        {/* Información adicional */}
        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Sobre el Torneo</h2>
            <p className={styles.infoText}>
              El Torneo de Ex Alumnos reúne a {equiposMock.length} equipos conformados por
              antiguos estudiantes que regresan a las canchas para demostrar su talento
              y mantener viva la tradición deportiva.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statIcon}>🏆</div>
              <div className={styles.statNumber}>{equiposMock.length}</div>
              <div className={styles.statLabel}>Equipos</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statNumber}>
                {equiposMock.reduce((total, e) => total + e.jugadores_count, 0)}
              </div>
              <div className={styles.statLabel}>Jugadores</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statIcon}>📊</div>
              <div className={styles.statNumber}>
                {Array.from(new Set(equiposMock.map(e => e.grupo))).length}
              </div>
              <div className={styles.statLabel}>Grupos</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

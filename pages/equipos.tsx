import Head from 'next/head'
import styles from '@/styles/Equipos.module.css'
import EquipoCard from '@/components/EquipoCard'
import { getEquipos } from '@/lib/api'
import { GetServerSideProps } from 'next'

interface EquiposProps {
  equipos: any[]
}

export default function Equipos({ equipos }: EquiposProps) {
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
          {equipos.map((equipo: any) => (
            <EquipoCard
              key={equipo.id}
              nombre={equipo.nombre}
              logo={equipo.logo_url || 'https://via.placeholder.com/150'}
              jugadores={equipo.jugadores_count || 0}
              categoria={equipo.grupo ? `Grupo ${equipo.grupo}` : 'Sin grupo'}
            />
          ))}
        </div>

        {/* Información adicional */}
        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Sobre el Torneo</h2>
            <p className={styles.infoText}>
              El Torneo de Ex Alumnos reúne a {equipos.length} equipos conformados por
              antiguos estudiantes que regresan a las canchas para demostrar su talento
              y mantener viva la tradición deportiva.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statIcon}>🏆</div>
              <div className={styles.statNumber}>{equipos.length}</div>
              <div className={styles.statLabel}>Equipos</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statNumber}>
                {equipos.reduce((total: number, e: any) => total + (e.jugadores_count || 0), 0)}
              </div>
              <div className={styles.statLabel}>Jugadores</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statIcon}>📊</div>
              <div className={styles.statNumber}>
                {Array.from(new Set(equipos.map((e: any) => e.grupo).filter(Boolean))).length}
              </div>
              <div className={styles.statLabel}>Grupos</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const equipos = await getEquipos()

    return {
      props: {
        equipos
      }
    }
  } catch (error) {
    console.error('Error cargando equipos:', error)
    return {
      props: {
        equipos: []
      }
    }
  }
}

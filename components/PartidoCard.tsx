import styles from './PartidoCard.module.css'

interface PartidoCardProps {
  equipoLocal: string
  logoLocal: string
  equipoVisitante: string
  logoVisitante: string
  golesLocal?: number
  golesVisitante?: number
  fecha: string
  hora: string
  estado: 'finalizado' | 'en-curso' | 'programado'
}

export default function PartidoCard({
  equipoLocal,
  logoLocal,
  equipoVisitante,
  logoVisitante,
  golesLocal,
  golesVisitante,
  fecha,
  hora,
  estado
}: PartidoCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.fecha}>{fecha}</span>
        <span className={`${styles.estado} ${styles[estado]}`}>
          {estado === 'finalizado' ? 'Finalizado' : estado === 'en-curso' ? 'En Curso' : hora}
        </span>
      </div>

      <div className={styles.partido}>
        {/* Equipo Local */}
        <div className={styles.equipo}>
          <img src={logoLocal} alt={equipoLocal} className={styles.logo} />
          <span className={styles.nombreEquipo}>{equipoLocal}</span>
        </div>

        {/* Marcador */}
        <div className={styles.marcador}>
          {estado === 'programado' ? (
            <span className={styles.vs}>VS</span>
          ) : (
            <>
              <span className={styles.goles}>{golesLocal ?? 0}</span>
              <span className={styles.separator}>-</span>
              <span className={styles.goles}>{golesVisitante ?? 0}</span>
            </>
          )}
        </div>

        {/* Equipo Visitante */}
        <div className={styles.equipo}>
          <img src={logoVisitante} alt={equipoVisitante} className={styles.logo} />
          <span className={styles.nombreEquipo}>{equipoVisitante}</span>
        </div>
      </div>
    </div>
  )
}

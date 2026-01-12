import styles from './EquipoCard.module.css'

interface EquipoCardProps {
  nombre: string
  logo: string
  jugadores: number
  categoria: string
}

export default function EquipoCard({ nombre, logo, jugadores, categoria }: EquipoCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        <img src={logo} alt={`Logo ${nombre}`} className={styles.logo} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <div className={styles.info}>
          <span className={styles.badge}>{categoria}</span>
          <span className={styles.jugadores}>👥 {jugadores} jugadores</span>
        </div>
      </div>
    </div>
  )
}

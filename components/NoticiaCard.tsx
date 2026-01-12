import styles from './NoticiaCard.module.css'

interface NoticiaCardProps {
  titulo: string
  contenido: string
  imagen: string
  fecha: string
  categoria?: string
}

export default function NoticiaCard({ titulo, contenido, imagen, fecha, categoria }: NoticiaCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imagen} alt={titulo} className={styles.imagen} />
        {categoria && <span className={styles.categoria}>{categoria}</span>}
      </div>
      <div className={styles.content}>
        <span className={styles.fecha}>{fecha}</span>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.contenido}>{contenido}</p>
        <button className={styles.leerMas}>Leer más →</button>
      </div>
    </div>
  )
}

import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Información del torneo */}
          <div className={styles.section}>
            <h3 className={styles.title}>Torneo Ex Alumnos</h3>
            <p className={styles.description}>
              Competencia anual que reúne a los mejores equipos de ex alumnos
              en un evento deportivo lleno de emoción y camaradería.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Enlaces Rápidos</h4>
            <ul className={styles.linkList}>
              <li><a href="/">Inicio</a></li>
              <li><a href="/posiciones">Posiciones</a></li>
              <li><a href="/resultados">Resultados</a></li>
              <li><a href="/goleadores">Goleadores</a></li>
            </ul>
          </div>

          {/* Contacto y redes */}
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Síguenos</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">📘</a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">📷</a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">🐦</a>
              <a href="#" className={styles.socialIcon} aria-label="YouTube">🎥</a>
            </div>
            <p className={styles.contact}>📧 info@torneoexalumnos.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>© {currentYear} Torneo Ex Alumnos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

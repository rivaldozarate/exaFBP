import Link from 'next/link'
import { useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚽</span>
          <span className={styles.logoText}>Torneo Ex Alumnos</span>
        </Link>

        {/* Hamburger menu para móvil */}
        <button 
          className={styles.hamburger} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${isMenuOpen ? styles.barActive : ''}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.barActive : ''}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.barActive : ''}`}></span>
        </button>

        {/* Links de navegación */}
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksActive : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Inicio
          </Link>
          <Link href="/posiciones" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Posiciones
          </Link>
          <Link href="/resultados" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Resultados
          </Link>
          <Link href="/goleadores" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Goleadores
          </Link>
          <Link href="/equipos" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Equipos
          </Link>
          <Link href="/noticias" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Noticias
          </Link>
        </div>
      </div>
    </nav>
  )
}

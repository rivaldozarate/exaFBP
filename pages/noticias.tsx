import Head from 'next/head'
import { useState } from 'react'
import styles from '@/styles/Noticias.module.css'
import NoticiaCard from '@/components/NoticiaCard'
import { getNoticias } from '@/lib/api'
import { GetServerSideProps } from 'next'

interface NoticiasProps {
  noticias: any[]
}

export default function Noticias({ noticias }: NoticiasProps) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas')

  // Obtener categorías únicas
  const categorias = ['Todas', ...Array.from(new Set(noticias.map((n: any) => n.categoria).filter(Boolean)))]

  // Filtrar noticias por categoría
  const noticiasFiltradas = categoriaSeleccionada === 'Todas'
    ? noticias
    : noticias.filter((n: any) => n.categoria === categoriaSeleccionada)

  return (
    <>
      <Head>
        <title>Noticias - Torneo Ex Alumnos</title>
        <meta name="description" content="Últimas noticias del torneo de ex alumnos" />
      </Head>

      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>📰 Noticias del Torneo</h1>
          <p className={styles.subtitle}>Mantente informado con las últimas novedades</p>
        </div>
      </div>

      <div className="container section">
        {/* Filtros por categoría */}
        <div className={styles.filtros}>
          {categorias.map(categoria => (
            <button
              key={categoria}
              className={`${styles.filtroBtn} ${categoriaSeleccionada === categoria ? styles.filtroActivo : ''}`}
              onClick={() => setCategoriaSeleccionada(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Grid de noticias */}
        {noticiasFiltradas.length === 0 ? (
          <div className={styles.noNoticias}>
            <p>No hay noticias en esta categoría</p>
          </div>
        ) : (
          <div className={styles.noticiasGrid}>
            {noticiasFiltradas.map((noticia: any) => (
              <NoticiaCard 
                key={noticia.id}
                titulo={noticia.titulo}
                contenido={noticia.contenido}
                imagen={noticia.imagen_url || 'https://via.placeholder.com/400x250'}
                fecha={noticia.fecha}
                categoria={noticia.categoria}
              />
            ))}
          </div>
        )}

        {/* Newsletter suscripción */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>¿No quieres perderte nada?</h2>
            <p className={styles.newsletterText}>
              Suscríbete a nuestro boletín para recibir las últimas noticias del torneo
            </p>
            <div className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterBtn}>Suscribirse</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const noticias = await getNoticias()

    return {
      props: {
        noticias
      }
    }
  } catch (error) {
    console.error('Error cargando noticias:', error)
    return {
      props: {
        noticias: []
      }
    }
  }
}

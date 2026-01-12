import Head from 'next/head'
import { useState } from 'react'
// TODO: Create Noticias.module.css file in styles folder
// import styles from '@/styles/Noticias.module.css'

// Temporary inline styles object until CSS module is created
const styles = {
    header: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 text-center',
    title: 'text-4xl font-bold mb-4',
    subtitle: 'text-xl opacity-90',
    filtros: 'flex flex-wrap gap-3 justify-center mb-8',
    filtroBtn: 'px-6 py-2 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all',
    filtroActivo: 'bg-blue-600 text-white border-blue-600',
    noticiasGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12',
    noNoticias: 'text-center py-12 text-gray-500',
    newsletter: 'bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center',
    newsletterContent: 'max-w-2xl mx-auto',
    newsletterTitle: 'text-2xl font-bold mb-3',
    newsletterText: 'mb-6 opacity-90',
    newsletterForm: 'flex flex-col sm:flex-row gap-3 justify-center',
    newsletterInput: 'px-4 py-3 rounded-lg flex-1 max-w-md text-gray-900',
    newsletterBtn: 'px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all'
}
import NoticiaCard from '@/components/NoticiaCard'
import { noticiasMock } from '@/data/mockData'

export default function Noticias() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas')

  // Obtener categorías únicas
  const categorias = ['Todas', ...Array.from(new Set(noticiasMock.map(n => n.categoria)))]

  // Filtrar noticias por categoría
  const noticiasFiltradas = categoriaSeleccionada === 'Todas'
    ? noticiasMock
    : noticiasMock.filter(n => n.categoria === categoriaSeleccionada)

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
            {noticiasFiltradas.map(noticia => (
              <NoticiaCard key={noticia.id} {...noticia} />
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

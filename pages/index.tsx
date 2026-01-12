import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import PartidoCard from '@/components/PartidoCard'
import NoticiaCard from '@/components/NoticiaCard'
import { getPartidos, getNoticias, getGoleadores } from '@/lib/api'
import { GetServerSideProps } from 'next'

interface HomeProps {
  partidos: any[]
  noticias: any[]
  goleadores: any[]
}

export default function Home({ partidos, noticias, goleadores }: HomeProps) {
  // Filtrar próximos 3 partidos
  const proximosPartidos = partidos
    .filter((p: any) => p.estado === 'programado' || p.estado === 'en-curso')
    .slice(0, 3)

  // Últimas 3 noticias
  const ultimasNoticias = noticias.slice(0, 3)

  // Top 3 goleadores
  const topGoleadores = goleadores.slice(0, 3)

  return (
    <>
      <Head>
        <title>Torneo Ex Alumnos 2026</title>
        <meta name="description" content="Torneo de fútbol de ex alumnos - Resultados, posiciones, goleadores y más" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Torneo Ex Alumnos Colegio FPB
            <span className={styles.heroYear}>2026</span>
          </h1>
          <p className={styles.heroSubtitle}>
            La competencia que reúne a los mejores equipos de ex alumnos
          </p>
          <div className={styles.heroButtons}>
            <Link href="/posiciones" className={styles.btnPrimary}>
              Ver Posiciones
            </Link>
            <Link href="/resultados" className={styles.btnSecondary}>
              Resultados
            </Link>
          </div>
        </div>
        <div className={styles.heroDecoration}>⚽</div>
      </section>

      {/* Próximos Partidos */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Próximos Partidos</h2>
            <Link href="/resultados" className={styles.viewAll}>
              Ver todos →
            </Link>
          </div>
          <div className={styles.gridPartidos}>
            {proximosPartidos.map((partido: any) => (
              <PartidoCard 
                key={partido.id}
                equipoLocal={partido.equipo_local?.nombre || ''}
                logoLocal={partido.equipo_local?.logo_url || ''}
                equipoVisitante={partido.equipo_visitante?.nombre || ''}
                logoVisitante={partido.equipo_visitante?.logo_url || ''}
                golesLocal={partido.goles_local ?? undefined}
                golesVisitante={partido.goles_visitante ?? undefined}
                fecha={partido.fecha}
                hora={partido.hora}
                estado={partido.estado}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Goleadores */}
      <section className={styles.sectionGray}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Goleadores</h2>
            <Link href="/goleadores" className={styles.viewAll}>
              Ver tabla completa →
            </Link>
          </div>
          <div className={styles.goleadoresGrid}>
            {topGoleadores.map((jugador: any, index: number) => (
              <div key={jugador.id || jugador.jugador_id} className={styles.goleadorCard}>
                <div className={styles.goleadorRank}>{index + 1}</div>
                <img 
                  src={jugador.foto_url || jugador.foto || 'https://via.placeholder.com/100'} 
                  alt={jugador.nombre} 
                  className={styles.goleadorFoto}
                />
                <div className={styles.goleadorInfo}>
                  <h3 className={styles.goleadorNombre}>{jugador.nombre}</h3>
                  <p className={styles.goleadorEquipo}>{jugador.equipos?.nombre || jugador.equipo_nombre || ''}</p>
                  <div className={styles.goleadorGoles}>
                    <span className={styles.golesIcon}>⚽</span>
                    <span className={styles.golesNumero}>{jugador.total_goles || jugador.goles || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Últimas Noticias */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Últimas Noticias</h2>
            <Link href="/noticias" className={styles.viewAll}>
              Ver todas →
            </Link>
          </div>
          <div className={styles.noticiasGrid}>
            {ultimasNoticias.map((noticia: any) => (
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
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>¿Listo para seguir el torneo?</h2>
            <p className={styles.ctaText}>
              No te pierdas ningún detalle de la competencia más emocionante del año
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/equipos" className={styles.btnPrimary}>
                Conoce los Equipos
              </Link>
              <Link href="/noticias" className={styles.btnOutline}>
                Lee las Noticias
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [partidos, noticias, goleadores] = await Promise.all([
      getPartidos(),
      getNoticias(),
      getGoleadores()
    ])

    return {
      props: {
        partidos,
        noticias,
        goleadores
      }
    }
  } catch (error) {
    console.error('Error cargando datos:', error)
    return {
      props: {
        partidos: [],
        noticias: [],
        goleadores: []
      }
    }
  }
}

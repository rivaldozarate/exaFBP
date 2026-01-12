import Head from 'next/head'
import { useState } from 'react'
import styles from '@/styles/Home.module.css'

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [secret, setSecret] = useState('')

  const handleSeed = async () => {
    if (!secret) {
      alert('Ingresa el token secreto')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/seed-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: 'Error de conexión',
        errors: [error],
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Cargar Datos - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="container" style={{ maxWidth: '600px', margin: '100px auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--color-primary)' }}>
          🔐 Panel de Administración
        </h1>
        
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Cargar Datos de Ejemplo</h2>
          
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Esta acción insertará datos de ejemplo en la base de datos de Supabase:
          </p>
          
          <ul style={{ marginBottom: '20px', color: '#666', paddingLeft: '20px' }}>
            <li>6 equipos (Grupos A y B)</li>
            <li>10 jugadores</li>
            <li>8 partidos (5 finalizados, 3 programados)</li>
            <li>6 registros de posiciones</li>
            <li>Goles de jugadores</li>
            <li>6 noticias</li>
          </ul>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Token Secreto:
            </label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Ingresa el token secreto"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
              }}
            />
            <small style={{ color: '#999', marginTop: '5px', display: 'block' }}>
              Configura SEED_SECRET en las variables de entorno de Vercel
            </small>
          </div>

          <button
            onClick={handleSeed}
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: loading ? '#ccc' : 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {loading ? '⏳ Cargando datos...' : '🚀 Cargar Datos'}
          </button>

          {result && (
            <div
              style={{
                marginTop: '20px',
                padding: '15px',
                borderRadius: '8px',
                background: result.success ? '#d4edda' : '#f8d7da',
                color: result.success ? '#155724' : '#721c24',
                border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
              }}
            >
              <strong>{result.success ? '✅ Éxito' : '❌ Error'}:</strong>
              <p style={{ margin: '10px 0 0 0' }}>{result.message}</p>
              
              {result.errors && result.errors.length > 0 && (
                <details style={{ marginTop: '10px' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    Ver errores ({result.errors.length})
                  </summary>
                  <pre style={{ 
                    marginTop: '10px', 
                    padding: '10px', 
                    background: '#fff', 
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontSize: '12px'
                  }}>
                    {JSON.stringify(result.errors, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            background: '#fff3cd', 
            borderRadius: '8px',
            border: '1px solid #ffc107'
          }}>
            <strong>⚠️ Advertencia:</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
              Esta operación insertará datos. Si las tablas ya tienen datos, podría generar duplicados.
              Asegúrate de que las tablas estén vacías o usa ON CONFLICT en Supabase.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            ← Volver al inicio
          </a>
        </div>
      </div>
    </>
  )
}

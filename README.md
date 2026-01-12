# Torneo Ex Alumnos 2026

Sistema web para gestión y visualización de un torneo de fútbol de ex alumnos.

## 🚀 Características

- **Tabla de Posiciones**: Visualiza la clasificación por grupos con estadísticas detalladas
- **Resultados de Partidos**: Consulta todos los partidos (finalizados, en curso y programados)
- **Tabla de Goleadores**: Ranking de los máximos anotadores del torneo
- **Equipos**: Información de todos los equipos participantes
- **Noticias**: Últimas novedades del torneo
- **Diseño Responsive**: Adaptable a dispositivos móviles y desktop
- **Paleta Profesional**: Colores azul, turquesa, negro, celeste y blanco

## 🛠️ Tecnologías

- **Framework**: Next.js 14 con TypeScript
- **Estilos**: CSS Modules
- **Despliegue**: Vercel
- **Datos**: Mock data (preparado para integración con Supabase)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🌐 Despliegue en Vercel

### Opción 1: Deploy desde CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Deploy
vercel
```

### Opción 2: Deploy desde GitHub

1. Sube el proyecto a GitHub
2. Ingresa a [vercel.com](https://vercel.com)
3. Conecta tu repositorio
4. Vercel detectará automáticamente Next.js y desplegará

## 📁 Estructura del Proyecto

```
exaFBP/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── EquipoCard.tsx
│   ├── PartidoCard.tsx
│   └── NoticiaCard.tsx
├── data/               # Datos mock
│   └── mockData.ts
├── pages/              # Páginas de la aplicación
│   ├── index.tsx       # Home
│   ├── posiciones.tsx  # Tabla de posiciones
│   ├── resultados.tsx  # Resultados de partidos
│   ├── goleadores.tsx  # Tabla de goleadores
│   ├── equipos.tsx     # Equipos participantes
│   └── noticias.tsx    # Noticias del torneo
├── styles/             # Estilos CSS
│   └── globals.css
└── public/             # Archivos estáticos
```

## 🎨 Paleta de Colores

- **Azul Principal**: #0066CC
- **Turquesa**: #00BCD4
- **Turquesa Claro**: #40E0D0
- **Celeste**: #87CEEB
- **Negro**: #1A1A1A
- **Blanco**: #FFFFFF

## 🔄 Integración con Supabase (Próximamente)

El proyecto está preparado para consumir datos de Supabase. Consulta `data/mockData.ts` para ver ejemplos de cómo integrar las consultas.

### Tablas necesarias en Supabase:

- `equipos`
- `jugadores`
- `partidos`
- `goles_jugadores`
- `posiciones`
- `noticias`

### Configuración:

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Crea las tablas necesarias
3. Agrega las variables de entorno:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

4. Descomentar el código de integración en `data/mockData.ts`

## 📱 Características del Diseño

- Navegación responsive con menú hamburguesa en móvil
- Cards con efectos hover suaves
- Gradientes profesionales
- Animaciones CSS sutiles
- Alto contraste para mejor legibilidad
- Optimizado para accesibilidad

## 🤝 Contribución

Este proyecto está diseñado para ser fácilmente extensible. Puedes:

- Agregar nuevas páginas en `/pages`
- Crear nuevos componentes en `/components`
- Extender los estilos en `/styles`
- Modificar los datos mock en `/data`

## 📄 Licencia

Este proyecto fue creado para el Torneo de Ex Alumnos 2026.

---

Desarrollado con ⚽ para el Torneo Ex Alumnos

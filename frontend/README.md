# PropFinder Frontend

Frontend del portal inmobiliario PropFinder, desarrollado con Next.js y Material UI.

## Descripción

Aplicación web moderna para búsqueda, publicación y gestión de propiedades inmobiliarias, con integración de chat en tiempo real, pagos y mapas.

## Tecnologías principales

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Material UI](https://mui.com/)
- [Supabase](https://supabase.com/) (para autenticación y datos)

## Estructura recomendada

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── .env.local
├── package.json
└── README.md
```

## Instalación y uso

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Crea el archivo `.env.local` con tus variables de entorno (ejemplo: claves de Supabase, endpoints, Google Maps, etc).
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Accede a la app en [http://localhost:3000](http://localhost:3000)

## Comandos útiles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Genera la build de producción
- `npm start` — Inicia la app en modo producción

## Recomendaciones

- Usa componentes de Material UI para mantener coherencia visual
- Organiza el código en componentes reutilizables dentro de `src/components`
- Utiliza hooks y contextos para manejar estado global y autenticación
- Integra el backend NestJS mediante llamadas a API REST o GraphQL

## Despliegue

Puedes desplegar fácilmente en Vercel, Google Cloud Run o cualquier proveedor compatible con Next.js.

---

Desarrollado por el equipo PropFinder.

# PropFinder

Plataforma inmobiliaria modular con pagos, chat en tiempo real y geolocalización.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Funcionalidades principales](#funcionalidades-principales)
- [Arquitectura](#arquitectura)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Flujo de Trabajo GitFlow](#flujo-de-trabajo-gitflow)
- [Comandos Útiles](#comandos-útiles)
- [Tecnologías Principales](#tecnologías-principales)
- [Licencia](#licencia)

---

## Descripción

PropFinder es una plataforma inmobiliaria que permite a usuarios buscar propiedades y a agentes inmobiliarios publicar, gestionar y vender propiedades. Incluye sistema de pagos (Stripe/PayPal), chat en tiempo real (Supabase Messaging) y geolocalización (Google Maps).

## Funcionalidades principales

- Listado de propiedades con búsqueda geoespacial (Google Maps, filtros avanzados)
- Sistema de filtros avanzados (precio, ubicación, tipo, etc.)
- Agendamiento de visitas a propiedades
- Chat en tiempo real entre usuarios y agentes
- Planes de publicación para agentes (pago único por propiedad o plan)
- Panel de analytics para propietarios y agentes

## Arquitectura

- **Frontend:** nestjs
- **Backend:** NestJS (Node.js, modular)
- **Base de Datos:** PostgreSQL (Supabase)
- **Autenticación:** Supabase Auth
- **Almacenamiento:** Supabase Storage
- **Chat:** Supabase Messaging (WebSocket)
- **Pagos:** Stripe + PayPal
- **Mapas:** Google Maps API

## Estructura de Carpetas

```
PropFinder/
│
├── frontend/           # Aplicación web
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── styles/
│
├── backend/            # API modular NestJS
│   └── src/
│       ├── modules/
│       │   ├── auth/
│       │   ├── properties/
│       │   ├── users/
│       │   ├── payments/
│       │   ├── chat/
│       │   ├── geolocation/
│       │   └── images/
│       └── common/
│
├── database/           # Migraciones y esquemas
├── docs/               # Documentación y diagramas
└── .gitignore
```

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/OrleyZambrano/PropFinder.git
cd PropFinder
```

### 2. Instalar dependencias

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` en cada módulo y completa los valores necesarios (Supabase, Stripe, PayPal, Google Maps, etc).

### 4. Ejecutar el proyecto

#### Backend

```bash
npm run start:dev
```

#### Frontend

```bash
npm start
```

## Flujo de Trabajo GitFlow

- `main`: Rama principal de producción
- `develop`: Rama de integración de desarrollo
- `feature/*`: Ramas para nuevas funcionalidades (ej: `feature/frontend`)
- `release/*`: Ramas para preparar releases
- `hotfix/*`: Ramas para correcciones urgentes en producción

### Ejemplo de creación de rama feature

```bash
git checkout develop
git checkout -b feature/nueva-funcionalidad
```

## Comandos Útiles

- `git status` — Ver estado del repositorio
- `git pull` — Traer últimos cambios
- `git push` — Subir cambios
- `npm run start:dev` — Iniciar backend en modo desarrollo
- `npm start` — Iniciar frontend

## Tecnologías Principales

- NestJS
- Supabase (PostgreSQL, Auth, Storage, Messaging)
- Stripe, PayPal
- Google Maps API
- HTML, CSS, JavaScript

## Licencia

MIT

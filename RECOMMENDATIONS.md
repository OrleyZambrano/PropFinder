# Recomendaciones Tecnológicas y Herramientas para PropFinder

## Frontend

- **Framework:** Next.js
- **UI:** Material UI
- **Despliegue:** Google Cloud Storage + Cloud CDN (o Vercel si prefieres separar el frontend)

## Backend

- **Lenguaj9e:** Node.js con NestJS
- **Arquitectura:** Microservicios (ideal para Cloud Run)
- **Base de datos:** Supabase (PostgreSQL gestionado, autenticación y almacenamiento)
- **API Gateway:** Google Cloud API Gateway

## Autenticación y Autorización

- **Supabase Auth** para usuarios y roles

## Chat en tiempo real

- **Socket.io** (NestJS)

## Pagos

- **Stripe** y **PayPal** (modo sandbox para pruebas)

## Notificaciones

- **Email:** SendGrid
- **Push:** Firebase Cloud Messaging

## Analytics

- **Panel propio** con dashboards en React y Google Analytics para métricas generales

## Calidad de Código

- **SonarQube:** Integración en CI/CD
- **Testing:** Jest (NestJS)
- **Coverage:** Cobertura mínima 70%

## CI/CD y Despliegue

- **GitHub Actions:** Para automatizar pruebas, análisis y despliegue
- **Docker Compose:** Para entorno local
- **Google Cloud Run:** Para backend y microservicios

## Documentación

- **Swagger/OpenAPI:** Documentación de APIs
- **C4 Model:** PlantUML
- **ADR:** Markdown en carpeta docs/adr

## Otros

- **Postman:** Para pruebas de APIs
- **GitFlow:** Estrategia de ramas y control de versiones

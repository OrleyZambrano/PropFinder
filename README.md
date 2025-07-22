# PropFinder - Portal Inmobiliario

PropFinder es un marketplace de propiedades que permite a usuarios buscar, filtrar y contactar agentes inmobiliarios de manera eficiente. El sistema integra funcionalidades avanzadas de búsqueda geoespacial, agendamiento de visitas, chat en tiempo real y paneles de analytics para propietarios.

## Funcionalidades principales

- Listado de propiedades con búsqueda geoespacial y filtros avanzados
- Agendamiento de visitas a propiedades
- Chat en tiempo real con agentes inmobiliarios
- Planes de publicación para agentes (pago único)
- Panel de analytics para propietarios
- API Gateway y middleware para autenticación, autorización y rate limiting
- Integración con pasarelas de pago (Stripe, PayPal)
- Despliegue automatizado en la nube y funcionamiento local con Docker Compose

## Arquitectura

El sistema está diseñado bajo una arquitectura **monolítica modular** o **microservicios** (según elección documentada), siguiendo buenas prácticas de diseño y patrones arquitectónicos como Factory Method, Singleton, Repository y Strategy.

## Calidad y despliegue

- Integración con SonarQube para análisis de calidad de código
- Pruebas automatizadas y cobertura mínima del 70%
- CI/CD con GitHub Actions
- Despliegue en ambientes de desarrollo, staging y producción (AWS, Azure, GCP, Render, Vercel)

## Documentación

- Modelos C4 (C1, C2, C3)
- ADRs (Architecture Decision Records)
- Documentación de APIs (Swagger/OpenAPI)
- Modelo de negocio (Business Model Canvas)

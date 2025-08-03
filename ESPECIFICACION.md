# Especificación de Proyecto: Portal Inmobiliario "PropFinder"

## Descripción General

PropFinder es un marketplace de propiedades que permite a los usuarios buscar inmuebles con filtros avanzados y contactar agentes inmobiliarios. El sistema está diseñado para ser escalable, seguro y fácil de mantener, integrando funcionalidades modernas y arquitectura cloud-native.

## Funcionalidades Principales

- Listado de propiedades con búsqueda geoespacial
- Sistema de filtros avanzados (precio, ubicación, tipo, etc.)
- Agendamiento de visitas a propiedades
- Chat en tiempo real con agentes
- Planes de publicación para agentes (pago único)
- Panel de analytics para propietarios

## Patrones de Diseño Implementados

- **Factory Method**: Para la creación flexible de objetos de dominio (ej. propiedades, usuarios)
- **Singleton**: Para servicios globales como conexión a base de datos o configuración
- **Repository Pattern**: Para la abstracción de acceso a datos
- **Strategy Pattern**: Para lógica intercambiable, como filtros de búsqueda o métodos de pago

## Modelo Arquitectónico

- **Opción recomendada:** Microservicios
- **Justificación:** Permite escalar módulos de forma independiente, facilita el despliegue en cloud y la integración de nuevas funcionalidades sin afectar el sistema completo. Cada servicio puede ser stateless y desacoplado.

## Arquitectura Cloud-Native

- Servicios stateless
- Health checks en cada microservicio
- API Gateway para centralizar el acceso
- Middleware para autenticación, autorización y rate limiting
- Despliegue automatizado en Google Cloud Run

## Pasarelas de Pago

Plataforma integral para buscar, publicar y gestionar propiedades inmobiliarias
Chat en tiempo real entre usuarios y agentes para agilizar el contacto
Mapa interactivo (Google Maps) con filtros inteligentes y geolocalización
Panel de analytics para propietarios y agentes

Chat en tiempo real con agentes inmobiliarios
Soporte por correo electrónico y chatbot automatizado
Experiencia personalizada según el tipo de usuario (agente o comprador)

- Canvas de modelo de negocio documentado
  Equipo de desarrollo (frontend Next.js, backend NestJS)
  Diseñadores UX/UI
  Infraestructura cloud (Supabase, Google Cloud Run)
  APIs de mapas (Google Maps)
  Pasarelas de pago (Stripe, PayPal)

### Microservicios

Plataforma web responsive
Email y notificaciones push para alertas y recordatorios

```
 Personas que buscan propiedades para comprar o alquilar
 Agentes inmobiliarios que desean publicar y gestionar propiedades
│   ├── auth-service/
 Infraestructura cloud (Supabase, Google Cloud Run, almacenamiento, APIs de mapas)
 Comisiones de pasarelas de pago (Stripe, PayPal, MercadoPago)
 Costos de marketing digital y captación de usuarios/agentes
 Desarrollo, soporte y mantenimiento de la plataforma
│   ├── contracts/
 **Pago por publicación:** Los agentes pagan una tarifa única por publicar cada propiedad o pueden adquirir planes premium para publicar varias propiedades y acceder a funcionalidades avanzadas.
 **Planes destacados:** Los agentes pueden pagar para destacar sus propiedades en los resultados de búsqueda y aumentar su visibilidad.

**Comisión por transacción :** Si la plataforma intermedia el pago de la propiedad o alquiler, puede cobrar una comisión fija o porcentual por cada operación concretada. Esta comisión se retiene en la cuenta de la plataforma PropFinder como ingreso, y el resto del monto se transfiere al agente inmobiliario.

│   ├── k8s/
 El agente inmobiliario paga a la plataforma por publicar, destacar propiedades o acceder a planes premium.
 El usuario final (comprador/inquilino) accede gratis a la plataforma, pero puede pagar por servicios adicionales (por ejemplo, alertas premium o asesoría).
 Todos los pagos se procesan mediante Stripe, PayPal ; la plataforma recibe el dinero descontando la comisión de la pasarela.
Si la plataforma intermedia pagos de alquiler o venta, transfiere el monto al agente descontando su comisión. La comisión retenida permanece como ingreso de la plataforma para cubrir costos operativos y generar utilidad.
### Monolítico Modular (alternativa)

```

├── api-gateway/
├── core/
│ ├── domain/
│ ├── application/
│ └── infrastructure/
├── modules/
│ ├── auth/
│ ├── products/
│ ├── payments/
│ └── notifications/
├── shared/
│ ├── middleware/
│ ├── utils/
│ └── patterns/
└── docker/

```

## Entregables

1. **Código Fuente**: Repositorio GitHub público, ramas organizadas con GitFlow, commits descriptivos y pull requests documentados
2. **Documentación**: README, diagramas C4/arc42, ADRs, Swagger/OpenAPI, Business Model Canvas
3. **Calidad**: Reporte SonarQube, resultados de tests, coverage report, métricas de performance
4. **Despliegue**: URLs de la app desplegada, scripts de deployment, CI/CD, docs de infraestructura
5. **Presentación**: Demo en vivo, presentación técnica y Q&A

## Recursos y Herramientas

- Git/GitHub
- Docker & Docker Compose
- SonarQube
- Postman/Insomnia
- Google Cloud Run, Supabase, Vercel, Render, Railway
- Stripe, PayPal, MercadoPago (modo test)
- PlantUML, Structurizr, diagrams.net, arc42, Swagger

## Criterios de Éxito

- Funcionamiento local y en cloud
- Documentación clara y completa
- Cumplimiento de estándares de calidad
- Implementación de patrones requeridos
- Trabajo colaborativo
- Presentación profesional

---

## Nota sobre la Arquitectura

PropFinder puede implementarse bajo dos modelos arquitectónicos según las necesidades y proyección del equipo:

- **Monolítico modular:** recomendado para equipos pequeños, despliegue sencillo y menor complejidad inicial.
- **Microservicios:** recomendado para alta escalabilidad, despliegue independiente de módulos y equipos distribuidos.

La elección final debe justificarse en la documentación del proyecto. Todos los criterios de éxito, herramientas y buenas prácticas descritas en este documento aplican para ambos modelos arquitectónicos.

---

## Modelo de Negocio – Canvas: PropFinder

### Asociaciones Clave

- Pasarelas de pago (Stripe, PayPal)
- Proveedores de mapas: Google Maps
- Proveedores de correo (Supabase Messaging)

### Actividades Clave

- Desarrollo y mantenimiento de la plataforma
- Integración del mapa personalizado con filtros (zonas, precio, tipo de propiedad)
- Captación de usuarios y agentes
- Integración con pasarelas de pago y servicios de mapas

### Propuestas de Valor

- Plataforma integral para buscar y gestionar propiedades inmobiliarias
- Chat en tiempo real entre usuarios y agentes
- Mapa interactivo estilo Google Maps solo para propiedades, con filtros inteligentes y geolocalización

### Relación con los Clientes

- Chat en tiempo real con agentes
- Soporte por correo y chatbot

### Recursos Clave

- Equipo de desarrollo (frontend, backend)
- Diseñadores UX/UI
- Infraestructura en la nube
- APIs de mapas (Google Maps)

### Canales

- Plataforma web

### Segmentos de Clientes

- Personas que buscan propiedades para comprar o alquilar
- Agentes inmobiliarios

### Estructura de Costos

- Infraestructura cloud (hosting, bases de datos, APIs de mapas, almacenamiento)
- Comisiones de pasarelas de pago (Stripe, PayPal, MercadoPago)
- Costos de marketing y captación de usuarios
- Desarrollo y mantenimiento de la plataforma

### Fuentes de Ingresos y Lógica de Pago

- **Pago por publicación:** Los agentes pagan una tarifa única por publicar cada propiedad o pueden adquirir planes premium para publicar varias propiedades.
- **Planes destacados:** Los agentes pueden pagar para destacar sus propiedades en los resultados de búsqueda.
- **Comisión por transacción (opcional):** La plataforma puede cobrar una comisión fija o porcentual por cada operación concretada a través del portal.


### Relación económica plataforma-agente

- El agente paga a la plataforma por publicar o destacar propiedades.
- El usuario final (comprador/inquilino) no paga por usar la plataforma, solo por servicios adicionales si se ofrecen.
- Los pagos se procesan mediante Stripe, PayPal o MercadoPago y la plataforma recibe el dinero descontando la comisión de la pasarela.
- La plataforma puede transferir fondos al agente en caso de comisiones por transacción, descontando su porcentaje.
```

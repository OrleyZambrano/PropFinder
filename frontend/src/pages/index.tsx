import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
} from "@mui/material";

export default function Home() {
  return (
    <>
      <Navbar sx={{ position: "sticky", top: 0, zIndex: 1100 }} />
      {/* Banner principal */}
      <Box
        sx={{
          width: "100%",
          height: 260,
          background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          ¡Encuentra tu próximo hogar!
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Propiedades en venta y alquiler en todo el país
        </Typography>
        <Button
          href="/publicar"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ fontWeight: 600 }}
        >
          Publicar propiedad
        </Button>
      </Box>

      {/* Buscador y filtros */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            label="Ubicación"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 120 }}
          />
          <TextField
            label="Tipo"
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 120 }}
          />
          <TextField
            label="Precio máx."
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 120 }}
          />
          <Button variant="contained" color="primary">
            Buscar
          </Button>
        </Paper>
      </Container>

      {/* 10 propiedades más recientes */}
      <Container sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          10 propiedades más recientes
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 2,
            mt: 2,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <PropertyCard
              title="Casa Moderna"
              location="Ciudad Central"
              price={120000}
            />
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                bgcolor: "secondary.main",
                color: "white",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Nuevo
            </Box>
          </Box>
          <PropertyCard
            title="Departamento Familiar"
            location="Barrio Norte"
            price={95000}
          />
          <PropertyCard
            title="Ático con Vista"
            location="Costa Azul"
            price={135000}
          />
          <PropertyCard
            title="Casa de Campo"
            location="Valle Verde"
            price={88000}
          />
          <PropertyCard
            title="Loft Urbano"
            location="Centro Histórico"
            price={78000}
          />
          <PropertyCard
            title="Chalet con Jardín"
            location="Colinas del Sur"
            price={130000}
          />
          <PropertyCard
            title="Estudio Minimalista"
            location="Zona Universitaria"
            price={60000}
          />
          <PropertyCard
            title="Casa Colonial"
            location="Pueblo Antiguo"
            price={105000}
          />
          <PropertyCard
            title="Penthouse de Lujo"
            location="Skyline City"
            price={250000}
          />
          <PropertyCard
            title="Residencia Ejecutiva"
            location="Distrito Financiero"
            price={175000}
          />
        </Box>
      </Container>

      {/* Agentes destacados */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 6, mb: 6 }}>
        <Container>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Agentes destacados
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Paper sx={{ p: 2, textAlign: "center", minWidth: 220 }}>
              <Typography variant="h6">Ana Torres</Typography>
              <Typography variant="body2">Especialista en ventas</Typography>
              <Typography variant="body2">ana@email.com</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: "center", minWidth: 220 }}>
              <Typography variant="h6">Carlos Pérez</Typography>
              <Typography variant="body2">Alquileres y asesoría</Typography>
              <Typography variant="body2">carlos@email.com</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: "center", minWidth: 220 }}>
              <Typography variant="h6">Lucía Gómez</Typography>
              <Typography variant="body2">Propiedades premium</Typography>
              <Typography variant="body2">lucia@email.com</Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Testimonios */}
      <Container sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Testimonios
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Paper sx={{ p: 2, minWidth: 280 }}>
            <Typography variant="body1">
              “Encontré la casa perfecta gracias a PropFinder. El proceso fue
              rápido y sencillo.”
            </Typography>
            <Typography variant="subtitle2" align="right">
              - Juan M.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, minWidth: 280 }}>
            <Typography variant="body1">
              “Excelente atención y variedad de propiedades. ¡Muy recomendados!”
            </Typography>
            <Typography variant="subtitle2" align="right">
              - María L.
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Blog/Noticias */}
      <Container sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Blog y Noticias
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Paper sx={{ p: 2, minWidth: 280 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Tendencias del mercado inmobiliario 2025
            </Typography>
            <Typography variant="body2">
              Descubre las últimas tendencias y oportunidades para invertir en
              vivienda este año.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, minWidth: 280 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              ¿Cómo elegir tu primer hogar?
            </Typography>
            <Typography variant="body2">
              Consejos prácticos para compradores primerizos y familias jóvenes.
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Preguntas frecuentes */}
      <Container sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Preguntas frecuentes
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              ¿Cómo publico una propiedad?
            </Typography>
            <Typography variant="body2">
              Haz clic en el botón "Publicar propiedad" en la parte superior y
              completa el formulario.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              ¿Es gratis buscar propiedades?
            </Typography>
            <Typography variant="body2">
              Sí, puedes buscar y ver detalles de propiedades sin costo alguno.
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Mapa (simulado) */}
      <Box
        sx={{
          width: "100%",
          height: 300,
          bgcolor: "#e3e3e3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 6,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          [Aquí iría un mapa interactivo de propiedades]
        </Typography>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#1976d2", color: "white", py: 4, mt: 8 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6">PropFinder</Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <span style={{ fontSize: 24 }}>🌐</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <span style={{ fontSize: 24 }}>🐦</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <span style={{ fontSize: 24 }}>📸</span>
            </a>
          </Box>
          <Typography variant="body2">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

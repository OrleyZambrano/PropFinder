import { Container, Typography, Box } from "@mui/material";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";

export default function Propiedades() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Listado de Propiedades
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
          {/* 15 propiedades de ejemplo con datos variados */}
          <PropertyCard
            title="Casa en Venta"
            location="Ciudad Ejemplo"
            price={100000}
          />
          <PropertyCard
            title="Departamento Moderno"
            location="Ciudad Central"
            price={85000}
          />
          <PropertyCard
            title="Ático con Terraza"
            location="Costa Azul"
            price={120000}
          />
          <PropertyCard
            title="Casa de Campo"
            location="Valle Verde"
            price={95000}
          />
          <PropertyCard
            title="Dúplex Familiar"
            location="Barrio Norte"
            price={110000}
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
          <PropertyCard
            title="Casa con Piscina"
            location="Lago Azul"
            price={145000}
          />
          <PropertyCard
            title="Apartamento Estudio"
            location="Microcentro"
            price={70000}
          />
          <PropertyCard
            title="Casa para Remodelar"
            location="Barrio Antiguo"
            price={55000}
          />
          <PropertyCard
            title="Villa Exclusiva"
            location="Costa Dorada"
            price={320000}
          />
        </Box>
      </Container>
    </>
  );
}

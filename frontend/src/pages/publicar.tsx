import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Publicar() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, maxWidth: "sm" }}>
        <Typography variant="h4" gutterBottom>
          Publicar Propiedad
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <TextField label="Título" variant="outlined" required />
          <TextField label="Ubicación" variant="outlined" required />
          <TextField label="Precio" variant="outlined" required type="number" />
          <TextField
            label="Descripción"
            variant="outlined"
            multiline
            rows={3}
          />
          <Button variant="contained" color="primary">
            Publicar
          </Button>
        </Box>
      </Container>
    </>
  );
}

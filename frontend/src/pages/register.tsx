import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Link from "next/link";
import { useSupabaseAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const { register, error } = useSupabaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !nombre) {
      setMsg("Completa todos los campos obligatorios");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMsg("Email inválido");
      return;
    }
    if (password.length < 6) {
      setMsg("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    // Registrar usuario y guardar nombre en metadatos
    const res = await register(email, password, { nombre, apellido });
    if (res.user) setMsg("Registro exitoso. Revisa tu correo para confirmar.");
    else setMsg(error || "Error en el registro");
  }

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, maxWidth: "xs" }}>
        <Typography variant="h4" gutterBottom>
          Registro
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
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
          <TextField
            label="Nombre *"
            variant="outlined"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <TextField
            label="Email *"
            variant="outlined"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña *"
            variant="outlined"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Registrarse
          </Button>
          <Link href="/login" style={{ marginTop: 8, textAlign: "center" }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
          <div>{msg}</div>
        </Box>
      </Container>
    </>
  );
}

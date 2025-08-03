import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useSupabaseAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const { login, error } = useSupabaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Completa todos los campos");
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
    const res = await login(email, password);
    if (res.user) {
      setMsg("Login exitoso");
      setTimeout(() => router.push("/"), 1000); // Redirige al home tras 1s
    } else setMsg(error || "Error en el login");
  }

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, maxWidth: "xs" }}>
        <Typography variant="h4" gutterBottom>
          Iniciar Sesión
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
            label="Email"
            variant="outlined"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
          <Link href="/register" style={{ marginTop: 8, textAlign: "center" }}>
            ¿No tienes cuenta? Regístrate
          </Link>
          <div>{msg}</div>
        </Box>
      </Container>
    </>
  );
}

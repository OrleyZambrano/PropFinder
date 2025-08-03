import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

export default function AgentRequestPage() {
  const { user, loading } = useAuthContext();
  const [motivo, setMotivo] = useState("");
  const [msg, setMsg] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [solicitud, setSolicitud] = useState<any>(null);
  const [rol, setRol] = useState<string>("");

  // Consultar si ya tiene solicitud y su rol
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      // Obtener rol desde metadatos
      setRol(user?.user_metadata?.role || "");
      // Buscar solicitud existente
      const { data } = await supabase
        .from("agent_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setSolicitud(data);
    };
    fetchData();
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!motivo) {
      setMsg("Debes escribir un motivo");
      return;
    }
    setEnviando(true);
    // Insertar solicitud en Supabase (tabla agent_requests) con nombre y email
    const nombre = user.user_metadata?.nombre || "";
    const email = user.email || "";
    const { error } = await supabase
      .from("agent_requests")
      .insert([{ user_id: user.id, nombre, email, motivo }]);
    if (!error) {
      setMsg("Solicitud enviada. Un administrador la revisará.");
      setSolicitud({ motivo, estado: "pendiente" });
      setMotivo("");
    } else {
      setMsg("Error al enviar la solicitud: " + error.message);
    }
    setEnviando(false);
  }

  // Lógica de UI
  if (loading) return null;
  if (!user) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Alert severity="info">
            Debes iniciar sesión para solicitar ser agente.
          </Alert>
        </Container>
      </>
    );
  }
  if (rol === "agente") {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Alert severity="success">
            Ya eres agente. ¡Gracias por formar parte!
          </Alert>
        </Container>
      </>
    );
  }
  if (solicitud) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4, maxWidth: "xs" }}>
          <Alert severity="info">
            Ya enviaste una solicitud. Estado: <b>{solicitud.estado}</b>
            {solicitud.estado === "rechazada" && (
              <span> (puedes contactar a soporte para más información)</span>
            )}
          </Alert>
        </Container>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, maxWidth: "xs" }}>
        <Typography variant="h4" gutterBottom>
          Solicitud para ser agente
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
            label="¿Por qué quieres ser agente? *"
            variant="outlined"
            required
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            multiline
            minRows={3}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={enviando}
          >
            {enviando ? "Enviando..." : "Enviar solicitud"}
          </Button>
          {msg && (
            <Alert severity={msg.startsWith("Error") ? "error" : "success"}>
              {msg}
            </Alert>
          )}
        </Box>
      </Container>
    </>
  );
}

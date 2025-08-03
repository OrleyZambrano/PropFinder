import { Container, Typography, Box, Button, Alert } from "@mui/material";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Agentes() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [rol, setRol] = useState<string>("");
  const [solicitud, setSolicitud] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    setRol(user?.user_metadata?.role || "");
    const fetchSolicitud = async () => {
      const { data } = await supabase
        .from("agent_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setSolicitud(data);
    };
    fetchSolicitud();
  }, [user]);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Nuestros Agentes
        </Typography>

        {/* Botón para solicitar ser agente o estado */}
        <Box sx={{ my: 3 }}>
          {!loading && !user && (
            <>
              <Typography variant="body1" sx={{ mb: 1 }}>
                ¿Quieres ser agente? Debes iniciar sesión o registrarte primero.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => router.push("/login")}
              >
                Iniciar sesión
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => router.push("/register")}
              >
                Registrarse
              </Button>
            </>
          )}
          {!loading && user && rol === "agente" && (
            <Alert severity="success">Ya eres agente.</Alert>
          )}
          {!loading && user && rol !== "agente" && solicitud && (
            <Alert severity="info">
              Ya enviaste una solicitud para ser agente. Estado:{" "}
              <b>{solicitud.estado}</b>
            </Alert>
          )}
          {!loading && user && rol !== "agente" && !solicitud && (
            <Button
              variant="contained"
              color="success"
              onClick={() => router.push("/solicitar-agente")}
            >
              Quiero ser agente
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
          }}
        >
          {/* Ejemplo de tarjetas de agentes */}
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 250,
            }}
          >
            <Typography variant="h6">Agente 1</Typography>
            <Typography variant="body2">agente1@email.com</Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 250,
            }}
          >
            <Typography variant="h6">Agente 2</Typography>
            <Typography variant="body2">agente2@email.com</Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 250,
            }}
          >
            <Typography variant="h6">Agente 3</Typography>
            <Typography variant="body2">agente3@email.com</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

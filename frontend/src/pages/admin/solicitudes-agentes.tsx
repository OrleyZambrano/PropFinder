import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context/AuthContext";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Navbar from "../../components/Navbar";

export default function AdminSolicitudesAgentes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(false);
  const [msg, setMsg] = useState("");
  const { user, loading } = useAuthContext();
  const router = useRouter();

  const [noAdmin, setNoAdmin] = useState(false);
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.user_metadata?.role !== "admin") {
        setNoAdmin(true);
      }
    }
  }, [user, loading, router]);

  async function fetchSolicitudes() {
    setLoadingSolicitudes(true);
    setMsg("");
    try {
      // Obtener el token del usuario actual desde supabase
      const session = await import("@supabase/supabase-js")
        .then((m) =>
          m.createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || "",
            process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
          )
        )
        .then((client) => client.auth.getSession());
      const accessToken = session?.data?.session?.access_token;
      const res = await fetch("/api/agent-request-list", {
        headers: accessToken ? { "x-access-token": accessToken } : {},
      });
      const data = await res.json();
      const solicitudes = data.solicitudes || [];
      setSolicitudes(solicitudes);
    } catch (err) {
      setMsg("Error al cargar solicitudes: " + (err?.message || err));
    }
    setLoadingSolicitudes(false);
  }

  // Solo cargar una vez al entrar como admin
  useEffect(() => {
    // Solo cargar una vez cuando el usuario admin esté listo
    if (user && user.user_metadata?.role === "admin") {
      fetchSolicitudes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  async function handleAccion(id, accion) {
    let res;
    if (accion === "aceptar") {
      res = await fetch("/api/agent-request-aceptar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } else {
      res = await fetch("/api/agent-request-accion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, accion }),
      });
    }
    if (res.ok) {
      setMsg("Solicitud actualizada");
      fetchSolicitudes();
    } else {
      const data = await res.json();
      setMsg(data?.error || "Error al actualizar");
    }
  }

  if (noAdmin) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5" color="error" gutterBottom>
            Acceso denegado: solo administradores pueden ver esta página.
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Solicitudes de agentes
        </Typography>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={fetchSolicitudes}
            disabled={loadingSolicitudes}
          >
            {loadingSolicitudes ? "Cargando..." : "Recargar"}
          </Button>
          {msg}
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudes.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.user_id}</TableCell>
                  <TableCell>{s.nombre}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.motivo}</TableCell>
                  <TableCell>{s.estado || "pendiente"}</TableCell>
                  <TableCell>
                    {new Date(s.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {s.estado !== "aceptado" && (
                      <Button
                        color="success"
                        onClick={() => handleAccion(s.id, "aceptar")}
                      >
                        Aceptar
                      </Button>
                    )}
                    {s.estado !== "rechazado" && (
                      <Button
                        color="error"
                        onClick={() => handleAccion(s.id, "rechazar")}
                      >
                        Rechazar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

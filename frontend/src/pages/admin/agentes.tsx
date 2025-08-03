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

export default function AdminAgentes() {
  const [agentes, setAgentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { user, loading: loadingAuth } = useAuthContext();
  const router = useRouter();
  const [noAdmin, setNoAdmin] = useState(false);

  useEffect(() => {
    if (!loadingAuth) {
      if (!user) {
        router.replace("/login");
      } else if (user.user_metadata?.role !== "admin") {
        setNoAdmin(true);
      }
    }
  }, [user, loadingAuth, router]);

  async function fetchAgentes() {
    setLoading(true);
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
      // Consultar usuarios con rol agente
      const res = await fetch("/api/agent-list", {
        headers: accessToken ? { "x-access-token": accessToken } : {},
      });
      const data = await res.json();
      setAgentes(data.agentes || []);
    } catch (err) {
      setMsg("Error al cargar agentes: " + (err?.message || err));
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user && user.user_metadata?.role === "admin") {
      fetchAgentes();
    }
  }, [user?.id]);

  async function handleRetirarAgente(user_id) {
    setMsg("");
    const res = await fetch("/api/agent-retirar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id }),
    });
    if (res.ok) {
      setMsg("Rol de agente retirado");
      fetchAgentes();
    } else {
      const data = await res.json();
      setMsg(data?.error || "Error al retirar rol");
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
          Agentes activos
        </Typography>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Button variant="outlined" onClick={fetchAgentes} disabled={loading}>
            {loading ? "Cargando..." : "Recargar"}
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
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agentes.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.id}</TableCell>
                  <TableCell>{a.nombre}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleRetirarAgente(a.id)}
                    >
                      Retirar rol de agente
                    </Button>
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

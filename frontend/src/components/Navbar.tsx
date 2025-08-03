import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const { user } = useAuthContext();

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  const displayName = user?.user_metadata?.nombre || user?.email;

  return (
    <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PropFinder
        </Typography>
        <Box>
          <Link href="/" passHref legacyBehavior>
            <Button color="inherit" component="a">
              Inicio
            </Button>
          </Link>
          <Link href="/propiedades" passHref legacyBehavior>
            <Button color="inherit" component="a">
              Propiedades
            </Button>
          </Link>
          <Link href="/agentes" passHref legacyBehavior>
            <Button color="inherit" component="a">
              Agentes
            </Button>
          </Link>
          <Link href="/publicar" passHref legacyBehavior>
            <Button color="inherit" component="a">
              Publicar
            </Button>
          </Link>
          <Link href="/solicitar-agente" passHref legacyBehavior>
            <Button color="inherit" component="a">
              Quiero ser agente
            </Button>
          </Link>
          {user?.user_metadata?.role === "admin" && (
            <>
              <Link href="/admin/solicitudes-agentes" passHref legacyBehavior>
                <Button color="secondary" variant="contained" sx={{ ml: 1 }}>
                  Admin: Solicitudes agentes
                </Button>
              </Link>
              <Link href="/admin/agentes" passHref legacyBehavior>
                <Button color="secondary" variant="outlined" sx={{ ml: 1 }}>
                  Admin: Agentes activos
                </Button>
              </Link>
            </>
          )}
          {!user ? (
            <Link href="/login" passHref legacyBehavior>
              <Button color="inherit" component="a">
                Login
              </Button>
            </Link>
          ) : (
            <>
              <Button color="inherit" disabled sx={{ textTransform: "none" }}>
                {displayName}
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

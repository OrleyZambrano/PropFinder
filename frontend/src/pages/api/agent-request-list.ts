import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  try {
    // Obtener el token de sesión del usuario autenticado
    // Obtener el token enviado desde el frontend
    const accessToken = req.headers["x-access-token"];
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};
    console.log(
      "[agent-request-list] Haciendo fetch a backend con headers:",
      headers
    );
    const response = await fetch("http://localhost:3001/agent-requests", {
      headers,
    });
    console.log("[agent-request-list] Status backend:", response.status);
    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      console.log("[agent-request-list] Error al parsear JSON:", e);
    }
    console.log("[agent-request-list] Data recibida:", data);
    return res.status(200).json({ solicitudes: data });
  } catch (error) {
    console.log("[agent-request-list] Error en fetch:", error);
    return res.status(500).json({ error: "Error al conectar con el backend" });
  }
}

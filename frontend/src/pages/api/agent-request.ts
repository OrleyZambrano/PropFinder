import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  const { nombre, apellido, email, telefono } = req.body;
  if (!nombre || !email || !telefono) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  // Insertar solicitud en la tabla agent_requests
  const { error } = await supabase
    .from("agent_requests")
    .insert([{ nombre, apellido, email, telefono }]);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ ok: true });
}

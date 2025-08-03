import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  const { id, accion } = req.body;
  if (!id || !["aceptar", "rechazar"].includes(accion)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }
  if (accion === "rechazar") {
    const { error } = await supabase
      .from("agent_requests")
      .delete()
      .eq("id", id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ ok: true });
  } else if (accion === "aceptar") {
    const { error } = await supabase
      .from("agent_requests")
      .update({ estado: "aceptado" })
      .eq("id", id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ ok: true });
  }
  return res.status(400).json({ error: "Acción no válida" });
}

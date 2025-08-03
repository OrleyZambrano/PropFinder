import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "user_id requerido" });
  }
  // Cambiar el rol del usuario a cliente
  const { error } = await supabase.auth.admin.updateUserById(user_id, {
    user_metadata: { rol: "cliente" },
  });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ ok: true });
}

import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  // Usar service_role key para permisos de admin
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
    "";
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await supabaseAdmin
    .from("agent_requests")
    .select("user_id, nombre, email, estado")
    .eq("estado", "aceptado");
  console.log("[agent-list] Datos recibidos de agent_requests:", data);
  if (error) {
    console.log("[agent-list] Error en consulta:", error.message);
    return res.status(500).json({ error: error.message });
  }
  // Agrupar por user_id único, tomar el registro más reciente
  const agentesMap = {};
  (data || []).forEach((a) => {
    if (!agentesMap[a.user_id]) {
      agentesMap[a.user_id] = {
        id: a.user_id,
        nombre: a.nombre,
        email: a.email,
      };
    }
  });
  const agentes = Object.values(agentesMap);
  console.log("[agent-list] Agentes únicos a retornar:", agentes);
  return res.status(200).json({ agentes });
}

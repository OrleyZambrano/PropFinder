import { Controller, Post, Body, Req } from "@nestjs/common";
import { Request } from "express";
import { createClient } from "@supabase/supabase-js";

@Controller("agent-request-aceptar")
export class AgentRequestAceptarController {
  @Post()
  async aceptar(@Body() body: any, @Req() req: Request) {
    const { id } = body;
    console.log("ID recibido:", id);
    if (!id) {
      console.log("ID inválido");
      return { error: "ID inválido" };
    }
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    console.log("SUPABASE_SERVICE_ROLE_KEY usado:", serviceRoleKey);
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Obtener datos de la solicitud (incluyendo user_id)
    const { data, error: getError } = await supabase
      .from("agent_requests")
      .select("user_id, motivo, estado")
      .eq("id", id)
      .single();
    console.log("Datos obtenidos:", data, "Error:", getError);
    if (getError || !data) {
      console.log("Solicitud no encontrada");
      return { error: "Solicitud no encontrada" };
    }
    // Actualizar el rol del usuario a 'agente' en Supabase Auth
    const { error: updateUserError } = await supabase.auth.admin.updateUserById(
      data.user_id,
      { user_metadata: { rol: "agente" } }
    );
    if (updateUserError) {
      console.log(
        "Error al actualizar rol de usuario:",
        updateUserError.message
      );
      return { error: updateUserError.message };
    }
    // Actualizar estado a aceptado
    const { error: updateError } = await supabase
      .from("agent_requests")
      .update({ estado: "aceptado" })
      .eq("id", id);
    console.log("Resultado update estado:", updateError);
    if (updateError) {
      console.log("Error al actualizar estado:", updateError.message);
      return { error: updateError.message };
    }
    return { ok: true };
  }
}

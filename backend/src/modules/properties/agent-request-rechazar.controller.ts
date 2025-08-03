import { Controller, Post, Body, Req } from "@nestjs/common";
import { Request } from "express";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

@Controller("agent-request-rechazar")
export class AgentRequestRechazarController {
  @Post()
  async rechazar(@Body() body: any, @Req() req: Request) {
    const { id } = body;
    if (!id) {
      return { error: "ID inválido" };
    }
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_KEY || "";
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Obtener datos de la solicitud
    const { data, error: getError } = await supabase
      .from("agent_requests")
      .select("nombre, apellido, email")
      .eq("id", id)
      .single();
    if (getError || !data) {
      return { error: "Solicitud no encontrada" };
    }
    // Eliminar la solicitud
    const { error: deleteError } = await supabase
      .from("agent_requests")
      .delete()
      .eq("id", id);
    if (deleteError) {
      return { error: deleteError.message };
    }
    // Enviar correo de rechazo
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: data.email,
        subject: "Solicitud rechazada",
        text: `Hola ${data.nombre}, lamentamos informarte que tu solicitud para ser agente ha sido rechazada.`,
      });
    } catch (err) {
      return { error: "Error al enviar el correo de rechazo" };
    }
    return { ok: true };
  }
}

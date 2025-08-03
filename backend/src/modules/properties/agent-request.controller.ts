import { Controller, Get, Post, Body, Req } from "@nestjs/common";
import { Request } from "express";
import { createClient } from "@supabase/supabase-js";

@Controller("agent-requests")
export class AgentRequestController {
  @Post()
  async create(
    @Body()
    body: { user_id: string; nombre: string; email: string; motivo: string },
    @Req() req: Request
  ) {
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_KEY || "";
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    let supabaseClient = createClient(supabaseUrl, supabaseKey);
    if (authHeader) {
      let jwt = "";
      if (typeof authHeader === "string") {
        jwt = authHeader.replace("Bearer ", "");
      } else if (Array.isArray(authHeader)) {
        jwt = authHeader[0].replace("Bearer ", "");
      }
      supabaseClient = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: `Bearer ${jwt}` } },
      });
    }
    const { user_id, nombre, email, motivo } = body;
    const { error } = await supabaseClient
      .from("agent_requests")
      .insert([{ user_id, nombre, email, motivo }]);
    if (error) {
      return { error: error.message };
    }
    return { ok: true };
  }
  @Get()
  async findAll(@Req() req: Request) {
    console.log("[agent-requests] Petición recibida");
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_KEY || "";
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    let supabaseClient = createClient(supabaseUrl, supabaseKey);
    if (authHeader) {
      let jwt = "";
      if (typeof authHeader === "string") {
        jwt = authHeader.replace("Bearer ", "");
      } else if (Array.isArray(authHeader)) {
        jwt = authHeader[0].replace("Bearer ", "");
      }
      // Log temporal para depuración
      console.log("JWT recibido en /agent-requests:", jwt);
      try {
        const payload = JSON.parse(
          Buffer.from(jwt.split(".")[1], "base64").toString()
        );
        console.log("Payload JWT:", payload);
      } catch (e) {
        console.log("No se pudo decodificar el JWT");
      }
      supabaseClient = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: `Bearer ${jwt}` } },
      });
    }
    const { data, error } = await supabaseClient
      .from("agent_requests")
      .select("*")
      .eq("estado", "pendiente");
    if (error) {
      return { error: error.message };
    }
    return data;
  }
}

import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller("demo")
export class DemoController {
  @Get("agente")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("AGENTE")
  getAgente(@Req() req: { user: any }) {
    return { message: "Solo agentes pueden ver esto", user: req.user };
  }

  @Get("cliente")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("CLIENTE")
  getCliente(@Req() req: { user: any }) {
    return { message: "Solo clientes pueden ver esto", user: req.user };
  }

  @Get("publico")
  getPublico() {
    return { message: "Cualquiera puede ver esto" };
  }
}

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateUser(
    email: string,
    password: string
  ): { id: number; email: string; role: UserRole } | null {
    // Simulación: usuario agente y cliente
    if (email === "agente@demo.com" && password === "1234") {
      return { id: 1, email, role: "AGENTE" };
    }
    if (email === "cliente@demo.com" && password === "1234") {
      return { id: 2, email, role: "CLIENTE" };
    }
    return null;
  }

  login(user: { id: number; email: string; role: UserRole }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

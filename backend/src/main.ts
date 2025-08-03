import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { DemoController } from "./modules/users/demo.controller";
import { AgentRequestController } from "./modules/properties/agent-request.controller";
import { AgentRequestAceptarController } from "./modules/properties/agent-request-aceptar.controller";

@Module({
  imports: [AuthModule],
  controllers: [
    DemoController,
    AgentRequestController,
    AgentRequestAceptarController,
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  console.log("Servidor escuchando en http://localhost:3001");
}
bootstrap();

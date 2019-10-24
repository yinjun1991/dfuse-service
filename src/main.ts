import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export interface Global {
  fetch: any,
  WebSocket: any,
}

declare var global: Global;

global.fetch = require("node-fetch");
global.WebSocket = require("ws");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

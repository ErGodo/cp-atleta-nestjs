import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from 'firebase-functions/v2/https';
import { AppModule } from './app.module';

let cachedServer: express.Express;

async function bootstrap(): Promise<express.Express> {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.enableCors();
    await app.init();
    cachedServer = expressApp;
  }
  return cachedServer;
}

export const api = functions.onRequest(async (req, res) => {
  const server = await bootstrap();
  server(req, res);
});
import {
  Injectable,
  NestMiddleware,
  OnApplicationShutdown,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private static logFilePath = path.join(__dirname, '../../logs/app.log');
  private static maxFileSize = 51200;

  logRequest(req: Request): void {
    const log = `[${new Date().toISOString()}] Request: ${req.method} ${
      req.url
    } - Body: ${JSON.stringify(req.body)} - Query: ${JSON.stringify(
      req.query,
    )}\n`;
    this.writeToFile(log);
  }

  logResponse(res: Response): void {
    const log = `[${new Date().toISOString()}] Response: ${res.statusCode}\n`;
    this.writeToFile(log);
  }

  logError(message: string): void {
    const errorLog = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    this.writeToFile(errorLog);
  }

  private writeToFile(message: string): void {
    fs.appendFileSync(LoggingService.logFilePath, message);
    if (
      fs.statSync(LoggingService.logFilePath).size > LoggingService.maxFileSize
    ) {
      this.rotateLog();
    }
  }

  private rotateLog(): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const rotatedPath = `${LoggingService.logFilePath}.${timestamp}`;
    fs.renameSync(LoggingService.logFilePath, rotatedPath);
  }

  onApplicationBootstrap() {
    process.on('uncaughtException', (err) => {
      this.logError(`Uncaught Exception: ${err.message}`);
    });
    process.on('unhandledRejection', (reason: any) => {
      this.logError(`Unhandled Rejection: ${reason}`);
    });
  }

  onApplicationShutdown() {
    console.log('Application is shutting down...');
    this.logError('Application shutting down gracefully.');
  }
}

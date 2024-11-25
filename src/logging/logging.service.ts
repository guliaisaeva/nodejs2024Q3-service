import {
  Injectable,
  OnApplicationShutdown,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';

@Injectable()
export class LoggingService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private static logDirectory = path.join(__dirname, '../../logs');
  private static logFilePath = path.join(
    LoggingService.logDirectory,
    'app.log',
  );
  private static maxFileSize = 51200; // 50KB

  constructor() {
    this.ensureLogDirectoryExists();
  }

  private ensureLogDirectoryExists(): void {
    if (!fs.existsSync(LoggingService.logDirectory)) {
      fs.mkdirSync(LoggingService.logDirectory, { recursive: true });
    }
  }

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
    try {
      fs.appendFileSync(LoggingService.logFilePath, message);
      const stats = fs.statSync(LoggingService.logFilePath);
      if (stats.size > LoggingService.maxFileSize) {
        this.rotateLog();
      }
    } catch (err) {
      console.error('Failed to write log:', err);
    }
  }

  private rotateLog(): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const rotatedPath = `${LoggingService.logFilePath}.${timestamp}`;
    try {
      fs.renameSync(LoggingService.logFilePath, rotatedPath);
    } catch (err) {
      console.error('Failed to rotate log file:', err);
    }
  }

  onApplicationBootstrap(): void {
    process.on('uncaughtException', (err) => {
      this.logError(`Uncaught Exception: ${err.message}`);
    });
    process.on('unhandledRejection', (reason: any) => {
      this.logError(`Unhandled Rejection: ${reason}`);
    });
  }

  onApplicationShutdown(): void {
    console.log('Application is shutting down...');
    this.logError('Application shutting down gracefully.');
  }
}

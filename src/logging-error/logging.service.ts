import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService extends Logger {
  logRequest(url: string, query: any, body: any) {
    this.log(
      `Request - URL: ${url}, Query: ${JSON.stringify(
        query,
      )}, Body: ${JSON.stringify(body)}`,
    );
  }

  logResponse(statusCode: number, url: string) {
    this.log(`Response - URL: ${url}, Status Code: ${statusCode}`);
  }

  logError(error: any) {
    this.error(`Error: ${error.message}`, error.stack);
  }
}

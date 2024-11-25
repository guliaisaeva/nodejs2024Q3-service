import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggingService } from '../logging/logging.service';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LoggingService],
  imports: [LoggingModule],
})
export class AuthModule {}

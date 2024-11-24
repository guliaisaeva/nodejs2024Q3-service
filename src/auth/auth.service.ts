import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly users = new Map<string, string>();
  private readonly accessSecret = process.env.ACCESS_SECRET || 'access_secret';
  private readonly refreshSecret =
    process.env.REFRESH_SECRET || 'refresh_secret';

  async signup(dto: SignupDto) {
    if (this.users.has(dto.login)) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    this.users.set(dto.login, hashedPassword);
    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto) {
    const storedPassword = this.users.get(dto.login);
    if (
      !storedPassword ||
      !(await bcrypt.compare(dto.password, storedPassword))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = jwt.sign({ login: dto.login }, this.accessSecret, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ login: dto.login }, this.refreshSecret, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, this.refreshSecret);
      const accessToken = jwt.sign(
        { login: payload['login'] },
        this.accessSecret,
        { expiresIn: '15m' },
      );
      return { accessToken, refreshToken };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}

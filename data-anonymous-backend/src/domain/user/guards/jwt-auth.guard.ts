import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly _jwtSecret: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this._jwtSecret = this.configService.get<string>('jwt.jwtSecret');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (!token) {
      throw new UnauthorizedException('no token provided');
    }

    const decoded = this.jwtService.decode(token);

    if (!decoded) {
      throw new UnauthorizedException('invalid token');
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: this._jwtSecret,
      });

      request.userId = payload.id;

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}

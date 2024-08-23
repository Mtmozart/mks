import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CacheService } from '../cache/cache.service';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './constant/constant';
import logger from 'src/logger';
import { JwtPayload } from './jwt.payload';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  jwtService: any;
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: IS_PUBLIC_KEY,
    });
  }
  private readonly logger = new Logger(JwtStrategy.name);

  async validate(request: Request) {
    const decoded = this.jwtService.decode(request);
    const user = await this.userService.validateUser(decoded);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

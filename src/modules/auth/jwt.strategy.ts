import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt.payloads';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private redisCache: CacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const redisToken = await this.cacheService.retrieveData(token);

    /*const user = await this.authService.validateUser(payload);


    if (!user) {
      throw new UnauthorizedException();
    }*/

    return user;
  }
}

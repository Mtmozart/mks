import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CacheService } from '../cache/cache.service';
import { Request } from 'express';
import { IS_PUBLIC_KEY, jwtConstants } from './constant/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private redisCache: CacheService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: IS_PUBLIC_KEY,
    });
  }

  async validate(request: Request) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not found in header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found in header');
    }

    const redisToken = await this.redisCache.retrieveData(authHeader);
    if (!authHeader || !redisToken) {
      throw new UnauthorizedException('Token not found or invalid in Redis');
    }
    console.log(authHeader);
    console.log('---------');
    console.log(redisToken);

    try {
      const payload = await this.jwtService.verifyAsync(redisToken, {
        secret: jwtConstants.secret,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Erro ao validar o token' + authHeader);
    }
    return true;
  }
}

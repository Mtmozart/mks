import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CacheService } from '../cache/cache.service';
import { Request } from 'express';
import { IS_PUBLIC_KEY, jwtConstants } from './constant/constant';
import logger from 'src/logger';

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
  private readonly logger = new Logger(JwtStrategy.name);

  async validate(request: Request) {
    const authHeader = request.headers.authorization;
    this.logger.log('me ajuda meu deus');
    console.log(`AuthHeader: ${authHeader}`);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Token not found in header');
      throw new UnauthorizedException('Token not found in header');
    }

    const token = authHeader.split(' ')[1];
    console.log(`Token: ${token}`);

    if (!token) {
      console.log('Token not found in header');
      throw new UnauthorizedException('Token not found in header');
    }

    const redisToken = await this.redisCache.retrieveData(authHeader);
    console.log(`Redis Token: ${redisToken}`);

    if (!redisToken) {
      console.log('Token not found or invalid in Redis');
      throw new UnauthorizedException('Token not found or invalid in Redis');
    }

    try {
      const payload = await this.jwtService.verifyAsync(redisToken, {
        secret: jwtConstants.secret,
      });

      request['user'] = payload;
    } catch (error) {
      console.log(`Error verifying JWT: ${error.message}`, error.stack);
      throw new UnauthorizedException('Error validating token');
    }

    return true;
  }
}

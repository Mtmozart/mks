import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/authDTO';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisCache: CacheService,
  ) {}

  async signIn(auth: AuthDTO): Promise<any> {
    const user = await this.userService.authenticate(auth.email, auth.password);
    const payload = { username: user.username, sub: user.id };
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    await this.redisCache.storeData(token.access_token);
    return token;
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/authDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(auth: AuthDTO): Promise<string> {
    const user = await this.userService.authenticate(auth.email, auth.password);
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { AuthDTO } from './dto/authDTO';

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(private userService: UserService) {}

  async singIn(auth: AuthDTO) {
    const user = await this.userService.authenticate(auth.email, auth.password);

    const payload = { username: user.name, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}

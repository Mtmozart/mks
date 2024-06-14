import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { PublicRoutes } from './constant/constant';
import { AuthDTO } from './dto/authDTO';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoutes()
  @HttpCode(HttpStatus.OK)
  @Post('Login')
  async singin(@Body() auth: AuthDTO) {
    return await this.authService.signIn(auth);
  }
}

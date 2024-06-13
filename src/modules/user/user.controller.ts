import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/request/create-user-dto';
import { UserService } from './user.service';
import { DefaultResponseDTO } from './dto/response/default-response-dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    return new DefaultResponseDTO(
      await this.userService.register(createUserDto),
    );
  }

  @Get('/id')
  async getProfile() {
    return 'hello';
  }

  @Patch('update/:userId')
  async update() {
    return 'olá';
  }

  @Delete('delete/:userId')
  async delete() {
    return 'this.authService.deleteAccount(userId, password);';
  }
}

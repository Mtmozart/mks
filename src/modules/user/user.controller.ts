import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get('/:id')
  async getProfile(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }
  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, updates: Partial<CreateUserDto>) {
    return await this.userService.update(id, updates);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}

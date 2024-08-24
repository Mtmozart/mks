import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/request/create-user-dto';
import { UserService } from './user.service';
import { DefaultResponseDTO } from './dto/response/default-response-dto';
import { PublicRoutes } from '../auth/constant/constant';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/request/update-user-dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @PublicRoutes()
  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    return new DefaultResponseDTO(
      await this.userService.register(createUserDto),
    );
  }
  @PublicRoutes()
  @Get('find-all')
  async findAll() {
    console.log('hello');
    return await this.userService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Get('/:id')
  @UseGuards(AuthGuard)
  async getProfile(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('update/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updates: UpdateUserDto) {
    return await this.userService.update(id, updates);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

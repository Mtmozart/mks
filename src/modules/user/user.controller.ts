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
import { AuthGuard } from '@nestjs/passport';

@PublicRoutes()
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

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getProfile(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updates: Partial<CreateUserDto>,
  ) {
    return await this.userService.update(id, updates);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

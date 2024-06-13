import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/request/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserValidation {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async userValidationCreate(createUserDto: CreateUserDto) {
    const userByEmail = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userByEmail) {
      throw new ConflictException('E-mail já cadastrado.');
    }
    const userByUsername = await this.usersRepository.findOne({
      where: {
        email: createUserDto.username,
      },
    });

    if (userByUsername) {
      throw new ConflictException('Nome de usuário já cadastrado.');
    }
  }
}

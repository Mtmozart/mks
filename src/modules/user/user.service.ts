import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user-dto';
import { UserValidation } from './validations/user-validation';
import { toUserEntity } from './factory/toUserEntity';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userValidate: UserValidation,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    await this.userValidate.userValidationCreate(createUserDto);
    const user = toUserEntity(createUserDto);
    const salt = await genSalt();
    user.password = await hash(user.password, salt);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updates: Partial<CreateUserDto>): Promise<User> {
    await this.usersRepository.update(id, updates);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

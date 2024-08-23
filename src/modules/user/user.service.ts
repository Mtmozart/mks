import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserValidation } from './validations/user-validation';
import { CreateUserDto } from './dto/request/create-user-dto';
import { toUserEntity } from './factory/toUserEntity';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtPayload } from '../auth/jwt.payload';

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
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    if (updates.password) {
      const salt = await genSalt();
      user.password = await hash(user.password, salt);
    }

    if (updates.email || updates.email) {
      await this.userValidate.userValidationCreate(updates);
    }
    return await this.usersRepository.save({ ...user, ...updates });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.delete(id);
  }

  async authenticate(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Acesso negado.');
    }
    return user;
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user || user.username !== payload.username) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

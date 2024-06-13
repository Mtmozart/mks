import { CreateUserDto } from '../dto/request/create-user-dto';
import { User } from '../entity/user.entity';

export function toUserEntity(createUserDto: CreateUserDto): User {
  const user = new User();
  user.name = createUserDto.name;
  user.username = createUserDto.username;
  user.email = createUserDto.email;
  user.password = createUserDto.password;
  user.phone = createUserDto.phone;

  return user;
}

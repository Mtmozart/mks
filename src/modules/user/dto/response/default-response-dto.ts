import { User } from '../../entity/user.entity';

export class DefaultResponseDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  id: string;

  constructor(user: User) {
    (this.id = user.id),
      (this.name = user.name),
      (this.username = this.username),
      (this.email = user.email),
      (this.password = user.password),
      (this.phone = user.phone);
  }
}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [User],
  ssl: false,
  synchronize: false,
};

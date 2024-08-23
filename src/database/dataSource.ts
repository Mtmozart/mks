import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfig } from 'src/config';
import { User } from 'src/modules/user/entity/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: EnvConfig.database.HOST_DB,
  port: EnvConfig.database.PORT_DB,
  username: 'postgres',
  password: '123',
  database: EnvConfig.database.NAME_DB,
  entities: [User],
  ssl: false,
  synchronize: true,
};

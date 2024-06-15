import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/dataSource';
import { UserModule } from './modules/user/user.module';
import { AppCacheModule } from './modules/cache/cache.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    AppCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}

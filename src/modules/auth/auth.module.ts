import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './auth.service';
import { AppCacheModule } from '../cache/cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AppCacheModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

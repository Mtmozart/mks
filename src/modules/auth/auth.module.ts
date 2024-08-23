import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './auth.service';
import { AppCacheModule } from '../cache/cache.module';
import { JwtStrategy } from './jwt.strategy';
import { EnvConfig } from 'src/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => AppCacheModule),
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: EnvConfig.jwt.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

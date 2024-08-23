import { SetMetadata } from '@nestjs/common';
import { EnvConfig } from 'src/config';

export const IS_PUBLIC_KEY = EnvConfig.jwt.secret;
export const PublicRoutes = () => SetMetadata(IS_PUBLIC_KEY, true);

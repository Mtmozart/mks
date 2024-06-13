import { SetMetadata } from '@nestjs/common';
export const jwtConstants = {
  secret: 'Esse vai ser o nosso segredinho',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const PublicRoutes = () => SetMetadata(IS_PUBLIC_KEY, true);

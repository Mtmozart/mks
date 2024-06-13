import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'É obrigatório informa o nome.' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'É obrigatório informa o nome de usuário.' })
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'É obrigatório informa o e-mail.' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, {
    message: 'É obrigatório que a senha tenha no mínimo 8 caracteres.',
  })
  @IsNotEmpty({ message: 'É obrigatório informa a senha.' })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'É obrigatório informa a telefone.' })
  @Matches(/^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/, {
    message: 'Número inválido, deve ser no formato (99) 99999-9999',
  })
  @IsNotEmpty({ message: 'É obrigatório informa um número de celular.' })
  phone: string;
}

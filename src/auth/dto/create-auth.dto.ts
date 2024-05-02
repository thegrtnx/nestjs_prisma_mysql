import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'admin@omega.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @ApiProperty({
    example: 'admin',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}

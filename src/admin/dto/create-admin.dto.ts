import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from '.prisma/client';

export class CreateAdminDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'omega omega',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'admin@omega.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @ApiProperty({
    example: '+234901048496',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: 'Admin', required: true })
  @IsNotEmpty()
  @MinLength(3)
  role: UserRole;

  @ApiProperty({
    example: 'admin',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}

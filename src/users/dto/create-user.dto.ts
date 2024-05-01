import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '.prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'ABC XYZ',
    required: true,
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '+234901048496',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: 'abc@xyz.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @ApiProperty({
    example: null,
    required: false,
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'User', required: true })
  @IsNotEmpty()
  @MinLength(3)
  role: UserRole;

  @ApiProperty({ example: 300, required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  membership_fee: string;

  @ApiProperty({
    example: '11, qwerty strees, dotcom road',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  address: string;
}

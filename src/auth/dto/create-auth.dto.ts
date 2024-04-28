import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({
    example: 'abc@xyz.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @ApiProperty({
    example: '****',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}

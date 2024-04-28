import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateGuarantorDto {
  @ApiProperty({
    example: 'ABC XYZ',
    required: true,
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '+234081031719102',
    required: true,
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: 'abc@xyz.com',
    required: true,
  })
  @MinLength(3)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '11, qwerty strees, dotcom road',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  address: string;

  UserID: string;
}

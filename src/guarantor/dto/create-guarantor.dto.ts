import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '11, qwerty street, dotcom road',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  address: string;

  @ApiProperty({
    example: 'Company XYZ',
    required: false,
  })
  @IsString()
  @IsOptional()
  placeOfWork: string;

  @ApiProperty({
    example: '123 Business St',
    required: false,
  })
  @IsString()
  @IsOptional()
  addressOfBusiness: string;

  @ApiProperty({
    example: '456 Home St',
    required: false,
  })
  @IsString()
  @IsOptional()
  homeAddress: string;

  @ApiProperty({
    example: '1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  telephone1: string;

  @ApiProperty({
    example: '0987654321',
    required: false,
  })
  @IsString()
  @IsOptional()
  telephone2: string;

  @ApiProperty({
    example: 'Manager',
    required: false,
  })
  @IsString()
  @IsOptional()
  positionHeld: string;

  @IsString()
  @IsNotEmpty()
  UserID: string;
}

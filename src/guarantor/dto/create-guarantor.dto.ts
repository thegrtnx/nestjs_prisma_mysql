import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Gender } from '@prisma/client';

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

  @ApiProperty({ example: 'Male', required: true })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    example: 'Nigeria',
    required: false,
  })
  @IsString()
  @IsOptional()
  nationality: string;

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
    example: '+2341234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  telephone1: string;

  @ApiProperty({
    example: '+2349087654321',
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
}

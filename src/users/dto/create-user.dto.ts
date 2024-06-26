import { ApiProperty } from '@nestjs/swagger';
import { Gender, Role, cardType } from '.prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Doe', required: true })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: 'John Jonathan', required: true })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  otherNames: string;

  @ApiProperty({ example: 'password123', required: false })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'Male', required: true })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ example: 'User', required: false })
  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @ApiProperty({ example: 'john@example.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @ApiProperty({ example: '123 Main St', required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ example: '1000', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  membership_fee: string;

  @ApiProperty({ example: 'Nigeria', required: false })
  @IsString()
  @IsOptional()
  nationality: string;

  @ApiProperty({ example: 'NIN', required: false })
  @IsEnum(cardType)
  @IsOptional()
  cardType: cardType;

  @ApiProperty({ example: '123 Home St', required: false })
  @IsString()
  @IsOptional()
  homeAddress: string;

  @ApiProperty({ example: '456 Office Rd', required: false })
  @IsString()
  @IsOptional()
  officeAddress: string;

  @ApiProperty({ example: '1234567890', required: false })
  @IsString()
  @IsOptional()
  telephone: string;

  @ApiProperty({ example: '34b9ed7a-3364-4285-8066-f4b1afca68e0', required: false })
  @IsString()
  @IsOptional()
  createdBy: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { Role, Gender, LoanType } from '@prisma/client';

export class CreatModeratorDto {
  @ApiProperty({
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  surname: string;

  @ApiProperty({
    example: 'Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  otherNames: string;

  @ApiProperty({
    example: 'admin@omega.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @ApiProperty({ example: 'Admin', required: true })
  @IsNotEmpty()
  @IsEnum(Role)
  @MinLength(3)
  role: Role;

  @ApiProperty({
    example: 'admin123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiProperty({ example: 'SalaryLoan', required: false })
  @IsNotEmpty()
  @IsEnum(LoanType)
  loanType: LoanType;

  @ApiProperty({ example: 'Male', required: false })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
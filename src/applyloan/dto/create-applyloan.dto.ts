import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { YesNo } from '.prisma/client'

export class CreateLoanApplicationDto {
  @ApiProperty({ example: 50000 })
  @IsNotEmpty()
  @IsNumber()
  loanAmount: number;

  @ApiProperty({ example: 2500 })
  @IsNotEmpty()
  @IsNumber()
  managementFee: number;

  @ApiProperty({ example: 3000 })
  @IsNotEmpty()
  @IsNumber()
  applicationFee: number;

  @ApiProperty({ example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  equity: number;

  @ApiProperty({ example: '02-04-2023' })
  @IsOptional()
  disbursedDate: Date;

  @ApiProperty({ example: '9 months' })
  @IsNotEmpty()
  @IsString()
  loanTenure: string;

  @ApiProperty({ example: 1500 })
  @IsNotEmpty()
  @IsNumber()
  preLoanAmount?: number;

  @ApiProperty({ example: '6 months' })
  @IsOptional()
  @IsString()
  preLoanTenure?: string;

  @ApiProperty({ example: '123 Main St, City' })
  @IsNotEmpty()
  @IsString()
  officeAddress: string;

  @ApiProperty({ example: '01-06-2023' })
  @IsOptional()
  salaryDate?: Date;

  @ApiProperty({ example: 50000 })
  @IsOptional()
  @IsNumber()
  salaryAmount?: number;

  @ApiProperty({ example: 'ABC Bank' })
  @IsNotEmpty()
  @IsString()
  bankName: string;

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  bankAccNumber: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsEnum(YesNo)
  outstandingLoans: YesNo;
}

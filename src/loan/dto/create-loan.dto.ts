import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({ example: 'Personal Loan', description: 'The name of the loan category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1000, description: 'The amount associated with the loan category' })
  @IsOptional()
  @IsNumber()
  amount?: number;
}

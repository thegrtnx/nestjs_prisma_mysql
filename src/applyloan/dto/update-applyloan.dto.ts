import { PartialType } from '@nestjs/swagger';
import { CreateLoanApplicationDto } from './create-applyloan.dto';

export class UpdateLoanApplicationDto extends PartialType(CreateLoanApplicationDto) {}

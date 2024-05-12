import { Module } from '@nestjs/common';
import { LoanApplicationService } from './applyloan.service';
import { LoanApplicationController } from './applyloan.controller';

@Module({
  providers: [LoanApplicationService],
  controllers: [LoanApplicationController]
})
export class ApplyloanModule {}

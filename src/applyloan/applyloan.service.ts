import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanApplicationDto } from './dto/create-applyloan.dto';
import { UpdateLoanApplicationDto } from './dto/update-applyloan.dto';

@Injectable()
export class LoanApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createLoanApplicationDto: CreateLoanApplicationDto,
    moderatorId: string,
    userId: string,
  ) {
    const {
      loanAmount,
      managementFee,
      applicationFee,
      equity,
      disbursedDate,
      loanTenure,
      preLoanAmount,
      preLoanTenure,
      officeAddress,
      salaryDate,
      salaryAmount,
      bankName,
      bankAccNumber,
      outstandingLoans,
    } = createLoanApplicationDto;

    const parsedDisbursedDate = moment(disbursedDate, 'MM-DD-YYYY').toISOString();
    const parsedSalaryDate = salaryDate ? moment(salaryDate, 'MM-DD-YYYY').toISOString() : null;
  
    return this.prisma.loanApplication.create({
      data: {
        loanAmount,
        managementFee,
        applicationFee,
        equity,
        disbursedDate: parsedDisbursedDate,
        loanTenure,
        preLoanAmount,
        preLoanTenure,
        officeAddress,
        salaryDate: parsedSalaryDate,
        salaryAmount,
        bankName,
        bankAccNumber,
        outstandingLoans,
        moderatorId,
        user: {
          connect: {
            id: userId
          }
        }
      },
    });
  }

  async findAll() {
    return this.prisma.loanApplication.findMany();
  }

  async findOne(id: string) {
    return this.prisma.loanApplication.findUnique({ where: { id } });
  }

  async update(id: string, updateLoanApplicationDto: UpdateLoanApplicationDto) {
    return this.prisma.loanApplication.update({
      where: { id },
      data: updateLoanApplicationDto,
    });
  }

  async remove(id: string) {
    return this.prisma.loanApplication.delete({ where: { id } });
  }
}
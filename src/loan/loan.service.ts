import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanCategory } from '.prisma/client';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async create(createLoanDto: CreateLoanDto): Promise<LoanCategory> {
    const { name, amount } = createLoanDto;
    return this.prisma.loanCategory.create({ data: { name, amount } });
  }

  async findAll(): Promise<LoanCategory[]> {
    return this.prisma.loanCategory.findMany();
  }

  async findOne(id: string): Promise<LoanCategory> {
    const loanCategory = await this.prisma.loanCategory.findUnique({ where: { id } });
    if (!loanCategory) {
      throw new NotFoundException('Loan category not found');
    }
    return loanCategory;
  }

  async update(id: string, updateLoanDto: UpdateLoanDto): Promise<LoanCategory> {
    const { name, amount } = updateLoanDto;
    return this.prisma.loanCategory.update({ where: { id }, data: { name, amount } });
  }

  async remove(id: string): Promise<LoanCategory> {
    return this.prisma.loanCategory.delete({ where: { id } });
  }
}

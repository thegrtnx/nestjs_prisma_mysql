import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';


@ApiTags('Loan Categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
@Controller('loan-categories')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loan category' })
  @ApiBody({ type: CreateLoanDto })
  async create(@Body() createLoanCategoryDto: CreateLoanDto) {
    return this.loanService.create(createLoanCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all loan categories' })
  async findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a loan category by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string) {
    return this.loanService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a loan category by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateLoanDto })
  async update(@Param('id') id: string, @Body() updateLoanCategoryDto: UpdateLoanDto) {
    return this.loanService.update(id, updateLoanCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a loan category by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async remove(@Param('id') id: string) {
    return this.loanService.remove(id);
  }
}

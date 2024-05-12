import { Body, Controller, Post, UseGuards, Get, Param, Delete, ParseUUIDPipe, Patch } from '@nestjs/common';
import { LoanApplicationService } from './applyloan.service';
import { CreateLoanApplicationDto } from './dto/create-applyloan.dto';
import { UpdateLoanApplicationDto } from './dto/update-applyloan.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Request } from 'express';

@ApiTags('Loan Applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
@Controller('loan-application')
export class LoanApplicationController {
  constructor(private readonly loanApplicationService: LoanApplicationService) {}

  @Post('/:userId')
  @ApiOperation({ summary: 'Create a new loan application' })
  @ApiResponse({
    status: 201,
    description: 'The loan application has been created successfully.',
  })
  async create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createLoanApplicationDto: CreateLoanApplicationDto,
    @Body('moderatorId', ParseUUIDPipe) moderatorId: string,
  ) {
    // const moderatorId = (req.user as any).user.createdBy;
    return this.loanApplicationService.create(
      createLoanApplicationDto,
      moderatorId,
      userId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all loan applications' })
  @ApiResponse({ status: 200, description: 'List of loan applications retrieved successfully.' })
  async findAll() {
    return this.loanApplicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a loan application by ID' })
  @ApiResponse({ status: 200, description: 'Loan application retrieved successfully.' })
  async findOne(@Param('id') id: string) {
    return this.loanApplicationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a loan application' })
  @ApiResponse({ status: 200, description: 'Loan application updated successfully.' })
  async update(
    @Param('id') id: string,
    @Body() updateLoanApplicationDto: UpdateLoanApplicationDto,
  ) {
    return this.loanApplicationService.update(id, updateLoanApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a loan application' })
  @ApiResponse({ status: 200, description: 'Loan application deleted successfully.' })
  async remove(@Param('id') id: string) {
    return this.loanApplicationService.remove(id);
  }
}
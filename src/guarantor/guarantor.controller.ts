import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GuarantorService } from './guarantor.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { UpdateGuarantorDto } from './dto/update-guarantor.dto';

@ApiTags('guarantor')
@Controller('guarantor')
export class GuarantorController {
  constructor(private readonly guarantorService: GuarantorService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Endpoint for creating guarantor' })
  create(@Body() createGuarantorDto: CreateGuarantorDto) {
    return this.guarantorService.create(createGuarantorDto);
  }

  @Get()
  findAll() {
    return this.guarantorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guarantorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuarantorDto: UpdateGuarantorDto,
  ) {
    return this.guarantorService.update(id, updateGuarantorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guarantorService.remove(id);
  }
}

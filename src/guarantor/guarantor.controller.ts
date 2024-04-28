import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GuarantorService } from './guarantor.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { UpdateGuarantorDto } from './dto/update-guarantor.dto';
import { Me } from 'src/auth/guards/me/me.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@ApiTags('Guarantors')
@Controller('guarantor')
export class GuarantorController {
  constructor(private readonly guarantorService: GuarantorService) {}

  @Post('signup')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: 'Endpoint for creating guarantor' })
  create(@Me() me, @Body() createGuarantorDto: CreateGuarantorDto) {
    return this.guarantorService.create({
      ...createGuarantorDto,
      UserID: me.user.id,
    });
  }

  @Get('')
  @ApiOperation({ summary: 'Endpoint for getting all guarantors' })
  findAll() {
    return this.guarantorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint for getting a guarantor by id' })
  findOne(@Param('id') id: string) {
    return this.guarantorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Endpoint for updating a guarantor by id' })
  update(
    @Param('id') id: string,
    @Body() updateGuarantorDto: UpdateGuarantorDto,
  ) {
    return this.guarantorService.update(id, updateGuarantorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Endpoint for deleting a guarantor by id' })
  remove(@Param('id') id: string) {
    return this.guarantorService.remove(id);
  }
}

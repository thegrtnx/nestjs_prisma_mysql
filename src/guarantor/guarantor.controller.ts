import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GuarantorService } from './guarantor.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { UpdateGuarantorDto } from './dto/update-guarantor.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Guarantors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('defaultBearerAuth')
@Controller('guarantor')
export class GuarantorController {
  constructor(private readonly guarantorService: GuarantorService) {}

  @Post('create/:userId')
  @ApiOperation({ summary: 'Create guarantors for a specific user' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pictures', maxCount: 3 },
      { name: 'cardFronts', maxCount: 3 },
      { name: 'cardBacks', maxCount: 3 },
    ]),
  )
  async createForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() guarantors: CreateGuarantorDto[],
    @UploadedFiles()
    files: {
      pictures?: Express.Multer.File[];
      cardFronts?: Express.Multer.File[];
      cardBacks?: Express.Multer.File[];
    },
  ) {
    return this.guarantorService.createForUser(
      userId,
      guarantors,
      files.pictures,
      files.cardFronts,
      files.cardBacks,
    );
  }

  @Get('')
  @ApiOperation({ summary: 'Get all guarantors' })
  findAll() {
    return this.guarantorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a guarantor by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.guarantorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a guarantor by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGuarantorDto: UpdateGuarantorDto,
  ) {
    return this.guarantorService.update(id, updateGuarantorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a guarantor by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.guarantorService.remove(id);
  }
}

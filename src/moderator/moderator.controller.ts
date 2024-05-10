import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ModeratorService } from './moderator.service';
import { CreatModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { handleResponse } from 'src/util/responseHandler';

@ApiTags('Moderators')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
@Controller('moderators')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post('')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Endpoint for creating moderator' })
  async create(@Body() createModeratorDto: CreatModeratorDto) {
    try {
      return await this.moderatorService.create(createModeratorDto);
    } catch (error) {
      throw new HttpException('Failed to create moderator', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Endpoint for getting all moderators' })
  async findAll() {
    try {
      return await this.moderatorService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch moderators', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Endpoint for getting a moderator by ID' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.moderatorService.findOne(id);
    } catch (error) {
      throw new HttpException('Failed to fetch moderator', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Endpoint for updating a moderator' })
  async update(@Param('id') id: string, @Body() updateModeratorDto: UpdateModeratorDto) {
    try {
      return await this.moderatorService.update(id, updateModeratorDto);
    } catch (error) {
      throw new HttpException('Failed to update moderator', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Endpoint for deleting a moderator' })
  async remove(@Param('id') id: string) {
    try {
      return await this.moderatorService.remove(id);
    } catch (error) {
      throw new HttpException('Failed to delete moderator', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@ApiTags('Customers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
@Controller('customer')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiOperation({ summary: 'Endpoint for creating user' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'cardFront', maxCount: 1 },
      { name: 'cardBack', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles()
    files?: {
      picture?: Express.Multer.File;
      cardFront?: Express.Multer.File;
      cardBack?: Express.Multer.File;
    },
  ) {
    if (files && files.picture && files.cardFront && files.cardBack) {
      const { picture, cardFront, cardBack } = files;
      return this.usersService.create(
        createUserDto,
        picture[0],
        cardFront[0],
        cardBack[0],
      );
    } else {
      return this.usersService.create(createUserDto, null, null, null);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Endpoint for getting all users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint for getting a user by id',
  })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/user/:email')
  @ApiOperation({
    summary: 'Endpoint for getting a user by email',
  })
  async findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint for updating a user by id',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'cardFront', maxCount: 1 },
      { name: 'cardBack', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles()
    files?: {
      picture?: Express.Multer.File;
      cardFront?: Express.Multer.File;
      cardBack?: Express.Multer.File;
    },
  ) {
    if (files && files.picture && files.cardFront && files.cardBack) {
      const { picture, cardFront, cardBack } = files;
      return this.usersService.update(
        id,
        updateUserDto,
        picture[0],
        cardFront[0],
        cardBack[0],
      );
    } else {
      return this.usersService.update(id, updateUserDto, null, null, null);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint for deleting a user by id',
  })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

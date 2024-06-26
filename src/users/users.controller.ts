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
  Req,
} from '@nestjs/common';
import { Request } from 'express';
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
      { name: 'cardImage', maxCount: 1 },
      { name: 'photograph', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles()
    files: {
      cardImage?: Express.Multer.File[];
      photograph?: Express.Multer.File[];
    },
    @Req() req: Request,
  ) {
    // console.log(req);
    const moderatorId = (req.user as any).user.id;
    const { cardImage, photograph } = files;
    return this.usersService.create(
      createUserDto,
      cardImage?.[0],
      photograph?.[0],
      moderatorId
    );
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
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const moderatorId = (req.user as any).user.id;
    return this.usersService.findOne(id, moderatorId);
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
      { name: 'cardImage', maxCount: 1 },
      { name: 'photograph', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles()
    files: {
      cardImage?: Express.Multer.File[];
      photograph?: Express.Multer.File[];
    },
    @Req() req: Request
  ) {
    const moderatorId = (req.user as any).user.id;
    const { cardImage, photograph } = files;
    return this.usersService.update(
      id,
      updateUserDto,
      cardImage?.[0],
      photograph?.[0],
      moderatorId
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint for deleting a user by id',
  })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

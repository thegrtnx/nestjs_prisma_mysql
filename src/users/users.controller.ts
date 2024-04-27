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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Customers')
@Controller('customer')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Endpoint for creating user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Endpoint for getting all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint for getting a user by id',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint for updating a user by id',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint for deleting a user by id',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

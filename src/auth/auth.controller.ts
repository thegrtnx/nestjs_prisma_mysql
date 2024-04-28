import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthUserDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() authUserDto: AuthUserDto) {
    authUserDto.password = undefined;
    return authUserDto;
  }

  @Post('register')
  @ApiOperation({ summary: 'Endpoint for registering admin' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiOperation({ summary: 'Endpoint for viewing user profile' })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Request() req) {
    return req.user;
  }
}

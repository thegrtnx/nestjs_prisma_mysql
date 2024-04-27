import { Body, Controller, Post, Request, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Endpoint for signing admin' })
  login(@Request() req) {
    return req.user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Endpoint for registering admin' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Endpoint for viewing user profile' })
  profile(@Request() req) {
    return req.user;
  }
}

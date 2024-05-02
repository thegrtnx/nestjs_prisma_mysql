import { Controller, Post, Request, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthUserDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Me } from './guards/me/me.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Endpoint for signin-in admin' })
  @Post('login')
  @ApiBody({ type: AuthUserDto })
  async login(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Endpoint for viewing user profile' })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Me() me) {
    return me;
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { handleResponse } from 'src/util/responseHandler';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user.data.user) {
        return new handleResponse(HttpStatus.NOT_FOUND, 'User not found');
      }

      const hashedPassword = await bcrypt.compare(
        password,
        user.data.user.password,
      );

      if (!hashedPassword) {
        return new handleResponse(HttpStatus.UNAUTHORIZED, 'Invalid password');
      }

      const accessToken = this.jwtService.sign({ user: user.data.user });

      return new handleResponse(HttpStatus.OK, 'User Login Successful', {
        access_token: accessToken,
      });
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error in validateUser:', error);
      return new handleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'An error occurred during user validation',
      );
    }
  }
}

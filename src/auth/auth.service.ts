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
    const user = await this.userService.findOneByEmail(email);

    const hashedPassword = await bcrypt.compare(password, user.data.user.password);

    if (!hashedPassword) return false;
    const accessToken = this.jwtService.sign({
      user: user.data.user,
    });

    return new handleResponse(HttpStatus.OK, 'User Login Successfull', {
      access_token: accessToken,
    });
  }
}

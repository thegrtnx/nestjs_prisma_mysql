import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthUserDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    //return email + ' ---- ' + password;

    const user = await this.userService.findOneByEmail(email);

    if (user.data.user.password !== password) return false;
    return user;
  }

  sign(user: Users) {
    return this.jwtService.sign({ sub: user.id, email: user.email });
  }

  async registerUser(CreateUserDto: CreateUserDto) {
    const newUser = await this.userService.create(CreateUserDto);
    //return this.sign(newUser);
    return newUser;
  }
}

import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private userService: UsersService;
  constructor(private moduleRef: ModuleRef) {
    this.userService = this.moduleRef.get(UsersService, { strict: false });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user.password !== password) return false;
    return user;
  }
  registerUser(CreateUserDto: CreateUserDto) {}
}

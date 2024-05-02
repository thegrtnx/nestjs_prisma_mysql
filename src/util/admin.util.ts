import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminUtil {
  constructor(private prisma: PrismaService) {}

  async createAdminUser(name: string, email: string, password: string) {
    const number = '';
    return this.prisma.users.create({
      data: {
        name,
        email,
        password,
        role: 'Admin',
        number,
      },
    });
  }
}

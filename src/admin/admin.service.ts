import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(adminCreateDto: CreateAdminDto) {
    const { email, password } = adminCreateDto;

    const existingAdmin = await this.prisma.users.findUnique({ where: { email } });

    if (existingAdmin) {
      throw new HttpException('Admin with this email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const admin = await this.prisma.users.create({
        data: {
          ...adminCreateDto,
          password: hashedPassword,
          role: Role.Admin,
        },
      });

      return admin;
    } catch (error) {
      throw new HttpException('Failed to create admin', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.prisma.users.findMany({
      where: {
        role: 'Admin',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({ where: { id, role: 'Admin' } });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const { password } = updateAdminDto;

    try {
      const existingAdmin = await this.prisma.users.findUnique({
        where: { id, role: 'Admin' },
      });

      if (!existingAdmin) {
        throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateAdminDto.password = hashedPassword;
      }

      const updatedAdmin = await this.prisma.users.update({
        data: updateAdminDto,
        where: { id, role: 'Admin' },
      });
      return updatedAdmin;
    } catch (error) {
      throw new HttpException(
        'Failed to update admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedAdmin = await this.prisma.users.delete({
        where: { id, role: 'Admin' },
      });
      return deletedAdmin;
    } catch (error) {
      throw new HttpException(
        'Failed to delete admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

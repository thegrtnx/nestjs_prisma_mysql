import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  create(createAdminDto: CreateAdminDto) {
    return this.prisma.users.create({ data: createAdminDto });
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

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.prisma.users.update({
      data: updateAdminDto,
      where: { id, role: 'Admin' },
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({ where: { id, role: 'Admin' } });
  }
}

import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { PrismaService } from 'lib/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';

@Injectable()
export class ModeratorService {
  constructor(private prisma: PrismaService) { }

  async create(moderatorCreateDto: CreatModeratorDto) {
    const { email, password } = moderatorCreateDto;

    const existingModerator = await this.prisma.users.findUnique({ where: { email } });

    if (existingModerator) {
      throw new HttpException('Moderator with this email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const moderator = await this.prisma.users.create({
        data: {
          ...moderatorCreateDto,
          password: hashedPassword,
          role: Role.Moderator,
        },
      });

      return moderator;
    } catch (error) {
      throw new HttpException('Failed to create moderator', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.prisma.users.findMany({
      where: {
        role: 'Moderator',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({ where: { id, role: 'Moderator' } });
  }

  async update(id: string, updateModeratorDto: UpdateModeratorDto) {
    const { password } = updateModeratorDto;

    try {
      const existingAdmin = await this.prisma.users.findUnique({
        where: { id, role: 'Moderator' },
      });

      if (!existingAdmin) {
        throw new HttpException('Moderator not found', HttpStatus.NOT_FOUND);
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateModeratorDto.password = hashedPassword;
      }

      const updatedAdmin = await this.prisma.users.update({
        data: UpdateModeratorDto,
        where: { id, role: 'Moderator' },
      });
      return updatedAdmin;
    } catch (error) {
      throw new HttpException(
        'Failed to update Moderator',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedAdmin = await this.prisma.users.delete({
        where: { id, role: 'Moderator' },
      });
      return deletedAdmin;
    } catch (error) {
      throw new HttpException(
        'Failed to delete Moderator',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

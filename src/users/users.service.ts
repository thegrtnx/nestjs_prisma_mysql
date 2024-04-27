import { Injectable, HttpStatus } from '@nestjs/common';
import { handleResponse } from 'src/util/responseHandler';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({ data: createUserDto }).then(() => {
      return new handleResponse(HttpStatus.OK, 'User Created Successfully', {
        ...createUserDto,
        password: undefined,
      });
    });
  }

  findAll() {
    return this.prisma.users.findMany().then((users) => {
      return new handleResponse(
        HttpStatus.OK,
        'All users fetched successfully',
        {
          ...users,
          password: undefined,
        },
      );
    });
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({ data: updateUserDto, where: { id } });
  }

  remove(id: string) {
    return this.prisma.users.delete({ where: { id } });
  }
}

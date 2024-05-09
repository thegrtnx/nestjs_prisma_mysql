import { Injectable, HttpStatus } from '@nestjs/common';
import { handleResponse } from 'src/util/responseHandler';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserRole } from '.prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto, cardImage: Express.Multer.File, photograph: Express.Multer.File) {
    const { ...userData } = createUserDto;
    const user = await this.prisma.users.create({
      data: {
        ...userData,
        role: UserRole.User,
      },
    });

    let cardUrl: string | null = null;
    let photographUrl: string | null = null;

    if (cardImage)
      cardUrl = await this.uploadImageToCloudinary(cardImage);

    if (photograph)
      photographUrl = await this.uploadImageToCloudinary(photograph);

    await this.updateUserImages(user.id, cardUrl, photographUrl);

    return new handleResponse(HttpStatus.CREATED, 'User Created Successfully', {
      ...user,
      cardUrl,
      photographUrl,
    });
  }

  async findAll() {
    return this.prisma.users
      .findMany({
        where: {
          role: {
            not: 'Admin',
          },
        },
        select: {
          id: true,
          surname: true,
          otherNames: true,
          email: true,
          homeAddress: true,
          officeAddress: true,
          telephone: true,
          membership_fee: true,
          cardUrl: true,
          photographUrl: true,
        },
      })
      .then((users) => {
        return new handleResponse(HttpStatus.OK, 'All users fetched successfully', users);
      });
  }

  async findOne(id: string) {
    return this.prisma.users.findUniqueOrThrow({ where: { id } });
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    return new handleResponse(HttpStatus.OK, 'User fetched successfully', {
      user,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto, cardImage: any, photograph: any) {
    const { role, ...userData } = updateUserDto;
    const user = await this.prisma.users.update({
      data: {
        ...userData,
        role: role ? role : UserRole.User,
      },
      where: { id },
    });

    let cardUrl: string | null = null;
    let photographUrl: string | null = null;

    if (cardImage)
      cardUrl = await this.uploadImageToCloudinary(cardImage);

    if (photograph)
      photographUrl = await this.uploadImageToCloudinary(photograph);

    await this.updateUserImages(user.id, cardUrl, photographUrl);

    return user;
  }

  remove(id: string) {
    return this.prisma.users.delete({ where: { id } });
  }

  private async updateUserImages(id: string, cardUrl: string, photographUrl: string) {
    const data: Record<string, any> = {};

    if (cardUrl) {
      data.cardUrl = cardUrl;
    }

    if (photographUrl) {
      data.photographUrl = photographUrl;
    }

    await this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async uploadImageToCloudinary(file: any): Promise<string | null> {
    try {
      if (!file) return null;

      const imageUrl = await this.cloudinaryService.uploadImage(file);

      return imageUrl.secure_url;
    } catch (error) {
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
    }
  }
}

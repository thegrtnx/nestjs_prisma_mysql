import { Injectable, HttpStatus } from '@nestjs/common';
import { handleResponse } from 'src/util/responseHandler';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Role } from '.prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    cardImage: Express.Multer.File,
    photograph: Express.Multer.File,
    moderatorId: string,
  ) {
    const { ...userData } = createUserDto;

    const user = await this.prisma.users.create({
      data: {
        ...userData,
        role: Role.User,
        createdBy: moderatorId,
      },
    });

    let cardUrl: string | null = null;
    let photographUrl: string | null = null;
    if (cardImage) cardUrl = await this.uploadImageToCloudinary(cardImage);
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
    // const moderatorId = req.user['id'];
    return this.prisma.users
      .findMany({
        where: {
          role: {
            not: Role.Admin,
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
          createdBy: true
        },
      })
      .then((users) => {
        return new handleResponse(
          HttpStatus.OK,
          'All users fetched successfully',
          users,
        );
      });
  }

  async findOne(id: string, moderatorId: string) {
    return this.prisma.users.findFirstOrThrow({
      where: {
        id,
        createdBy: moderatorId,
      },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    return new handleResponse(HttpStatus.OK, 'User fetched successfully', {
      user,
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    cardImage: any,
    photograph: any,
    moderatorId: string
  ) {
    const { role, ...userData } = updateUserDto;

    const user = await this.prisma.users.updateMany({
      where: {
        id,
        createdBy: moderatorId,
      },
      data: {
        ...userData,
        role: role ? role : Role.User,
      },
    });

    let cardUrl: string | null = null;
    let photographUrl: string | null = null;
    if (cardImage)
      cardUrl = await this.uploadImageToCloudinary(cardImage);
    if (photograph)
      photographUrl = await this.uploadImageToCloudinary(photograph);

    await this.updateUserImages(id, cardUrl, photographUrl);

    return user;
  }

  remove(id: string) {
    return this.prisma.users.deleteMany({
      where: {
        id,
      },
    });
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

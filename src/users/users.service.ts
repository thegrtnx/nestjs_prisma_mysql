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

  async create(
    createUserDto: CreateUserDto,
    picture: Express.Multer.File,
    cardFront: Express.Multer.File,
    cardBack: Express.Multer.File,
  ) {
    const { ...userData } = createUserDto;
    const user = await this.prisma.users.create({
      data: {
        ...userData,
        role: UserRole.User,
      },
    });
  
    let pictureUrl: string | null = null;
    let cardFrontUrl: string | null = null;
    let cardBackUrl: string | null = null;
  
    if (picture) {
      pictureUrl = await this.uploadImageToCloudinary(picture);
    }
  
    if (cardFront) {
      cardFrontUrl = await this.uploadImageToCloudinary(cardFront);
    }
  
    if (cardBack) {
      cardBackUrl = await this.uploadImageToCloudinary(cardBack);
    }
  
    await this.updateUserImages(user.id, pictureUrl, cardFrontUrl, cardBackUrl);
  
    return new handleResponse(HttpStatus.OK, 'User Created Successfully', {
      ...user,
      pictureUrl,
      cardFrontUrl,
      cardBackUrl,
    });
  }

  findAll() {
    return this.prisma.users
      .findMany({
        where: {
          role: {
            not: 'Admin',
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          number: true,
          address: true,
          membership_fee: true,
          pictureUrl: true,
          cardFrontUrl: true,
          cardBackUrl: true,
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

  async findOne(id: string) {
    return this.prisma.users.findUniqueOrThrow({ where: { id } });
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    return new handleResponse(HttpStatus.OK, 'User fetched successfully', {
      user,
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    picture: any,
    cardFront: any,
    cardBack: any,
  ) {
    const { role, ...userData } = updateUserDto;
    const user = await this.prisma.users.update({
      data: {
        ...userData,
        role: role ? role : UserRole.User,
      },
      where: { id },
    });

    const pictureUrl = picture
      ? await this.uploadImageToCloudinary(picture)
      : null;
    const cardFrontUrl = cardFront
      ? await this.uploadImageToCloudinary(cardFront)
      : null;
    const cardBackUrl = cardBack
      ? await this.uploadImageToCloudinary(cardBack)
      : null;

    await this.updateUserImages(id, pictureUrl, cardFrontUrl, cardBackUrl);

    return user;
  }

  remove(id: string) {
    return this.prisma.users.delete({ where: { id } });
  }

  private async updateUserImages(
    id: string,
    pictureUrl: string,
    cardFrontUrl: string,
    cardBackUrl: string,
  ) {
    const data: Record<string, any> = {};
  
    if (pictureUrl) {
      data.pictureUrl = pictureUrl;
    }
  
    if (cardFrontUrl) {
      data.cardFrontUrl = cardFrontUrl;
    }
  
    if (cardBackUrl) {
      data.cardBackUrl = cardBackUrl;
    }
  
    await this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async uploadImageToCloudinary(file: any): Promise<string | null> {
    try {
      if (!file) return null;
      // console.log('Uploading file to Cloudinary:', file);

      const imageUrl = await this.cloudinaryService.uploadImage(file);
      // console.log('Uploaded image URL:', imageUrl);

      return imageUrl.secure_url;
    } catch (error) {
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
    }
  }
}

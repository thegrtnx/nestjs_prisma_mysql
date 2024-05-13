import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { UpdateGuarantorDto } from './dto/update-guarantor.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Guarantors } from '@prisma/client';

@Injectable()
export class GuarantorService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createGuarantor(
    userId: string,
    createGuarantorDto: CreateGuarantorDto,
    cardImage?: Express.Multer.File,
    photograph?: Express.Multer.File,
  ) {
    const {
      name,
      email,
      gender,
      nationality,
      address,
      placeOfWork,
      addressOfBusiness,
      homeAddress,
      telephone1,
      telephone2,
      positionHeld,
    } = createGuarantorDto;

    let cardUrl: string | null = null;
    let photographUrl: string | null = null;

    if (cardImage) {
      cardUrl = await this.uploadImageToCloudinary(cardImage);
    }

    if (photograph) {
      photographUrl = await this.uploadImageToCloudinary(photograph);
    }

    const createdGuarantor = await this.prisma.guarantors.create({
      data: {
        name,
        email,
        address,
        gender,
        nationality,
        placeOfWork,
        addressOfBusiness,
        homeAddress,
        telephone1,
        telephone2,
        positionHeld,
        cardUrl,
        photographUrl,
        guranted_for: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return createdGuarantor;
  }

  async getGuarantorsByUserId(userId: string): Promise<Guarantors[]> {
    return this.prisma.guarantors.findMany({
      where: {
        UserID: userId,
      },
    });
  }

  findAll() {
    return this.prisma.guarantors.findMany();
  }

  findOne(id: string) {
    return this.prisma.guarantors.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateGuarantorDto: UpdateGuarantorDto,
    cardImage?: Express.Multer.File,
    photograph?: Express.Multer.File,
  ) {
    const {
      name,
      email,
      address,
      gender,
      nationality,
      placeOfWork,
      addressOfBusiness,
      homeAddress,
      telephone1,
      telephone2,
      positionHeld,
    } = updateGuarantorDto;
  
    let cardUrl: string | null = null;
    let photographUrl: string | null = null;
  
    if (cardImage) {
      cardUrl = await this.uploadImageToCloudinary(cardImage);
    }
  
    if (photograph) {
      photographUrl = await this.uploadImageToCloudinary(photograph);
    }
  
    const updatedGuarantor = await this.prisma.guarantors.update({
      where: { id },
      data: {
        name,
        email,
        address,
        gender,
        nationality,
        placeOfWork,
        addressOfBusiness,
        homeAddress,
        telephone1,
        telephone2,
        positionHeld,
        ...(cardUrl ? { cardUrl } : {}),
        ...(photographUrl ? { photographUrl } : {}),
      },
    });
  
    return updatedGuarantor;
  }

  async remove(id: string) {
    return this.prisma.guarantors.delete({ where: { id } });
  }

  async uploadImageToCloudinary(file: any): Promise<string | null> {
    try {
      if (!file)
        return null;

      const imageUrl = await this.cloudinaryService.uploadImage(file);
      return imageUrl.secure_url;
    } catch (error) {
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
    }
  }
}

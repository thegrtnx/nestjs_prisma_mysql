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

  async createForGuarantors(
    userId: string,
    guarantors: CreateGuarantorDto[],
    pictures: Express.Multer.File[],
    cardFronts: Express.Multer.File[],
    cardBacks: Express.Multer.File[],
  ) {
    const createdGuarantors = await Promise.all(guarantors.map(async (guarantor, index) => {
      const { name, number, email, address } = guarantor;

      let pictureUrl: string | null = null;
      let cardFrontUrl: string | null = null;
      let cardBackUrl: string | null = null;

      if (pictures[index]) {
        pictureUrl = await this.uploadImageToCloudinary(pictures[index]);
      }

      if (cardFronts[index]) {
        cardFrontUrl = await this.uploadImageToCloudinary(cardFronts[index]);
      }

      if (cardBacks[index]) {
        cardBackUrl = await this.uploadImageToCloudinary(cardBacks[index]);
      }

      return this.prisma.guarantors.create({
        data: {
          name,
          number,
          email,
          address,
          pictureUrl,
          cardFrontUrl,
          cardBackUrl,
          UserID: userId,
        },
      });
    }));

    return createdGuarantors;
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
  
  update(id: string, updateGuarantorDto: UpdateGuarantorDto) {
    return this.prisma.guarantors.update({
      data: updateGuarantorDto,
      where: { id },
    });
  }
  
  remove(id: string) {
    return this.prisma.guarantors.delete({ where: { id } });
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

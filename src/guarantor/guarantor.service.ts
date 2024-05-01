import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { UpdateGuarantorDto } from './dto/update-guarantor.dto';
import { CloudinaryService } from 'src/util/cloudinaryUtil';

@Injectable()
export class GuarantorService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createForUser(userId: string, guarantors: CreateGuarantorDto[], pictures: Express.Multer.File[], cardFronts: Express.Multer.File[], cardBacks: Express.Multer.File[]) {

    const createdGuarantors = await Promise.all(guarantors.map(async (guarantor, index) => {
      const { name, number, email, address } = guarantor;
      
      const pictureUrl = pictures[index] ? await this.uploadImageToCloudinary(pictures[index]) : null;
      const cardFrontUrl = cardFronts[index] ? await this.uploadImageToCloudinary(cardFronts[index]) : null;
      const cardBackUrl = cardBacks[index] ? await this.uploadImageToCloudinary(cardBacks[index]) : null;

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

  async uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
    try {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      return imageUrl;
    } catch (error) {
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
    }
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
}

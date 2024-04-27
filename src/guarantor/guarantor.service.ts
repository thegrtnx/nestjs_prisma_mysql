import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { UpdateGuarantorDto } from './dto/update-guarantor.dto';

@Injectable()
export class GuarantorService {
  constructor(private prisma: PrismaService) {}

  create(createGuarantorDto: CreateGuarantorDto) {
    return this.prisma.guarantors.create({ data: createGuarantorDto });
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

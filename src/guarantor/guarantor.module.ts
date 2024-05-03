import { Module } from '@nestjs/common';
import { GuarantorService } from './guarantor.service';
import { GuarantorController } from './guarantor.controller';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [GuarantorController],
  providers: [GuarantorService, CloudinaryService],
})
export class GuarantorModule {}

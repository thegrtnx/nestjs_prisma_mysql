import { Module } from '@nestjs/common';
import { GuarantorService } from './guarantor.service';
import { GuarantorController } from './guarantor.controller';
import { CloudinaryService } from 'src/util/cloudinaryUtil';

@Module({
  controllers: [GuarantorController],
  providers: [GuarantorService, CloudinaryService],
})
export class GuarantorModule {}

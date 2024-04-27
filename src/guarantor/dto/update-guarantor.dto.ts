import { PartialType } from '@nestjs/swagger';
import { CreateGuarantorDto } from './create-guarantor.dto';

export class UpdateGuarantorDto extends PartialType(CreateGuarantorDto) {}

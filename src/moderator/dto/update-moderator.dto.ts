import { PartialType } from '@nestjs/swagger';
import { CreatModeratorDto } from './create-moderator.dto';

export class UpdateModeratorDto extends PartialType(CreatModeratorDto) {}

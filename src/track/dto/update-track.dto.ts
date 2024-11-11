import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsInt,
  ValidateIf,
} from 'class-validator';
import { CreateTrackDto } from './create.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ValidateIf((object, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  artistId?: string;

  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  albumId?: string | null;

  @ValidateIf((object, value) => value !== null)
  @IsInt()
  duration?: number;
}

import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsInt,
  IsUUID,
  ValidateIf,
  IsOptional,
} from 'class-validator';
import { CreateFavoritesDto } from './create.dto';

export class UpdateFavoritesDto extends PartialType(CreateFavoritesDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  artistId?: string | null;
}

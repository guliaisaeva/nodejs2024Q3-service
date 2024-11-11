import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { CreateArtistDto } from './create.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}

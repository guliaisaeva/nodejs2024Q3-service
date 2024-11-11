import {
  IsString,
  IsNotEmpty,
  IsUUID,
  ValidateIf,
  IsInt,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  @IsUUID(4, { each: true })
  artistId: string | null;
}

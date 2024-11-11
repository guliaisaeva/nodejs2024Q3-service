import {
  IsString,
  IsNotEmpty,
  IsUUID,
  ValidateIf,
  IsInt,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((object, value) => value !== null)
  @IsUUID(4, { each: true })
  @IsString()
  artistId: string;

  @ValidateIf((object, value) => value !== null)
  @IsUUID(4, { each: true })
  @IsString()
  albumId: string | null;

  @IsInt()
  duration: number;
}

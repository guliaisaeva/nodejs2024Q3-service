import { v4 as uuidv4 } from 'uuid';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { TArtist } from 'src/models/models';

export class Artist implements TArtist {
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;

  constructor(name: string, grammy: false) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }
}

import { IsNotEmpty, isString, IsString } from "class-validator";

export class CreateUserDto {
      @IsNotEmpty()
      @IsString()
      username: string;

      @IsString()
      displayName?: string;
}
import { IsBoolean, isBoolean, IsNotEmpty, IsOptional, isString, IsString, ValidateNested } from "class-validator";

export class CreateUserSettingsDto {
      @IsOptional()
      @IsBoolean()
      receiveNotifications?: boolean

      @IsOptional()
      @IsBoolean()
      receiveEmails?: boolean

      @IsOptional()
      @IsBoolean()
      receiveSMS?: boolean
}

export class CreateUserDto {
      @IsNotEmpty()
      @IsString()
      username: string;

      @IsString()
      @IsOptional()
      displayName?: string;

      @IsString()
      @IsNotEmpty()
      password: string

      @IsOptional()
      @ValidateNested()
      settings?: CreateUserSettingsDto
}

export class signInUserDto {
      @IsNotEmpty()
      @IsString()
      username: string

      @IsString()
      @IsNotEmpty()
      password: string
}
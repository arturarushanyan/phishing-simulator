import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SendPhishingEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  template: string;
} 
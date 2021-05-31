import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';


export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(10)
  password: string;

  @IsPhoneNumber()
  phone: string;
}

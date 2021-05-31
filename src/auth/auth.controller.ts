import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dto/login.dto';
import { SignUpDto } from 'src/dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }
}

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/dto/signup.dto';
import { SignUpUser } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from 'src/dto/login.dto';
import { JwtPayload } from 'src/jwtStrategy.ts/jwt-payload.interface';
import { uuid } from 'uuidv4';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SignUpUser)
    private signUpRepository: Repository<SignUpUser>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: SignUpDto) {
    const {name, email, password, phone } = authCredentialsDto;

    const user = new SignUpUser();
   user.id=uuid()
    user.name = name;
    user.email = email;
    user.password = await this.hashPassword(password, await bcrypt.genSalt());
    user.phone = phone;
    try {
      await this.signUpRepository.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('User Already Exist');
      else throw new InternalServerErrorException();
    }

    return {status:'User Successfully Register!',user_id:user.id};
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.signUpRepository.findOne({ email: email });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload);
        return { status: 'Login Successful!', Token: accessToken };
      } else {
        return { status: 'Wrong Credential!' };
      }
    } else {
      return { status: 'Wrong Credential!' };
    }
  }

  async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}

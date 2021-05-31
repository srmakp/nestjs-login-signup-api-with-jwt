import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { SignUpUser } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(SignUpUser)
    private signUpRepository: Repository<SignUpUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }
  async validate(payload: JwtPayload): Promise<SignUpUser> {
    const { email } = payload;
    const user = await this.signUpRepository.findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

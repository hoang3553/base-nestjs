import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(public readonly config: ConfigService) {
    super({
      clientID: config.get<string>('google.id'),
      clientSecret: config.get<string>('google.secret'),
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, _: string, profile: any, done: VerifyCallback) {
    const { name, emails, photos } = profile;
    const user = {
      accessToken,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
    done(null, user);
  }
}

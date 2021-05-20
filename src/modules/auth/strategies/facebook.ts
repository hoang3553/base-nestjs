import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

@Injectable()
export class FacebookStrategy {
  constructor(public readonly config: ConfigService) {
    this.init();
  }
  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: this.config.get<string>('facebook.id'),
          clientSecret: this.config.get<string>('facebook.secret'),
        },
        (_1, _2, _3: any, done: any) => {
          const user = {};
          return done(null, user);
        },
      ),
    );
  }
}

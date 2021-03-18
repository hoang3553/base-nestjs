import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

import { AuthModule } from './modules/auth/auth.module';
import { CatsModule } from './modules/cat/cats.module';
// import { UserModule } from './modules/user/user.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    // UserModule,
    CatsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      parser: I18nJsonParser,
      inject: [ConfigService],
    }),
    CatsModule,
  ],
})
export class AppModule {}

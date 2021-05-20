import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

import configuration from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CatsModule } from './modules/cat/cats.module';
import { UsersModule } from './modules/user/user.module';
import { queryBuilder } from './providers/queryBuilder';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CatsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
        connectionFactory: (connection) => {
          connection.plugin(queryBuilder);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: false,
        },
      }),
      parser: I18nJsonParser,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}

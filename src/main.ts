import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';

import { AppModule } from './app.module';
import { setupSwagger } from './viveo-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
        scriptSrc: ["'self'", "https: 'unsafe-inline'"],
      },
    },
  });

  //   app.use(
  //     RateLimit({
  //       windowMs: 15 * 60 * 1000, // 15 minutes
  //       max: 100, // limit each IP to 100 requests per windowMs
  //     }),
  //   );

  //   const reflector = app.get(Reflector);

  //   app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));

  const configService = app.get(ConfigService);

  if (
    ['development', 'staging'].includes(configService.get<string>('appEnv'))
  ) {
    setupSwagger(app);
  }

  const port = configService.get<string>('port');
  await app.listen(port);

  console.info(`server running on port ${port}`);
}

void bootstrap();

import { Global, HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AwsS3Service } from './services/aws-s3.service';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers = [ValidatorService, AwsS3Service, GeneratorService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}

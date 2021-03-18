import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { User, UserDocument } from './schemas/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private _model: Model<UserDocument>,
    public readonly validatorService: ValidatorService,
    public readonly awsS3Service: AwsS3Service,
  ) {}

  //   /**
  //    * Find single user
  //    */
  //   findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
  //     return this.userRepository.findOne(findData);
  //   }
  //   async findByUsernameOrEmail(
  //     options: Partial<{ username: string; email: string }>,
  //   ): Promise<UserEntity | undefined> {

  //     return queryBuilder.getOne();
  //   }

  async createUser(userRegisterDto: UserRegisterDto) {

  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const queryBuilder = this._model.createQueryBuilder('user');
    const [users, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
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

  /**
   * Find single user
   */
  async findOne(id): Promise<User> {
    return this._model.findById(id);
  }

  async findByUsernameOrEmail(
    options: Partial<{ email: string }>,
  ): Promise<User | undefined> {
    return this._model.findOne({
      email: options.email,
    });
  }

  async createUser(userRegisterDto: UserRegisterDto) {
    if (userRegisterDto.password) {
      userRegisterDto.password = bcrypt.hashSync(userRegisterDto.password);
    }
    return this._model.create(userRegisterDto);
  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const queryBuilder = this._model.createQueryBuilder('user');
    const [users, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }
}

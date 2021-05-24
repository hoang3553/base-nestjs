import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';

import { IModel } from '../../interfaces';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserPagingDto } from './dto/UserPagingDto';
import { User, USER_ROLES, UserDocument } from './schemas/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private _model: IModel<UserDocument>) {}

  /**
   * Find single user
   */
  async findOne(id): Promise<User> {
    return this._model.findById(id);
  }

  async findOneWithPassword(id): Promise<User> {
    return this._model.findById(id).select('+password');
  }

  async findByUsernameOrEmail(
    options: Partial<{ email: string }>,
  ): Promise<User | undefined> {
    return this._model
      .findOne({
        email: options.email,
      })
      .select('+password');
  }

  async updateOne(id, payload): Promise<User> {
    return this._model.findByIdAndUpdate(id, payload, { new: true });
  }

  async createUser(userRegisterDto: UserRegisterDto) {
    if (userRegisterDto.password) {
      userRegisterDto.password = bcrypt.hashSync(userRegisterDto.password);
    }
    // Default set role to CUSTOMER
    return this._model.create({
      ...userRegisterDto,
      role: USER_ROLES.CUSTOMER,
    });
  }

  getUsers(query): Promise<UserPagingDto> {
    return this._model.queryBuilder(query);
  }
}

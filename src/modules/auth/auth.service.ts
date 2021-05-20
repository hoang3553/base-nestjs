import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UtilsService } from '../../providers/utils.service';
import { UserService } from '../user/user.service';
import { User } from './../user/schemas/user.entity';
import { ChangePasswordDto, UserLoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,
    public readonly userService: UserService,
  ) {}

  createToken(data) {
    // eslint-disable-next-line @typescript-eslint/tslint/config
    const { _id, role, email, firstName, lastName } = data;
    return this.jwtService.sign({
      _id,
      email,
      role,
      firstName,
      lastName,
      id: _id,
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userService.findByUsernameOrEmail({
      email: userLoginDto.email,
    });
    const isPasswordValid = await UtilsService.validateHash(
      userLoginDto.password,
      user && user.password,
    );
    if (!user || !isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Email or password is incorrect',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    user.password = undefined;
    return user;
  }

  async changePassword(userId, body: ChangePasswordDto) {
    const user = await this.userService.findOneWithPassword(userId);
    const isPasswordValid = await UtilsService.validateHash(
      body.oldPassword,
      user && user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Password is incorrect',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashNewPassword = UtilsService.generateHash(body.newPassword);
    await this.userService.updateOne(userId, {
      password: hashNewPassword,
    });
    return { success: true };
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByUsernameOrEmail({ email });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const code = UtilsService.generateRandomString(4);
    // Set email expire date to 1 hour
    const expiryDate = new Date(new Date().setHours(new Date().getHours() + 1));
    await this.userService.updateOne(user._id, {
      resetPasswordToken: code,
      resetPasswordExpire: expiryDate.toISOString(),
    });
    return { message: 'Reset password email has been sent' };
  }
}

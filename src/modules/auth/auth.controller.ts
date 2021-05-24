import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import { UserService } from '../user/user.service';
import { User } from './../user/schemas/user.entity';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginPayloadDto,
  UserInfoDto,
  UserLoginDto,
  UserRegisterDto,
} from './dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    public readonly authService: AuthService,
    public readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(@Body() userLogin: UserLoginDto) {
    const user = await this.authService.validateUser(userLogin);
    const token = this.authService.createToken(user);
    return {
      accessToken: token,
      data: user,
      message: 'LOGIN_SUCCESS',
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<LoginPayloadDto> {
    const existUser = await this.userService.findByUsernameOrEmail({
      email: userRegisterDto.email,
    });
    if (existUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          messageCode: 'auth.email_used',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const createdUser = await this.userService.createUser(userRegisterDto);
    const token = this.authService.createToken(createdUser);
    // Remove password field when return data to client
    createdUser.password = undefined;
    return {
      accessToken: token,
      data: createdUser,
      message: 'LOGIN_SUCCESS',
    };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({ type: User, description: 'Current user info' })
  async getCurrentUser(@AuthUser() user): Promise<User> {
    return this.userService.findOne(user.id);
  }

  @Put('me')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({ type: User, description: 'Update user info' })
  async updateCurrentUser(
    @AuthUser() user,
    @Body() body: UserInfoDto,
  ): Promise<User> {
    return this.userService.updateOne(user.id, body);
  }

  @Put('/me/changePassword')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({
    description: 'Change password for authenticated user',
  })
  changePassword(@AuthUser() user, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(user.id, body);
  }

  @Post('/forgotPassword')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Send email forget password for particular email',
  })
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('/resetPassword')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Reset password for particular email',
  })
  resetPassword() {
    return true;
  }
}

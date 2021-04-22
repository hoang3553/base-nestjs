import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import { UserDto } from '../user/dto/UserDto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto, UserRegisterDto } from './dto';

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
  userLogin() {
    const token = this.authService.createToken(createdUser);
    return {
      accessToken: token,
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
    const createdUser = await this.userService.createUser(userRegisterDto);
    const token = this.authService.createToken(createdUser);
    return {
      accessToken: token,
      user: createdUser,
    };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user) {
    return user;
  }
}

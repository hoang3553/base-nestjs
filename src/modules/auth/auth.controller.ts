import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import { UserDto } from '../user/dto/UserDto';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  userLogin() {
    const token = this.authService.createToken();
    return {
      token,
    };
  }

  //   @Post('register')
  //   @HttpCode(HttpStatus.OK)
  //   @UseInterceptors(FileInterceptor('avatar'))
  //   async userRegister(
  //     @Body() userRegisterDto: UserRegisterDto,
  //   ): Promise<UserDto> {
  //     const createdUser = await this.userService.createUser(userRegisterDto);

  //     return createdUser.toDto();
  //   }

  @Get('me')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user) {
    return user;
  }
}

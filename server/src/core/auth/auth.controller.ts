import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorators';
import { ApiBearerAuth, ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthUser } from './auth.user.model';

export class LoginRequestDto {
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;
}

export class LoginResponseDto {

  public static Create(token: string): LoginResponseDto {
    const dto = new LoginResponseDto();
    dto.token = token;
    return dto;
  }

  @ApiProperty()
  token: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOkResponse({type: LoginResponseDto})
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: LoginRequestDto): Promise<LoginResponseDto> {
      const token = await this.authService.signIn(signInDto.email, signInDto.password);
      return LoginResponseDto.Create(token);
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async signOut(@Request() req: Request): Promise<void> {
      const bearerToken = (req.headers as any)['authorization'];
      if (bearerToken == null) throw new UnauthorizedException();

      var [_, token] = bearerToken.split(' ');
      await this.authService.signOut(token);
    }

    @ApiOkResponse({type: AuthUser})
    @ApiBearerAuth()
    @Get('session')
    getSession(@Request() req: any): AuthUser {
      return req.user;
    }
}

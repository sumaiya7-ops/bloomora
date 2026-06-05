import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Req() req) {
  return req.user;
}

@Post('login')
login(@Body() loginUserDto: LoginUserDto) {
  return this.usersService.login(
    loginUserDto.email,
    loginUserDto.password,
  );
}
}
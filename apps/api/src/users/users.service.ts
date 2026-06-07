import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}


async create(createUserDto: CreateUserDto) {
  const existingUser = await this.userModel.findOne({
    email: createUserDto.email,
  });

  if (existingUser) {
    throw new BadRequestException(
      'Email already exists',
    );
  }

  const hashedPassword = await bcrypt.hash(
    createUserDto.password,
    10,
  );

  const user = await this.userModel.create({
    ...createUserDto,
    password: hashedPassword,
  });

  return user;
}

async findByEmail(email: string) {
  return this.userModel.findOne({ email });
}

async login(email: string, password: string) {
  const user = await this.userModel.findOne({ email });

  if (!user) {
    throw new BadRequestException('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new BadRequestException('Invalid password');
  }

  const token = this.jwtService.sign({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    access_token: token,
  };
}
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ user: UserDocument; token: string }> {
    const user = await this.usersService.create(createUserDto);
    const token = this.generateToken(user);
    return { user, token };
  }

  async login(email: string, password: string): Promise<{ user: UserDocument; token: string }> {
    const user = await this.usersService.validateUser(email, password);
    const token = this.generateToken(user);
    return { user, token };
  }

  private generateToken(user: UserDocument): string {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }
} 
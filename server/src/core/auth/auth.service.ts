import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ITokenStore } from './ports/tokenstore.port';
import { IUserRepository } from '../users/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ITokenStore) private readonly tokenStore: ITokenStore) {}

  async signOut(token: string) {
    await this.tokenStore.removeToken(token);
  }

  async signIn(email: string, password: string): Promise<string> {
    
    const user = await this.userRepository.loadUserModelByEmail(email);
    if (user == null) throw new UnauthorizedException();

    await user.verifyPassword(password);
    
    var token = await this.generateAuthTokenForUser(user.userId());
    
    return token;
  }

  private async generateAuthTokenForUser(userId: string): Promise<string> {
    var token = uuidv4();
    await this.tokenStore.saveTokenForUser(userId, token);
    return token;
  }
}

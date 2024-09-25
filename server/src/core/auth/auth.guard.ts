
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.decorators';
import { AuthUser } from './auth.user.model';
import { ITokenStore } from './ports/tokenstore.port';
import { privateDecrypt } from 'crypto';
import { ILoadAuthUser } from './ports/auth.user.repository.port';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        @Inject(ITokenStore) private readonly tokenStore: ITokenStore,
        @Inject(ILoadAuthUser) private readonly authUserStore: ILoadAuthUser
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            // If decorated with @Public(), then always allow
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const originalToken = request.headers.authorization as string;

        if (!originalToken) {
            throw new UnauthorizedException();
        }

        const [_, token] = originalToken.split(' ');
        
        if (!token) {
            throw new UnauthorizedException();
        }
        
        try {
            var userId = await this.tokenStore.getUserIdForToken(token);
            if (userId == null) throw new UnauthorizedException();

            var user = await this.authUserStore.loadAuthUser(userId);
            request['user'] = user;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { DatabaseModule } from '../../infrastructure/persistence/database.module';
import { RedisModule } from '../../infrastructure/cache/cache.module';
import { UsersModule } from '../users/user.module';

@Module({
    imports: [UsersModule, DatabaseModule, RedisModule],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
          },],
    controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/user.module';
import { AppConfiguration } from './config/app.config';
import { SeedModule } from './infrastructure/seed/seed.module';
import { DatabaseModule } from './infrastructure/persistence/database.module';
import { RedisModule } from './infrastructure/cache/cache.module';
import { ConditionalModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    AppConfiguration,
    ConditionalModule.registerWhen(SeedModule, (env: NodeJS.ProcessEnv) => env['SEED_DATABASE'] === 'true'),
    RedisModule]
})
export class AppModule {}

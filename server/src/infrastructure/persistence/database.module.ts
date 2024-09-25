
import { Module } from '@nestjs/common';
import { repositoryProviders } from './repositories/repositories.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from '../../core/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DATABASE_HOST'),
        port: configService.getOrThrow<number>('DATABASE_PORT'),
        username: configService.getOrThrow<string>('DATABASE_USER'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
        database: configService.getOrThrow<string>('DATABASE_NAME'),
        entities: [
          __dirname + '/../../**/*.entity{.ts,.js}',
        ],
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE') || false,
        dropSchema: configService.get<boolean>('DATABASE_SYNCHRONIZE') || false,
        useUTC: true,
        namingStrategy: new SnakeNamingStrategy()
      }),
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [... repositoryProviders],
  exports: [...repositoryProviders],
})
export class DatabaseModule {}

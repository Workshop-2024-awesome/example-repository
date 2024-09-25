import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import * as redisStore from 'cache-manager-redis-store';
import { cachingProviders } from "./caching.providers";
import { RedisKeyValueStore } from "./redis.keyvalue.cache";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        CacheModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            isGlobal: true,
            store: redisStore,
            host: config.getOrThrow<string>('REDIS_HOST'),
            port: config.getOrThrow<number>('REDIS_PORT'),
            database: config.getOrThrow<number>('REDIS_DB')
          })
      })],
      providers: [
        RedisKeyValueStore,
        ...cachingProviders],
      exports: [...cachingProviders]
})
export class RedisModule {}

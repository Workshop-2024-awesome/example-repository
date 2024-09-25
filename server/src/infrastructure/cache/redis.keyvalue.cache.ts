import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject } from "@nestjs/common";
import { Cache } from "@nestjs/cache-manager";

export class RedisKeyValueStore {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    public async setValue<TValue>(key: string, value: TValue, ttl: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }

    public async getValue<TValue>(key: string): Promise<TValue | undefined> {
        var result = await this.cacheManager.get<TValue>(key);
        return result;
    }

    public async remove(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }
}
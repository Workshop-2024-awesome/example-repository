import { CACHE_MANAGER, CacheModule, Cache } from "@nestjs/cache-manager";
import { Test, TestingModule } from "@nestjs/testing";
import { TokenStore } from "./tokenstore.adapter";
import { ITokenStore } from "../../core/auth/ports/tokenstore.port";
import { RedisKeyValueStore } from "./redis.keyvalue.cache";
import * as redisStore from 'cache-manager-redis-store';
import { cachingProviders } from "./caching.providers";

describe('TokenStore', () => {

    let tokenStore: TokenStore;
    let module: TestingModule;
    let cacheManager: Cache;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [CacheModule.register({
                store: redisStore,
                host: 'localhost',
                port: 6379,
                database: 0
            })],
            providers: [...cachingProviders, RedisKeyValueStore]
        }).compile();

        tokenStore = module.get<TokenStore>(ITokenStore);
        cacheManager = module.get<Cache>(CACHE_MANAGER);
    });

    afterAll(async () => {
        // @ts-ignore
        const client = cacheManager.store.getClient()
        client.quit();

        await module.close();
    });

    it('should be defined', () => {
        expect(tokenStore).toBeDefined();
    });

    it('should add a value to redis', async () => {
        await tokenStore.saveTokenForUser("userId", "token");

        const userId = await cacheManager.get("token");
        expect(userId).toBeDefined();
        expect(userId).toBe("userId");
    });

    it('should get existing value from redis', async () => {
        await cacheManager.set("anotherToken", "anotherUserId");

        const userId = await tokenStore.getUserIdForToken("anotherToken");

        expect(userId).toBeDefined();
        expect(userId).toBe("anotherUserId");
    });

    it('should remove a token from redis', async () => {
        await cacheManager.set("removeToken", "removeUser");

        await tokenStore.removeToken("removeToken");

        const userId = await cacheManager.get("removeToken");

        expect(userId).toBeNull();
    });
});
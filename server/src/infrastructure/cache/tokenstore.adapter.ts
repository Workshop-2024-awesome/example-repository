import { ITokenStore } from "src/core/auth/ports/tokenstore.port";
import { RedisKeyValueStore } from "./redis.keyvalue.cache";
import { Inject } from "@nestjs/common";

export class TokenStore implements ITokenStore {

    private static TTL: number = 1_000 * 3_600 * 24; // 24h

    constructor(@Inject() private readonly redisStore: RedisKeyValueStore) {}
    
    async getUserIdForToken(token: string): Promise<string | undefined> {
        return await this.redisStore.getValue<string>(token);
    }
    
    async saveTokenForUser(userId: string, token: string): Promise<void> {
        await this.redisStore.setValue(token, userId, TokenStore.TTL);
    }

    async removeToken(token: string): Promise<void> {
        await this.redisStore.remove(token);
    }
}
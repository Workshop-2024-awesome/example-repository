export interface ITokenStore {
    saveTokenForUser(userId: string, token: string): Promise<void>;
    getUserIdForToken(token: string): Promise<string | undefined>;
    removeToken(token: string): Promise<void>;
}

export const ITokenStore = Symbol('ITokenStore');

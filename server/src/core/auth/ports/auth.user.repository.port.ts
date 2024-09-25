import { AuthUser } from "../auth.user.model";

export interface ILoadAuthUser {
    loadAuthUser(userId: string): Promise<AuthUser | undefined>;
}

export const ILoadAuthUser = Symbol('ILoadAuthUser');

import { UserModel } from "./user.model";
import { UserProfile } from "./user.profile.model";

export interface IUserRepository {
    loadUserModelByEmail(email: string): Promise<UserModel | undefined>;
    loadUserProfileById(userId: string): Promise<UserProfile | undefined>;

    persist(user: UserModel): Promise<void>;
}

export const IUserRepository = Symbol('IUserRepository');
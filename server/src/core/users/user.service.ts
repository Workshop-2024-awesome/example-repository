import { Inject, UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from "./user.repository.interface";
import { UserProfile } from "./user.profile.model";

export class UserService {
    constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

    async loadUserProfile(userId: string): Promise<UserProfile> {
        var userProfile = await this.userRepository.loadUserProfileById(userId);
        if (userProfile == null) throw new UnauthorizedException();

        return userProfile;
    }
}

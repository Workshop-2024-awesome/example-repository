import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "../../..//core/auth/auth.user.model";
import { ILoadAuthUser } from "../../..//core/auth/ports/auth.user.repository.port";
import { UserEntity } from "../../../core/users/user.entity";
import { UserModel } from "../../..//core/users/user.model";
import { UserProfile } from "../../..//core/users/user.profile.model";
import { IUserRepository } from "../../..//core/users/user.repository.interface";
import { Equal, Repository } from "typeorm";

export class UserRepository implements IUserRepository, ILoadAuthUser {

    constructor(@InjectRepository(UserEntity) public readonly repository: Repository<UserEntity>
    ) {
    }

    async loadUserModelByEmail(email: string): Promise<UserModel | undefined> {
        var entity = await this.repository.findOneBy({ email: Equal(email) });

        if (entity == null) return undefined;

        return UserModel.hydrate(entity);
    }

    async persist(user: UserModel): Promise<void> {
        const entity = user.state;
        await this.repository.save(entity);
    }

    async loadAuthUser(userId: string): Promise<AuthUser | undefined> {
        var entity = await this.repository.findOneBy({ id: Equal(userId) });

        if (entity == null) return undefined;

        return {
            userId: entity.id,
            email: entity.email
        };
    }

    async loadUserProfileById(userId: string): Promise<UserProfile | undefined> {
        var entity = await this.repository.findOneBy({ id: Equal(userId) });
        if (entity == null) return undefined;

        return {
            email: entity.email,
            firstname: entity.firstname,
            lastname: entity.lastname,
            description: entity.description,
            profession: entity.profession,
            profileImageUrl: entity.profileImageUrl,
            githubUrl: entity.githubUrl,
            linkedInUrl: entity.linkedInUrl
        };
    }

}

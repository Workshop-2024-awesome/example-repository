import { IUserRepository } from "../../../core/users/user.repository.interface";
import { Provider } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ILoadAuthUser } from "../../../core/auth/ports/auth.user.repository.port";

export const repositoryProviders: Provider[] = [
    {
        provide: IUserRepository,
        useClass: UserRepository
    },
    {
        provide: ILoadAuthUser,
        useClass: UserRepository
    }
];
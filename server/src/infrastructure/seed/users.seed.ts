import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { UserModel } from "../../core/users/user.model";
import { IUserRepository } from "../../core/users/user.repository.interface";

@Injectable()
export class UserSeed implements OnModuleInit {

    private readonly logger = new Logger(UserSeed.name);

    private sebastianWalter: UserModel;

    constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository
    ) { }

    async onModuleInit() {
        await this.seedSebastianWalter();
    }

    private async seedSebastianWalter() {
        this.logger.debug("Creating user 'sebastianWalter'...");
        this.sebastianWalter = UserModel.init();
        this.sebastianWalter.setEmail("sebastian.walter@mantro.net");
        this.sebastianWalter.setName("Sebastian Walter");
        await this.sebastianWalter.setPassword("password");
        this.sebastianWalter.state.description = "<A fancy description is missing here>";
        this.sebastianWalter.state.profession = "🧙‍♀️ Magician"
        this.sebastianWalter.state.linkedInUrl = "https://www.linkedin.com/in/sebastian-walter-92a107210/";
        this.sebastianWalter.state.githubUrl = "https://github.com/sewas";

        await this.userRepository.persist(this.sebastianWalter);
    }
}
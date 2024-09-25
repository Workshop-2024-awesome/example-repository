import { Module } from "@nestjs/common";
import { DatabaseModule } from "../persistence/database.module";
import { UserSeed } from "./users.seed";
import { UsersModule } from "../../core/users/user.module";

@Module({
    imports: [UsersModule, DatabaseModule],
    providers: [UserSeed]
})
export class SeedModule {}
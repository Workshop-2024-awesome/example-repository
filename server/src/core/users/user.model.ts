import { UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import * as bcrypt from 'bcrypt';

export class UserModel {
    
    public static init(): UserModel { return new UserModel(new UserEntity()); }
    public static hydrate(state: UserEntity): UserModel { return new UserModel(state); }

    public readonly state: UserEntity;

    public email(): string { return this.state.email;}
    public userId(): string { return this.state.id;}

    private constructor(state: UserEntity) {
        this.state = state;
    }

    async verifyPassword(password: string) {
        var doMatch = await bcrypt.compare(password, this.state.passwordHash);
        if (!doMatch) throw new UnauthorizedException();
    }

    async setPassword(password: string): Promise<void> {
        const salt = await bcrypt.genSalt(13);
        this.state.passwordHash = await bcrypt.hash(password, salt);
    }

    setEmail(email: string) {
        this.state.email = email;
    }

    setName(name: string) {
        const [firstname, lastname] = name.split(' ');
        this.state.firstname = firstname;
        this.state.lastname = lastname;
    }
}
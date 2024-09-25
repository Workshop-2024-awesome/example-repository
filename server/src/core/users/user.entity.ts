import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    description: string;

    @Column()
    profession: string;

    @Column({ nullable: true })
    githubUrl?: string;

    @Column({ nullable: true })
    linkedInUrl?: string;

    @Column({ nullable: true })
    profileImageUrl?: string;
}
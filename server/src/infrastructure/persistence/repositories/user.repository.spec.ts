import { Test, TestingModule } from "@nestjs/testing";
import { UserRepository } from "./user.repository";
import { IUserRepository } from "../../../core/users/user.repository.interface";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "../../../core/users/user.entity";
import { repositoryProviders } from "./repositories.provider";
import { UserModel } from "../../../core/users/user.model";
import { DataSource, EntityManager } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

describe('UserRepository', () => {

    let userRepository: UserRepository;
    let module: TestingModule;
    let entityManager: EntityManager;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'example',
                password: 'example',
                // This database is shared by all of the tests. Be careful when running tests in parallel. Ideally every test would take care of its own db/schema.
                database: 'example_test',
                entities: [
                    __dirname + '/../../../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
                dropSchema: true,
                useUTC: true,
                namingStrategy: new SnakeNamingStrategy()
            }),
            TypeOrmModule.forFeature([UserEntity])],
            providers: [...repositoryProviders]
        }).compile();

        userRepository = module.get<UserRepository>(IUserRepository);
    });

    beforeEach(async () => {
        entityManager = module.get(DataSource).createEntityManager();
        await entityManager.connection.dropDatabase();
        await entityManager.connection.synchronize();
    });

    afterAll(async () => {
        await entityManager.connection.dropDatabase();
        await entityManager.connection.destroy()
        await module.close();
    });

    it('should be defined', () => {
        expect(userRepository).toBeDefined();
    });

    it('should persist a usermodel', async () => {
        const userModel = UserModel.init();
        userModel.setName("Fred Test");
        userModel.setEmail("fred@test.org");
        userModel.state.description = "desc.";
        userModel.state.profession = "profession";
        await userModel.setPassword("secret");

        await userRepository.persist(userModel);
    });

    describe('loadUserModelByEmail', () => {

        it('should return, if any', async () => {
            const userModel = UserModel.init();
            userModel.setName("Fred Test");
            userModel.setEmail("fred@test.org");
            userModel.state.description = "desc.";
            userModel.state.profession = "profession";
            await userModel.setPassword("secret");

            await entityManager.save(userModel.state);

            const result = await userRepository.loadUserModelByEmail(userModel.email());

            expect(result).toBeDefined();
            expect(result?.userId).toBeDefined();
            expect(result?.state.firstname).toBe("Fred");
            expect(result?.state.lastname).toBe("Test");
        });

        it('should return undefined, if none', async () => {
            const userModel = UserModel.init();
            userModel.setName("Fred Test");
            userModel.setEmail("fred@test.org");
            userModel.state.description = "desc.";
            userModel.state.profession = "profession";
            await userModel.setPassword("secret");

            await entityManager.save(userModel.state);

            const result = await userRepository.loadUserModelByEmail("something@something.com");

            expect(result).toBeUndefined();
        });
    });

    describe('loadAuthUser', () => {

        it('should return, if any', async () => {
            const userModel = UserModel.init();
            userModel.setName("Fred Test");
            userModel.setEmail("fred@test.org");
            userModel.state.description = "desc.";
            userModel.state.profession = "profession";
            await userModel.setPassword("secret");

            const { id: userId } = await entityManager.save(userModel.state);

            const result = await userRepository.loadAuthUser(userId);

            expect(result).toBeDefined();
            expect(result?.userId).toBe(userId);
            expect(result?.email).toBe("fred@test.org");
        });

        it('should return undefined, if none', async () => {
            const userModel = UserModel.init();
            userModel.setName("Fred Test");
            userModel.setEmail("fred@test.org");
            userModel.state.description = "desc.";
            userModel.state.profession = "profession";
            await userModel.setPassword("secret");

            await entityManager.save(userModel.state);

            const result = await userRepository.loadAuthUser(uuidv4());

            expect(result).toBeUndefined();
        });
    });

    describe('loadUserProfileById', () => {

        it('should return, if any', async () => {
            const userModel = UserModel.init();
            userModel.setName("Fred Test");
            userModel.setEmail("fred@test.org");
            userModel.state.description = "desc.";
            userModel.state.profession = "profession";
            await userModel.setPassword("secret");

            const { id: userId } = await entityManager.save(userModel.state);

            const result = await userRepository.loadUserProfileById(userId);

            expect(result).toBeDefined();
            expect(result?.email).toBe("fred@test.org");
            expect(result?.firstname).toBe("Fred");
            expect(result?.lastname).toBe("Test");
        });

        it('should return undefined, if none', async () => {
            const userModel = UserModel.init();
            userModel.setName("Fred Test");
            userModel.setEmail("fred@test.org");
            userModel.state.description = "desc.";
            userModel.state.profession = "profession";
            await userModel.setPassword("secret");

            await entityManager.save(userModel.state);

            const result = await userRepository.loadUserProfileById(uuidv4());

            expect(result).toBeUndefined();
        });
    });
});
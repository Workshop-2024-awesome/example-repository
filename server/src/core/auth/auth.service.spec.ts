import { TestBed } from "@automock/jest";
import { AuthService } from "./auth.service";
import { ITokenStore } from "./ports/tokenstore.port";
import { UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from "../users/user.repository.interface";
import { UserModel } from "../users/user.model";

describe('AuthService', () => {
    let service: AuthService;
    let mockUserRepo: jest.Mocked<IUserRepository>;
    let mockTokenStore: jest.Mocked<ITokenStore>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(AuthService).compile();

        service = unit;
        mockUserRepo = unitRef.get(IUserRepository);
        mockTokenStore = unitRef.get(ITokenStore);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('when signIn', () => {

        it('should throw, if not found', async () => {
            mockUserRepo.loadUserModelByEmail.mockResolvedValue(undefined);
            expect(async () => await service.signIn('email', 'password')).rejects.toThrow(UnauthorizedException);
        });

        it('should throw, if invalid password', async () => {
            const fakeUser = UserModel.init();
            await fakeUser.setPassword('password');

            mockUserRepo.loadUserModelByEmail.mockResolvedValue(fakeUser);
            expect(async () => await service.signIn('email', 'invalid password')).rejects.toThrow(UnauthorizedException);
        });

        it('should return a token, if authentication was successful', async () => {
            const fakeUser = UserModel.init();
            await fakeUser.setPassword('password');

            mockUserRepo.loadUserModelByEmail.mockResolvedValue(fakeUser);
            const result = await service.signIn('email', 'password');

            expect(result).toBeDefined();
            expect(result).toHaveLength(36); // UUID
        });

    });

    describe('when signOut', () => {
        it('should delegate token removal', async () => {
            const fakeToken = "This-can-be-a-token-if-it-really-wants";
            await service.signOut(fakeToken);

            expect(mockTokenStore.removeToken).toHaveBeenCalledWith(fakeToken);
        });
    });
});
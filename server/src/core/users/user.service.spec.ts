import { TestBed } from '@automock/jest';
import { UserService } from './user.service';
import { IUserRepository } from './user.repository.interface';
import { UnauthorizedException } from '@nestjs/common';

describe('UserService.loadUserProfile', () => {
  let service: UserService;
  let mockUserRepo: jest.Mocked<IUserRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    mockUserRepo = unitRef.get(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return profile, if found', async () => {
    mockUserRepo.loadUserProfileById.mockResolvedValue(
      {
        email: "test@test.org",
        firstname: "Test",
        lastname: "Test",
        description: "Dscription",
        profession: "Profession",
        linkedInUrl: "linkedIn URL",
        githubUrl: "GitHub URL"
      });

    const result = await service.loadUserProfile('any');

    expect(result).toBeDefined();
    expect(result.email).toBe('test@test.org');
    expect(result.firstname).toBe('Test');
    expect(result.lastname).toBe('Test');
  });

  it('should throw, if not found', async () => {
    mockUserRepo.loadUserProfileById.mockResolvedValue(undefined);

    expect(async () => await service.loadUserProfile('any')).rejects.toThrow(UnauthorizedException);
  });
});

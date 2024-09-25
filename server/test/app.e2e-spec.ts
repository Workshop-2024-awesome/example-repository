import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UserModel } from '../src/core/users/user.model';
import { IUserRepository } from '../src/core/users/user.repository.interface';
import { UserRepository } from '../src/infrastructure/persistence/repositories/user.repository';
import { LoginRequestDto } from 'src/core/auth/auth.controller';

const withBearer = (token: string) => `Bearer ${token}`;

describe('Authentication Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // @ts-ignore
    const redisClient = app.get<Cache>(CACHE_MANAGER).store.getClient();
    redisClient.quit();

    await app.close();
  });

  describe('When not authenticated', () => {
    
    it('cannot logout', async () => {
      await request(app.getHttpServer())
        .post('/auth/logout')
        .expect(401);
    });

    it('cannot get session', async () => {
      await request(app.getHttpServer())
        .get('/auth/session')
        .expect(401);
    });

    it('cannot get profile', async () => {
      await request(app.getHttpServer())
        .get('/user/profile')
        .expect(401);
    });

  });

  describe('When authenticated', () => {

    let user: UserModel;
    let apiToken: string;

    beforeAll(async () => {
      user = UserModel.init();
      user.setName("Alfred Test");
      user.setEmail("alfred.test@login.org");
      user.state.description = "desc.";
      user.state.profession = "profession";
      await user.setPassword("test-password");

      const userRepo = app.get<UserRepository>(IUserRepository);
      await userRepo.persist(user);
    });

    beforeEach(async () => {
      const loginReq: LoginRequestDto = {
        email: "alfred.test@login.org",
        password: "test-password"
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginReq)
        .expect(200);

      apiToken = response.body.token;
    });

    it('can logout', async () => {
      await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', withBearer(apiToken))
        .expect(200);
    });

    it('can get session', async () => {
      await request(app.getHttpServer())
        .get('/auth/session')
        .set('Authorization', withBearer(apiToken))
        .expect(200);
    });

    it('can get profile', async () => {
      await request(app.getHttpServer())
        .get('/user/profile')
        .set('Authorization', withBearer(apiToken))
        .expect(200);
    });
  });
});

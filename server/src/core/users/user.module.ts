import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../infrastructure/persistence/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UsersModule {}

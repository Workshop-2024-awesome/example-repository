import { ConfigModule } from "@nestjs/config";
import * as path from 'path';

export const AppConfiguration = ConfigModule.forRoot({
    envFilePath: [
        '.env.local',
        './.env'],
    isGlobal: true
  })
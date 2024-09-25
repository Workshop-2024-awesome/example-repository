import { ConfigModule } from "@nestjs/config";

export const AppConfiguration = ConfigModule.forRoot({
    envFilePath: [
        '.env.local',
        '.env.test',
        './.env'],
    isGlobal: true
  })
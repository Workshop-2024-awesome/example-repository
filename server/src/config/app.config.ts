import { ConfigModule } from "@nestjs/config";

export const AppConfiguration = ConfigModule.forRoot({
    envFilePath: [
        '.env.test',
        '.env.local',
        './.env'],
    isGlobal: true
  })
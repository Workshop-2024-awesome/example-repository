import { ApiProperty } from "@nestjs/swagger";

export class AuthUser {
    @ApiProperty()
    userId: string;
    
    @ApiProperty()
    email: string;
}
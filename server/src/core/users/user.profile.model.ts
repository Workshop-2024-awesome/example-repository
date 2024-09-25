import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserProfile {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    firstname: string;
    
    @ApiProperty()
    lastname: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    profession: string;

    @ApiPropertyOptional()
    githubUrl?: string;

    @ApiPropertyOptional()
    linkedInUrl?: string;

    @ApiPropertyOptional()
    profileImageUrl?: string;
  }
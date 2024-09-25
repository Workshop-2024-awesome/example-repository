import { Controller, Get, Inject, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthUser } from "../auth/auth.user.model";
import { UserProfile } from "./user.profile.model";

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(@Inject() private readonly userService: UserService) {}

    @ApiOkResponse({type: UserProfile})
    @ApiBearerAuth()
    @Get('profile')
    async getProfile(@Request() req: any): Promise<UserProfile> {
        var userProfile = await this.userService.loadUserProfile((req.user as AuthUser).userId);
        return userProfile;
    }
}

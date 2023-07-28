import { UserChangeBalanceDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    changeBalance(userId: string, dto: UserChangeBalanceDto): Promise<any>;
    getById(userId: string): Promise<import("../entities/user.entity").User>;
}

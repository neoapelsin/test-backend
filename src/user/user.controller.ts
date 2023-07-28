import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserChangeBalanceDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    //Изменение баланса
    @HttpCode(200)
    @Post('balance/:userId')
    async changeBalance(
        @Param('userId') userId: string,
        @Body() dto: UserChangeBalanceDto,
    ) {
        return await this.userService.changeBalance(+userId, dto.amount);
    }

    @Get(':userId')
    async getById(@Param('userId') userId: string) {
        return this.userService.byId(+userId);
    }
}

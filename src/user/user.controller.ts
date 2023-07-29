import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    UseFilters,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserExceptionFilter } from './user-exception.filter';
import { UserChangeBalanceDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    //Изменение баланса
    @UseFilters(UserExceptionFilter)
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('balance/:userId')
    async changeBalanceById(
        @Param('userId') userId: string,
        @Body() dto: UserChangeBalanceDto,
    ) {
        return await this.userService.changeBalance(+userId, dto.amount);
    }

    @UseFilters(UserExceptionFilter)
    @Get(':userId')
    async getById(@Param('userId') userId: string) {
        return this.userService.byId(+userId);
    }
}

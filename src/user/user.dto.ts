import { IsNumber } from 'class-validator';

export class UserChangeBalanceDto {
    @IsNumber({})
    amount: number;
}

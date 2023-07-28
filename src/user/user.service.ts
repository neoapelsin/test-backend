import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async byId(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found!');
        }

        return user;
    }

    async changeBalance(userId: number, amount: number) {
        await this.byId(userId);

        try {
            const updatedData = await this.userRepository
                .createQueryBuilder('users')
                .update(User)
                .set({ balance: () => `balance + ${amount}` })
                .where('id = :userId', { userId })
                .returning(['balance'])
                .updateEntity(true)
                .execute();
            return updatedData.raw[0];
        } catch (error) {
            throw new HttpException('Insufficient balance!', 400);
        }
    }
}

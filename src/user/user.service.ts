import { Injectable, NotFoundException } from '@nestjs/common';
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
            throw new NotFoundException();
        }

        return user;
    }

    async changeBalance(userId: number, amount: number) {
        try {
            const updatedData = await this.userRepository
                .createQueryBuilder('user')
                .update(User)
                .set({ balance: () => `balance + ${amount}` })
                .where('id = :userId', { userId })
                .returning(['balance'])
                .updateEntity(true)
                .execute();

            if (updatedData.raw.length < 1) throw new NotFoundException();

            return updatedData.raw[0];
        } catch (error) {
            throw error;
        }
    }
}

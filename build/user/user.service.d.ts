import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    byId(id: number): Promise<User>;
    changeBalance(userId: number, amount: number): Promise<any>;
}

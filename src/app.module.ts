import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';

const entities = [User];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
            ignoreEnvFile: false,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities,
            synchronize: false,
            autoLoadEntities: true,
            migrations: ['./build/migration/*.js'],
            migrationsRun: true,
            logging: true,
        }),
        UserModule,
    ],

    controllers: [],
    providers: [],
})
export class AppModule {}

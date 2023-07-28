import { MigrationInterface, QueryRunner } from 'typeorm';

//Создание таблицы юзеров
export class CreateUserTable1690544115789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table users (
                id serial primary key,
                balance numeric default 0 check (balance >= 0)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table users`);
    }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

//Создание тестового юзера
export class InsertUsers1690544178027 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into users values (1, 10000)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}

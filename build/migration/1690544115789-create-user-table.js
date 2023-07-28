"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1690544115789 = void 0;
class CreateUserTable1690544115789 {
    async up(queryRunner) {
        await queryRunner.query(`
            create table users (
                id serial primary key,
                balance numeric default 0 check (balance >= 0)
            );
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`drop table users`);
    }
}
exports.CreateUserTable1690544115789 = CreateUserTable1690544115789;
//# sourceMappingURL=1690544115789-create-user-table.js.map
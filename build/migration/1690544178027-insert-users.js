"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUsers1690544178027 = void 0;
class InsertUsers1690544178027 {
    async up(queryRunner) {
        await queryRunner.query(`insert into users values (1, 10000)`);
    }
    async down(queryRunner) { }
}
exports.InsertUsers1690544178027 = InsertUsers1690544178027;
//# sourceMappingURL=1690544178027-insert-users.js.map
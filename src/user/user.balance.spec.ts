import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('UserController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should handle 10000 requests to decrease balance', async () => {
        const userId = 1;
        const amount = 2;
        const dto = { amount };
        const requestsCount = 10000;

        const results = await Promise.all(
            Array.from({ length: requestsCount }, async () => {
                return request(app.getHttpServer())
                    .post(`api/user/balance/${userId}`)
                    .send(dto)
                    .set('Content-Type', 'application/json');
            }),
        );

        const successResults = results.filter(
            (result) => result.status === 200,
        );
        const errorResults = results.filter((result) => result.status === 400);

        expect(successResults).toHaveLength(5000);
        expect(errorResults).toHaveLength(5000);
    });

    afterAll(async () => {
        await app.close();
    });
});

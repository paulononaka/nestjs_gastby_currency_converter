import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import nock = require('nock');
import * as mongoose from "mongoose";

describe('ConvertController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    nock('https://free.currconv.com')
      .get(/.*/)
      .reply(200, {
        "BRL_USD": 1.234
      });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => mongoose.disconnect());

  it('/convert (GET) should convert the amount sent', async () => {
    await request(app.getHttpServer())
      .get('/convert')
      .query('from=BRL')
      .query('to=USD')
      .query('amount=2.5')
      .expect(200)
      .expect({
        "from": "BRL",
        "to": "USD",
        "amount": 2.5,
        "response": 3.085
      });
  });
});

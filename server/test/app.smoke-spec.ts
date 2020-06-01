import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {ConfigModule} from '@nestjs/config';
import * as mongoose from "mongoose";
import assert = require('assert');

describe('ConvertController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => mongoose.disconnect());

  it('/convert (GET) ensures that App and API are working fine together', async (done) => {
    await request(app.getHttpServer())
      .get('/convert')
      .query('from=BRL')
      .query('to=USD')
      .query('amount=2.5')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        assert.deepStrictEqual(response.body.from, 'BRL');
        assert.deepStrictEqual(response.body.to, 'USD');
        assert.deepStrictEqual(response.body.amount, 2.5);
        assert(!isNaN(Number(response.body.response)), 'response attribute must be a number');
        done();
      })
  });
});

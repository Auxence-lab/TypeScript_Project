import type {INestApplication} from '@nestjs/common';
import {Test, type TestingModule} from '@nestjs/testing';
import type supertest from 'supertest';
import * as request from 'supertest';
import {PantheonModule} from "../src/Pantheon.module";

describe('Books API', () => {
    let app: INestApplication;
    let httpRequester: supertest.Agent;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [PantheonModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        httpRequester = request(app.getHttpServer());
    });




});

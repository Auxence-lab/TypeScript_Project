import type {INestApplication} from '@nestjs/common';
import {Test, type TestingModule} from '@nestjs/testing';
import type supertest from 'supertest';
import * as request from 'supertest';
import axios from 'axios';
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

    it('GET /books should fetch TSV from Pantheon', async () => {
        const url = 'https://dataverse.harvard.edu/api/access/datafile/:persistentId?persistentId=doi:10.7910/DVN/28201/VEG34D';
        const response = await axios.get<string>(url);

        console.log(response.data); // Affiche le contenu de l'URL
    });
});

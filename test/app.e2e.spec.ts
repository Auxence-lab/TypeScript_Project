import type {INestApplication} from '@nestjs/common';
import {Test, type TestingModule} from '@nestjs/testing';
import type supertest from 'supertest';
import * as request from 'supertest';
import {PantheonModule} from "../src/Pantheon.module";
import axios from 'axios';
import { parse } from 'csv-parse/sync'
import {PantheonService} from "../src/Pantheon.service";

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
    it('GET /personnes', async () => {
        const response = await httpRequester.get('/personnes').expect(200);

        expect(response.body).toEqual(expect.any(Array));
    });

    it('POST /personnes', async () => {
        const response = await httpRequester
            .post('/personnes')
            .send({
                name: "Lucas Martin",
                birthCity: "Lyon",
                birthState: "Auvergne-Rhône-Alpes",
                countryName: "France",
                countryCode2: "FR",
                countryCode3: "FRA",
                LAT: "45.7640",
                LON: "4.8357",
                birthyear: "1992",
                gender: "Male",
                occupation: "Professor and DevOps",
                industry: "Université de Lyon",
                domain: "Education",
                HPI: "99.9"
            })
            .expect(201);

        expect(response.body).toEqual({
            name: "Lucas Martin",
            birthCity: "Lyon",
            birthState: "Auvergne-Rhône-Alpes",
            countryName: "France",
            countryCode2: "FR",
            countryCode3: "FRA",
            LAT: "45.7640",
            LON: "4.8357",
            birthyear: "1992",
            gender: "Male",
            occupation: "Professor and DevOps",
            industry: "Université de Lyon",
            domain: "Education",
            HPI: "99.9"
        });
    });

    it('GET /personnes/:name', async () => {
        await httpRequester.post('/personnes').send({
            name: "Lucas Martin",
            birthCity: "Lyon",
            birthState: "Auvergne-Rhône-Alpes",
            countryName: "France",
            countryCode2: "FR",
            countryCode3: "FRA",
            LAT: "45.7640",
            LON: "4.8357",
            birthyear: "1992",
            gender: "Male",
            occupation: "Professor and DevOps",
            industry: "Université de Lyon",
            domain: "Education",
            HPI: "99.9"
        });

        const response = await httpRequester
            .get('/personnes/Lucas Martin')
            .expect(200);

        expect(response.body).toEqual({
            name: "Lucas Martin",
            birthCity: "Lyon",
            birthState: "Auvergne-Rhône-Alpes",
            countryName: "France",
            countryCode2: "FR",
            countryCode3: "FRA",
            LAT: "45.7640",
            LON: "4.8357",
            birthyear: "1992",
            gender: "Male",
            occupation: "Professor and DevOps",
            industry: "Université de Lyon",
            domain: "Education",
            HPI: "99.9"
        });
    });

    it('GET /Names by Countryside', async () => {

        const response = await httpRequester
            .get('/personnes')
            .query({ countryCode: 'FR' })
            .expect(200);

        expect(response.body).toEqual(expect.any(Array))
        console.log(response.body);
    });

    it('GET /pagination', async () => {

        const response = await httpRequester
            .get('/personnes')
            .query({ Page: '3' })
            .expect(200);

        expect(response.body).toEqual(expect.any(Array))
        console.log(response.body);
    });

    it('PUT /personnes/:name/favorite - met une personne en favoris', async () => {
        // 1. Crée une personne via POST
        const payload = {
            name: "Alan Turing",
            birthCity: "London",
            countryName: "United Kingdom",
            countryCode2: "GB",
            countryCode3: "GBR",
            LAT: "51.5074",
            LON: "-0.1278",
            birthyear: "1912",
            gender: "Male",
            occupation: "Mathematician",
            domain: "Science",
            HPI: "98.5"
        };

        await httpRequester.post('/').send(payload).expect(201);

        // 2. Met en favori via PUT
        const resFav = await httpRequester
            .put('/personnes/Alan Turing/favorite')
            .expect(200);

        expect(resFav.body).toEqual(expect.objectContaining({
            ...payload,
            favorite: true
        }));

        // 3. Vérifie que c’est bien persisté via GET
        const resGet = await httpRequester
            .get('/personnes/Alan Turing')
            .expect(200);

        expect(resGet.body.favorite).toBe(true);
    });


})


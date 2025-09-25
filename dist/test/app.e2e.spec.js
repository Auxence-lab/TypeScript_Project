"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const Pantheon_module_1 = require("../src/Pantheon.module");
describe('Books API', () => {
    let app;
    let httpRequester;
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [Pantheon_module_1.PantheonModule],
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
        expect(response.body).toEqual(expect.any(Array));
        console.log(response.body);
    });
});
//# sourceMappingURL=app.e2e.spec.js.map
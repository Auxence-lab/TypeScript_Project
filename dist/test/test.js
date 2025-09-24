"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const axios_1 = require("axios");
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
    it('GET /books should fetch TSV from Pantheon', async () => {
        const url = 'https://pantheon.world/data/2019/pantheon.tsv';
        const response = await axios_1.default.get(url);
        console.log(response.data);
    });
});
//# sourceMappingURL=test.js.map
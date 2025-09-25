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
});
//# sourceMappingURL=app.e2e.spec.js.map
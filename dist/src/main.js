"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const Pantheon_module_1 = require("./Pantheon.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(Pantheon_module_1.PantheonModule);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map
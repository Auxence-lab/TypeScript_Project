"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PantheonModule = void 0;
const common_1 = require("@nestjs/common");
const Pantheon_controller_1 = require("./Pantheon.controller");
const Pantheon_service_1 = require("./Pantheon.service");
const axios_1 = require("@nestjs/axios");
let PantheonModule = class PantheonModule {
};
exports.PantheonModule = PantheonModule;
exports.PantheonModule = PantheonModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
        controllers: [Pantheon_controller_1.PantheonController],
        providers: [Pantheon_service_1.PantheonService],
    })
], PantheonModule);
//# sourceMappingURL=Pantheon.module.js.map
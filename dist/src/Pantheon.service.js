"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PantheonService = void 0;
const promises_1 = require("node:fs/promises");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let PantheonService = class PantheonService {
    constructor(httpService) {
        this.httpService = httpService;
        this.storage = new Map();
    }
    async onModuleInit() {
        await Promise.all([this.loadPersonnesFromFile(), this.loadPersonnesFromApi()]);
    }
    async loadPersonnesFromFile() {
        const data = await (0, promises_1.readFile)('src/dataset.json', 'utf8');
        const personnes = JSON.parse(data.toString());
        personnes.forEach((personne) => this.addPersonne(personne));
    }
    async loadPersonnesFromApi() {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://pantheon.world/data/2019/pantheon.tsv'));
        console.log(data);
    }
    addPersonne(personne) {
    }
    getPersonne(isbn) {
        const personne = this.storage.get(isbn);
        if (!personne) {
            throw new Error(`personne with the name ${name} not found`);
        }
        return personne;
    }
    remove(isbn) {
        this.storage.delete(isbn);
    }
};
exports.PantheonService = PantheonService;
exports.PantheonService = PantheonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PantheonService);
//# sourceMappingURL=Pantheon.service.js.map
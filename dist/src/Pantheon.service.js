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
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://dataverse.harvard.edu/api/access/datafile/:persistentId?persistentId=doi:10.7910/DVN/28201/VEG34D'));
        data
            .map((apiPersonne) => ({
            name: apiPersonne.name,
            birthCity: apiPersonne.birthcity,
            birthState: apiPersonne.birthstate,
            countryName: apiPersonne.countryName,
            countryCode2: apiPersonne.countryCode,
            countryCode3: apiPersonne.countryCode,
            LAT: apiPersonne.LAT,
            LON: apiPersonne.LON,
            birthyear: apiPersonne.birthyear,
            gender: apiPersonne.gender,
            occupation: apiPersonne.occupation,
            industry: apiPersonne.industry,
            domain: apiPersonne.domain,
            HPI: apiPersonne.HPI,
        }))
            .forEach(personne => this.addPersonne(personne));
    }
    addPersonne(personne) {
        this.storage.set(personne.name, personne);
    }
    getPersonne(name) {
        const personne = this.storage.get(name);
        if (!personne) {
            throw new Error(`personne with the name ${name} not found`);
        }
        return personne;
    }
    getAllPersonnes() {
        return Array.from(this.storage.values()).sort((a, b) => a.name.localeCompare(b.name));
    }
    getPersonnesFrom(codePays) {
        return this.getAllPersonnes()
            .filter((personne) => (personne.countryCode3 === codePays) || (personne.countryCode2 === codePays))
            .sort((a, b) => a.name.localeCompare(b.name));
    }
    getPersonnesWithGender(gender) {
        return this.getAllPersonnes()
            .filter((personne) => (personne.gender === gender))
            .sort((a, b) => a.name.localeCompare(b.name));
    }
    remove(name) {
        this.storage.delete(name);
    }
    search(term) {
        return Array.from(this.storage.values())
            .filter((book) => book.name.includes(term) || book.name.includes(term))
            .sort((a, b) => a.name.localeCompare(b.name));
    }
};
exports.PantheonService = PantheonService;
exports.PantheonService = PantheonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PantheonService);
//# sourceMappingURL=Pantheon.service.js.map
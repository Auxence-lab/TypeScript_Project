"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const Pantheon_controller_1 = require("../src/Pantheon.controller");
const Pantheon_service_1 = require("../src/Pantheon.service");
describe('PantheonController', () => {
    let controller;
    let service;
    const confucius = {
        name: 'confucius',
        birthCity: 'Qufu',
        birthState: 'Shandong',
        countryName: 'China',
        countryCode2: 156,
        countryCode3: 156,
        LAT: 35.6,
        LON: 116.98,
        birthyear: -551,
        gender: 'M',
        occupation: 'Philosopher',
        industry: 'Education',
        domain: 'Ethics',
        HPI: 90,
    };
    const ali = {
        name: 'Ali',
        birthCity: 'Alger',
        birthState: 'Algiers',
        countryName: 'Algeria',
        countryCode2: 12,
        countryCode3: 12,
        LAT: 36.75,
        LON: 3.04,
        birthyear: 1985,
        gender: 'male',
        occupation: 'Engineer',
        industry: 'Technology',
        domain: 'Software',
        HPI: 60,
    };
    const mockService = {
        addPersonne: jest.fn(),
        getAllPersonnes: jest.fn(),
        getPersonne: jest.fn(),
        getPersonnesFrom: jest.fn(),
        getPersonnesWithGender: jest.fn(),
        search: jest.fn(),
        remove: jest.fn(),
        onModuleInit: jest.fn(),
        loadPersonnesFromApi: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [Pantheon_controller_1.PantheonController],
            providers: [{ provide: Pantheon_service_1.PantheonService, useValue: mockService }],
        }).compile();
        controller = module.get(Pantheon_controller_1.PantheonController);
        service = module.get(Pantheon_service_1.PantheonService);
        jest.clearAllMocks();
    });
    describe('createPersonne', () => {
        it('appelle addPersonne et renvoie le body', () => {
            const res = controller.createPersonne(confucius);
            expect(service.addPersonne).toHaveBeenCalledTimes(1);
            expect(service.addPersonne).toHaveBeenCalledWith(confucius);
            expect(res).toEqual(confucius);
        });
    });
    describe('deletePersonne (DELETE :isbn)', () => {
        it('appelle remove avec la valeur de :isbn', () => {
            controller.deletePersonne('isbn-123');
            expect(service.remove).toHaveBeenCalledTimes(1);
            expect(service.remove).toHaveBeenCalledWith('isbn-123');
        });
    });
    describe('getAllPersonnes', () => {
        it('renvoie toutes les personnes', () => {
            service.getAllPersonnes.mockReturnValue([confucius, ali]);
            const res = controller.getAllPersonnes();
            expect(service.getAllPersonnes).toHaveBeenCalledTimes(1);
            expect(res).toEqual([confucius, ali]);
        });
    });
    describe('getPersonne (:name)', () => {
        it('renvoie la personne demandée', () => {
            service.getPersonne.mockReturnValue(confucius);
            const res = controller.getPersonne('confucius');
            expect(service.getPersonne).toHaveBeenCalledWith('confucius');
            expect(res).toEqual(confucius);
        });
    });
    describe('getPersonnesFrom (countrycode/:code)', () => {
        it('renvoie les personnes pour le code pays (number attendu par le service)', () => {
            service.getPersonnesFrom.mockReturnValue([confucius]);
            const res = controller.getPersonnesFrom(250);
            expect(service.getPersonnesFrom).toHaveBeenCalledWith(250);
            expect(res).toEqual([confucius]);
        });
    });
    describe('getPersonnesWithGender (gender/:gender)', () => {
        it('renvoie les personnes du genre demandé', () => {
            service.getPersonnesWithGender.mockReturnValue([ali]);
            const res = controller.getPersonnesWithGender('female');
            expect(service.getPersonnesWithGender).toHaveBeenCalledWith('female');
            expect(res).toEqual([ali]);
        });
    });
    describe('search (?term=)', () => {
        it('renvoie le résultat de recherche', () => {
            service.search.mockReturnValue([confucius]);
            const res = controller.search('confucius');
            expect(service.search).toHaveBeenCalledWith('confucius');
            expect(res).toEqual([confucius]);
        });
    });
    describe('remove (DELETE :name)', () => {
        it('appelle remove avec la valeur de :name', () => {
            controller.remove('ali');
            expect(service.remove).toHaveBeenCalledWith('ali');
        });
    });
});
//# sourceMappingURL=personnes.controller.spec.js.map
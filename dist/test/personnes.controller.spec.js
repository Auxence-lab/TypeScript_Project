"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const Pantheon_controller_1 = require("../src/Pantheon.controller");
const Pantheon_service_1 = require("../src/Pantheon.service");
describe('PantheonController', () => {
    let controller;
    let service;
    const ali = {
        name: 'Ali',
        countryCode2: 'FR',
        countryCode3: 'FRA',
        gender: 'male',
    };
    const amina = {
        name: 'Amina',
        countryCode2: 'US',
        countryCode3: 'USA',
        gender: 'female',
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
            const res = controller.createPersonne(ali);
            expect(service.addPersonne).toHaveBeenCalledTimes(1);
            expect(service.addPersonne).toHaveBeenCalledWith(ali);
            expect(res).toEqual(ali);
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
            service.getAllPersonnes.mockReturnValue([ali, amina]);
            const res = controller.getAllPersonnes();
            expect(service.getAllPersonnes).toHaveBeenCalledTimes(1);
            expect(res).toEqual([ali, amina]);
        });
    });
    describe('getPersonne (:name)', () => {
        it('renvoie la personne demandée', () => {
            service.getPersonne.mockReturnValue(ali);
            const res = controller.getPersonne('Ali');
            expect(service.getPersonne).toHaveBeenCalledWith('Ali');
            expect(res).toEqual(ali);
        });
    });
    describe('getPersonnesFrom (countrycode/:code)', () => {
        it('renvoie les personnes pour le code pays (number attendu par le service)', () => {
            service.getPersonnesFrom.mockReturnValue([ali]);
            const res = controller.getPersonnesFrom(250);
            expect(service.getPersonnesFrom).toHaveBeenCalledWith(250);
            expect(res).toEqual([ali]);
        });
    });
    describe('getPersonnesWithGender (gender/:gender)', () => {
        it('renvoie les personnes du genre demandé', () => {
            service.getPersonnesWithGender.mockReturnValue([amina]);
            const res = controller.getPersonnesWithGender('female');
            expect(service.getPersonnesWithGender).toHaveBeenCalledWith('female');
            expect(res).toEqual([amina]);
        });
    });
    describe('search (?term=)', () => {
        it('renvoie le résultat de recherche', () => {
            service.search.mockReturnValue([ali]);
            const res = controller.search('Ali');
            expect(service.search).toHaveBeenCalledWith('Ali');
            expect(res).toEqual([ali]);
        });
    });
    describe('remove (DELETE :name)', () => {
        it('appelle remove avec la valeur de :name', () => {
            controller.remove('Amina');
            expect(service.remove).toHaveBeenCalledWith('Amina');
        });
    });
});
//# sourceMappingURL=personnes.controller.spec.js.map
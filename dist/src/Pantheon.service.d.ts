import { OnModuleInit } from '@nestjs/common';
import type { Personne } from './Personne';
import { HttpService } from '@nestjs/axios';
export declare class PantheonService implements OnModuleInit {
    private readonly httpService;
    constructor(httpService: HttpService);
    private readonly storage;
    onModuleInit(): Promise<void>;
    private loadPersonnesFromFile;
    loadPersonnesFromApi(): Promise<void>;
    addPersonne(personne: Personne): void;
    getPersonne(isbn: string): Personne;
    remove(isbn: string): void;
}

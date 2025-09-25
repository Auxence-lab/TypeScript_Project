import type { Personne } from './Personne';
import { PantheonService } from './Pantheon.service';
export declare class PantheonController {
    private readonly personneService;
    constructor(personneService: PantheonService);
    createPersonne(personne: Personne): Personne;
    deletePersonne(isbn: string): void;
    getPersonnes(countryCode: number): Personne[];
    getPersonne(name: string): Personne;
    getPersonnesWithGender(gender: string): Personne[];
    search(term: string): Personne[];
    remove(name: string): void;
}

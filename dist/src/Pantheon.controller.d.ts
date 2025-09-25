import type { Personne } from './Personne';
import { PantheonService } from './Pantheon.service';
export declare class PantheonController {
    private readonly personneService;
    constructor(personneService: PantheonService);
    createPersonne(personne: Personne): Personne;
    deletePersonne(isbn: string): void;
    getAllPersonnes(): Personne[];
    getPersonne(name: string): Personne;
    getPersonnesFrom(code: number): Personne[];
    getPersonnesWithGender(gender: string): Personne[];
    search(term: string): Personne[];
    remove(name: string): void;
}

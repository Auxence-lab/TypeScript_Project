import type { Personne } from './Personne';
import { PantheonService } from './Pantheon.service';
export declare class PantheonController {
    private readonly personneService;
    constructor(personneService: PantheonService);
    createPersonne(personne: Personne): Personne;
    deletePersonne(isbn: string): void;
}

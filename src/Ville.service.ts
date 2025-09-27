import {OnModuleInit} from "@nestjs/common";
import {Ville} from "./Ville";
import {readFile} from "node:fs/promises";

@Injectable()
export class VilleService implements OnModuleInit {
    constructor() {}

    private readonly storage: Map<string, Ville> = new Map();

    async onModuleInit() {
        await Promise.all([this.loadPersonnesFromFile(), this.loadPersonnesFromApi()]);
    }

    private async loadPersonnesFromFile() {
        const data = await readFile('src/townDataset.json', 'utf8');
        const villes = JSON.parse(data.toString()) as Ville[];
        villes.forEach((ville) => this.addVille(ville));
    }

    addVille(ville: Ville) {
        this.storage.set(ville.nomVille, ville);
    }

    remove(name: string) {
        this.storage.delete(name);
    }

}

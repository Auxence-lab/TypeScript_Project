import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import type { Personne } from './Personne';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as Papa from 'papaparse';

@Injectable()
export class PantheonService implements OnModuleInit {
    private readonly storage: Map<string, Personne> = new Map();

    constructor(private readonly httpService: HttpService) {}

    async onModuleInit() {
        await Promise.all([this.loadPersonnesFromFile(), this.loadPersonnesFromApi()]);
    }

    async loadPersonnesFromApi() {
        const { data } = await firstValueFrom(
            this.httpService.get(
                'https://dataverse.harvard.edu/api/access/datafile/:persistentId?persistentId=doi:10.7910/DVN/28201/VEG34D&',
                { responseType: 'text' }
            )
        );

        const parseResult = Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        });

        const csvData = parseResult.data as any[];

        csvData
            .filter(row => row && Object.keys(row).length > 0)
            .map(csvRow => ({
                name: csvRow.name || csvRow.Name,
                birthCity: csvRow.birthcity || csvRow.BirthCity || csvRow['Birth City'],
                birthState: csvRow.birthstate || csvRow.BirthState || csvRow['Birth State'],
                countryName: csvRow.countryName || csvRow.CountryName || csvRow['Country Name'],
                countryCode2: csvRow.countryCode || csvRow.CountryCode || csvRow['Country Code'],
                countryCode3: csvRow.countryCode3 || csvRow.CountryCode3 || csvRow['Country Code 3'],
                LAT: csvRow.LAT || csvRow.Latitude || csvRow.lat,
                LON: csvRow.LON || csvRow.Longitude || csvRow.lon,
                birthyear: csvRow.birthyear || csvRow.BirthYear || csvRow['Birth Year'],
                gender: csvRow.gender || csvRow.Gender,
                occupation: csvRow.occupation || csvRow.Occupation,
                industry: csvRow.industry || csvRow.Industry,
                domain: csvRow.domain || csvRow.Domain,
                HPI: csvRow.HPI || csvRow.hpi,
            }))
            .forEach(personne => this.addPersonne(personne));
    }

    addPersonne(personne: Personne) {
        this.storage.set(personne.name, personne);
    }

    getPersonne(name: string): Personne {
        const personne = this.storage.get(name);
        if (!personne) throw new Error(`personne with the name ${name} not found`);
        return personne;
    }

    getAllPersonnes(pretty = false): string | Personne[] {
        const personnes = Array.from(this.storage.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        return pretty ? JSON.stringify(personnes, null, 2) : personnes;
    }

    getPersonnesFrom(codePays: number, pretty = false): string | Personne[] {
        const personnes = this.getAllPersonnes() as Personne[];
        const filtered = personnes
            .filter(p => p.countryCode3 === codePays || p.countryCode2 === codePays)
            .sort((a, b) => a.name.localeCompare(b.name));
        return pretty ? JSON.stringify(filtered, null, 2) : filtered;
    }

    getPersonnesPage(page: number, pageSize = 15, pretty = false): string | Personne[] {
        const personnes = (this.getAllPersonnes() as Personne[]).slice((page - 1) * pageSize, page * pageSize);
        return pretty ? JSON.stringify(personnes, null, 2) : personnes;
    }

    getPersonnesWithGender(gender: string, pretty = false): string | Personne[] {
        const personnes = (this.getAllPersonnes() as Personne[])
            .filter(p => p.gender === gender)
            .sort((a, b) => a.name.localeCompare(b.name));
        return pretty ? JSON.stringify(personnes, null, 2) : personnes;
    }

    remove(name: string) {
        this.storage.delete(name);
    }

    search(term: string, pretty = false): string | Personne[] {
        const personnes = (Array.from(this.storage.values()))
            .filter(p => p.name.includes(term))
            .sort((a, b) => a.name.localeCompare(b.name));
        return pretty ? JSON.stringify(personnes, null, 2) : personnes;
    }

    private async loadPersonnesFromFile() {
        const data = await readFile('src/dataset.json', 'utf8');
        const personnes = JSON.parse(data.toString()) as Personne[];
        personnes.forEach(personne => this.addPersonne(personne));
    }
}

import {readFile} from 'node:fs/promises';
import {Injectable, OnModuleInit} from '@nestjs/common';
import type {Personne} from './Personne';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';
import * as Papa from 'papaparse'

@Injectable()
export class PantheonService implements OnModuleInit {
    private readonly storage: Map<string, Personne> = new Map();

    constructor(private readonly httpService: HttpService) {
    }

    async onModuleInit() {
        await Promise.all([this.loadPersonnesFromFile(), this.loadPersonnesFromApi()]);
    }

    async loadPersonnesFromApi() {
        const {data} = await firstValueFrom(
            this.httpService.get(
                'https://dataverse.harvard.edu/api/access/datafile/:persistentId?persistentId=doi:10.7910/DVN/28201/VEG34D&',
                {
                    responseType: 'text' // Important: specify text response type for CSV
                }
            ),
        );


        const parseResult = Papa.parse(data, {
            header: true, // First row contains column headers
            dynamicTyping: true, // Automatically convert numbers
            skipEmptyLines: true, // Skip empty rows
            transformHeader: (header) => header.trim(), // Remove whitespace from headers
        });

        if (parseResult.errors.length > 0) {
            console.warn('CSV parsing errors:', parseResult.errors);
        }

        const csvData = parseResult.data as any[];

        csvData
            .filter(row => row && Object.keys(row).length > 0) // Filter out empty rows
            .map((csvRow: any) => ({
                name: csvRow.name || csvRow.Name,
                birthCity: csvRow.birthcity || csvRow.BirthCity || csvRow['Birth City'],
                birthState: csvRow.birthstate || csvRow.BirthState || csvRow['Birth State'],
                countryName: csvRow.countryName || csvRow.CountryName || csvRow['Country Name'],
                countryCode2: csvRow.countryCode || csvRow.CountryCode || csvRow['Country Code'],
                countryCode3: csvRow.countryCode3 || csvRow.CountryCode3 || csvRow['Country Code 3'], // Adjust if different column
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

        if (!personne) {
            throw new Error(`personne with the name ${name} not found`);
        }
        return personne;
    }

    getAllPersonnes(): Personne[] {
        return Array.from(this.storage.values()).sort((a, b) =>
            a.name.localeCompare(b.name),
        );
    }

    getPersonnesFrom(codePays: number): Personne[] {
        return this.getAllPersonnes()
            .filter((personne) => (personne.countryCode3 === codePays) || (personne.countryCode2 === codePays))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    getPersonnesPage(page: number): Personne[] {
        const pageSize = 15;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        return this.getAllPersonnes()
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(startIndex, endIndex);
    }


    getPersonnesWithGender(gender: string): Personne[] {
        return this.getAllPersonnes()
            .filter((personne) => (personne.gender === gender))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    remove(name: string) {
        this.storage.delete(name);
    }

    search(term: string) {
        return Array.from(this.storage.values())
            .filter((book) => book.name.includes(term) || book.name.includes(term))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    private async loadPersonnesFromFile() {
        const data = await readFile('src/dataset.json', 'utf8');
        const personnes = JSON.parse(data.toString()) as Personne[];
        personnes.forEach((personne) => this.addPersonne(personne));
    }

}

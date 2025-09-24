import {readFile} from 'node:fs/promises';
import {Injectable, OnModuleInit} from '@nestjs/common';
import type {Personne} from './Personne';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';
import {ApiPersonne} from './ApiPersonne';

@Injectable()
export class PantheonService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  private readonly storage: Map<string, Personne> = new Map();

  async onModuleInit() {
    await Promise.all([this.loadPersonnesFromFile(), this.loadPersonnesFromApi()]);
  }

  private async loadPersonnesFromFile() {
    const data = await readFile('src/dataset.json', 'utf8');
    const personnes = JSON.parse(data.toString()) as Personne[];
    personnes.forEach((personne) => this.addPersonne(personne));
  }

  async loadPersonnesFromApi() {
    const { data } = await firstValueFrom(
      this.httpService.get<ApiPersonne[]>(
'https://dataverse.harvard.edu/api/access/datafile/:persistentId?persistentId=doi:10.7910/DVN/28201/VEG34D'      ),
    );

      data
          .map((apiPersonne : ApiPersonne) => ({
              name: apiPersonne.name,
              birthCity : apiPersonne.birthcity,
              birthState : apiPersonne.birthstate,
              countryName : apiPersonne.countryName,
              countryCode2 : apiPersonne.countryCode,
              countryCode3 : apiPersonne.countryCode,
              LAT : apiPersonne.LAT,
              LON	: apiPersonne.LON,
              birthyear : apiPersonne.birthyear,
              gender : apiPersonne.gender,
              occupation : apiPersonne.occupation,
              industry : apiPersonne.industry,
              domain : apiPersonne.domain,
              HPI : apiPersonne.HPI,
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

    getPersonnesWithGender(gender: string): Personne[] {
        return this.getAllPersonnes()
            .filter((personne) => (personne.gender === gender) )
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

}

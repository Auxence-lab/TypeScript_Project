import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import type { Personne } from './Personne';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { ApiPersonne } from './ApiPersonne';
import {VilleService} from "./Ville.service";

@Injectable()
export class PantheonService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  private readonly storage: Map<string, Personne> = new Map();
  private readonly villes: VilleService = new VilleService();


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
              id : apiPersonne.id,
              name: apiPersonne.name,
              numlangs : apiPersonne.numlangs,
              birthcity : apiPersonne.birthcity,
              birthstate : apiPersonne.birthstate,
              countryName : apiPersonne.countryName,
              countryCode : apiPersonne.countryCode,
              countryCode3 : apiPersonne.countryCode,
              LAT : apiPersonne.LAT,
              LON	: apiPersonne.LON,
              birthyear : apiPersonne.birthyear,
              gender : apiPersonne.gender,
              occupation : apiPersonne.occupation,
              industry : apiPersonne.industry,
              domain : apiPersonne.domain,
              TotalPageViews : apiPersonne.TotalPageViews,
              L_star	: apiPersonne.L_star,
              PageViewsEnglish : apiPersonne.PageViewsEnglish,
              PageViewsNonEnglish : apiPersonne.PageViewsNonEnglish,
              AverageViews : apiPersonne.AverageViews,
              HPI : apiPersonne.HPI
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


  remove(isbn: string) {
    this.storage.delete(isbn);
  }

}

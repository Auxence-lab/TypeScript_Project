import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import type { Personne } from './Personne';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { ApiPersonne } from './ApiPersonne';

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
      this.httpService.get<string>(
'https://dataverse.harvard.edu/api/access/datafile/:persistentId?persistentId=doi:10.7910/DVN/28201/VEG34D'      ),
    );

    console.log(data);
  }

  addPersonne(personne: Personne) {

  }

  getPersonne(isbn: string): Personne {
    const personne = this.storage.get(isbn);

    if (!personne) {
      throw new Error(`personne with the name ${name} not found`);
    }
    return personne;
  }


  remove(isbn: string) {
    this.storage.delete(isbn);
  }

}

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
      this.httpService.get<ApiPersonne[]>(
        'https://pantheon.world/data/2019/pantheon.tsv',
      ),
    );

    data
      .map((apipersonne) => ({
        author: apipersonne.authors,
        date: apipersonne.publication_date,
        isbn: apipersonne.isbn,
        title: apipersonne.title,
      }))
        .forEach(personne => this.addPersonne(personne));
  }

  async loadPersonnesFromApiObservable() {
    this.httpService
      .get<ApiPersonne[]>('https://pantheon.world/data/2019/pantheon.tsv')
      .pipe(
        map((response) => response.data),
        map((apipersonnes) =>
          apipersonnes.map((apipersonne) => ({
            author: apipersonne.authors,
            date: apipersonne.publication_date,
            isbn: apipersonne.isbn,
            title: apipersonne.title,
          })),
        ),
        tap((personnes) => personnes.forEach((personne) => this.addPersonne(personne))),
      )
      .subscribe();
  }

  addPersonne(personne: Personne) {
    this.storage.set(personne.isbn, personne);
  }

  getPersonne(isbn: string): Personne {
    const personne = this.storage.get(isbn);

    if (!personne) {
      throw new Error(`personne with the name ${name} not found`);
    }
    return personne;
  }

  getAllPersonnes(): Personne[] {
    return Array.from(this.storage.values()).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }

  getPersonnesOf(author: string): Personne[] {
    return this.getAllPersonnes()
      .filter((personne) => personne.author === author)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  remove(isbn: string) {
    this.storage.delete(isbn);
  }

  search(term: string) {
    return Array.from(this.storage.values())
      .filter((personne) => personne.title.includes(term) || personne.author.includes(term))
      .sort((a, b) => a.title.localeCompare(b.title));
  }
}

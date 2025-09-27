import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param, ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import type { Personne } from './Personne';
import { PantheonService } from './Pantheon.service';
import * as string_decoder from "node:string_decoder";

@Controller('')
export class PantheonController {
    constructor(private readonly personneService: PantheonService) {
    }

    @Get()
    getHome(): string {
        const personnes = this.personneService.getAllPersonnes();
        const prettyJSON = JSON.stringify(personnes.slice(0, 20), null, 2);

        return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Pantheon API</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; }
      h1, h2 { color: #333; }
      ul { list-style: none; padding: 0; }
      li { margin: 10px 0; }
      a { text-decoration: none; color: #007bff; }
      a:hover { text-decoration: underline; }
      pre { background: #f4f4f4; padding: 10px; overflow-x: auto; }
    </style>
  </head>
  <body>
    <h1>Bienvenue sur l’API Pantheon</h1>
    <h2>Cette API a été créée par Lina et Auxence</h2>

    <p>Voici les pages disponibles :</p>
    <ul>
      <li><a href="/personnes">Toutes les personnes</a></li>
      <li><a href="/personnes?Page=1">Personnes paginées (Page 1)</a></li>
      <li><a href="/search?term=Einstein">Recherche par terme</a></li>
      <li><a href="/gender/male">Personnes de genre masculin</a></li>
      <li><a href="/countrycode/FR">Personnes par countryCode</a></li>
    </ul>

    <h3>Aperçu du dataset (20 premières personnes)</h3>
    <pre>${prettyJSON}</pre>

    <p>En vous souhaitant bonne navigation !</p>
  </body>
  </html>
  `;
    }



    @Post()
    createPersonne(@Body() personne: Personne): Personne {
        this.personneService.addPersonne(personne);
        return personne;
    }


    @Delete('/personnes/:isbn')
    deletePersonne(@Param('isbn') isbn: string): void {
        this.personneService.remove(isbn);
    }

    @Get('/personnes')
    getPersonnes(@Query('Page') page?: string): Personne[] {
        const numberPage = page ? parseInt(page, 10) : undefined;

        if (numberPage) {
            return this.personneService.getPersonnesPage(numberPage);
        }

        return this.personneService.getAllPersonnes();
    }



    @Get('/personnes/:name')
    getPersonneName(@Param('name') name: string): Personne {
        return this.personneService.getPersonne(name);
    }

    @Get('/countrycode/:countryCode')
    getPersonneCountrycode(@Param('countryCode') countryCode: number): Personne[] {
        return this.personneService.getPersonnesFrom(countryCode);
    }

    @Get('gender/:gender')
    getPersonnesWithGender(@Param('gender') gender: string): Personne[] {
        return this.personneService.getPersonnesWithGender(gender);
    }

    @Get('search')
    search(@Query('term') term: string): Personne[] {
        return this.personneService.search(term ?? '');
    }


    @Delete('/personnes/:name')
    remove(@Param('name') name: string): void {
        this.personneService.remove(name);
    }

}
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import type { Personne } from './Personne';
import { PantheonService } from './Pantheon.service';

@Controller('/personnes')
export class PantheonController {
  constructor(private readonly personneService: PantheonService) {}

  @Post()
  createPersonne(@Body() personne: Personne): Personne {
    this.personneService.addpersonne(personne);
    return this.personneService.getPersonne(personne.isbn);
  }

  @Get()
  getPersonnes(@Query('author') author: string): Personne[] {
    if (author) {
      return this.personneService.getPersonnesOf(author);
    }
    return this.personneService.getAllPersonnes();
  }

  @Get(':isbn')
  getPersonne(@Param('isbn') isbn: string): Personne {
    return this.personneService.getPersonne(isbn);
  }

  @Delete(':isbn')
  deletePersonne(@Param('isbn') isbn: string): void {
    this.personneService.remove(isbn);
  }

  @Post('search')
  @HttpCode(200)
  searchPersonnes(@Body() { term }: { term: string }): Personne[] {
    return this.personneService.search(term);
  }
}

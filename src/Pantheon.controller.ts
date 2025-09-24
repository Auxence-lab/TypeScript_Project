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
    this.personneService.addPersonne(personne);
    return personne;
  }


  @Delete(':isbn')
  deletePersonne(@Param('isbn') isbn: string): void {
    this.personneService.remove(isbn);
  }

}

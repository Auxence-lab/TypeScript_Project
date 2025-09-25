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

@Controller('/personnes')
export class PantheonController {
    constructor(private readonly personneService: PantheonService) {
    }

    @Post()
    createPersonne(@Body() personne: Personne): Personne {
        this.personneService.addPersonne(personne);
        return personne;
    }


    @Delete(':isbn')
    deletePersonne(@Param('isbn') isbn: string): void {
        this.personneService.remove(isbn);
    }

    @Get()
    getAllPersonnes(): Personne[] {
        return this.personneService.getAllPersonnes();
    }

    @Get(':name')
    getPersonne(@Param('name') name: string): Personne {
        return this.personneService.getPersonne(name);
    }

    @Get('countrycode/:code')
    getPersonnesFrom(@Param('code') code: number): Personne[] {
        return this.personneService.getPersonnesFrom(code);
    }
    @Get('gender/:gender')
    getPersonnesWithGender(@Param('gender') gender: string): Personne[] {
        return this.personneService.getPersonnesWithGender(gender);
    }

    @Get('search')
    search(@Query('term') term: string): Personne[] {
        return this.personneService.search(term ?? '');
    }


    @Delete(':name')
    remove(@Param('name') name: string): void {
        this.personneService.remove(name);
    }

}
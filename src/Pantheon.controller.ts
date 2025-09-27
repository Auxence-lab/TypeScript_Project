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
    getPersonnes(@Query('Page', ParseIntPipe) numberPage?: number): Personne[] {
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
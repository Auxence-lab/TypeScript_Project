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

@Controller('')
export class PantheonController {
    constructor(private readonly personneService: PantheonService) {
    }

    @Get()
    getHome(): string {
        const personnes = this.personneService.getAllPersonnes();

        const prettyJSON = JSON.stringify(personnes.slice(0, 5), null, 2) // Réduire à 5 pour plus de lisibilité
            .replace(/(".*?"):/g, '<span style="color: #3498db;">$1</span>:') // Clés en bleu
            .replace(/: (".*?")/g, ': <span style="color: #e74c3c;">$1</span>') // Valeurs string en rouge
            .replace(/: (\d+\.?\d*)/g, ': <span style="color: #f39c12;">$1</span>') // Nombres en orange
            .replace(/: (true|false|null)/g, ': <span style="color: #9b59b6;">$1</span>'); // Booléens en violet

        return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pantheon API - Explorer les personnalités historiques</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      background: rgba(255, 255, 255, 0.95);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .header h1 {
      font-size: 3rem;
      color: #2c3e50;
      margin-bottom: 10px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .header h2 {
      font-size: 1.2rem;
      color: #7f8c8d;
      font-weight: 300;
    }
    
    .section {
      background: rgba(255, 255, 255, 0.95);
      margin: 30px 0;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .section h3 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.8rem;
      border-bottom: 3px solid #667eea;
      padding-bottom: 10px;
    }
    
    .button-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .api-button {
      display: inline-block;
      padding: 15px 25px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      border: none;
      cursor: pointer;
    }
    
    .api-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    
    .api-button.secondary {
      background: linear-gradient(45deg, #f39c12, #e67e22);
      box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
    }
    
    .api-button.secondary:hover {
      box-shadow: 0 6px 20px rgba(243, 156, 18, 0.4);
    }
    
    .country-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    
    .country-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 20px;
      background: white;
      color: #2c3e50;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      border: 2px solid #ecf0f1;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .country-button:hover {
      border-color: #667eea;
      color: #667eea;
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }
    
    .flag {
      font-size: 1.5rem;
      margin-right: 10px;
    }
    
    .gender-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .gender-button {
      padding: 12px 30px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
    }
    
    .gender-button.female {
      background: linear-gradient(45deg, #e74c3c, #c0392b);
      color: white;
    }
    
    .gender-button.male {
      background: linear-gradient(45deg, #3498db, #2980b9);
      color: white;
    }
    
    .gender-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .dataset-preview {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 20px;
      border-radius: 10px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.4;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .search-section {
      text-align: center;
    }
    
    .search-input {
      padding: 12px 20px;
      border: 2px solid #ecf0f1;
      border-radius: 25px;
      font-size: 1rem;
      margin-right: 10px;
      width: 300px;
      max-width: 100%;
      transition: border-color 0.3s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .search-button {
      padding: 12px 25px;
      background: linear-gradient(45deg, #27ae60, #2ecc71);
      color: white;
      border: none;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 3px 12px rgba(39, 174, 96, 0.3);
    }
    
    .search-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
    }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 15px;
      color: #7f8c8d;
    }
    
    @media (max-width: 768px) {
      .header h1 {
        font-size: 2rem;
      }
      
      .search-input {
        width: 100%;
        margin-bottom: 10px;
        margin-right: 0;
      }
      
      .button-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>🏛️ API Pantheon</h1>
      <h2>Explorer les personnalités historiques du monde entier</h2>
      <p style="margin-top: 15px; color: #95a5a6;">Créée avec ❤️ par <strong>Lina</strong> et <strong>Auxence</strong></p>
    </header>

    <section class="section">
      <h3>🚀 Endpoints principaux</h3>
      <div class="button-grid">
        <a href="/personnes" class="api-button">
          📋 Toutes les personnes
        </a>
        <a href="/personnes?Page=1" class="api-button secondary">
          📄 Navigation par pages
        </a>
      </div>
    </section>

    <section class="section">
      <h3>🔍 Recherche personnalisée</h3>
      <div class="search-section">
        <input type="text" id="searchTerm" class="search-input" placeholder="Rechercher une personnalité..." value="Einstein">
        <button onclick="searchPerson()" class="search-button">Rechercher</button>
        <div style="margin-top: 10px;">
          <small style="color: #7f8c8d;">Exemples : Einstein, Napoleon, Mozart, Tesla...</small>
        </div>
      </div>
    </section>

    <section class="section">
      <h3>🌍 Explorer par pays</h3>
      <div class="country-buttons">
        <a href="/countrycode/FR" class="country-button">
          <span class="flag">🇫🇷</span> France
        </a>
        <a href="/countrycode/US" class="country-button">
          <span class="flag">🇺🇸</span> États-Unis
        </a>
        <a href="/countrycode/GB" class="country-button">
          <span class="flag">🇬🇧</span> Royaume-Uni
        </a>
        <a href="/countrycode/DE" class="country-button">
          <span class="flag">🇩🇪</span> Allemagne
        </a>
        <a href="/countrycode/IT" class="country-button">
          <span class="flag">🇮🇹</span> Italie
        </a>
        <a href="/countrycode/ES" class="country-button">
          <span class="flag">🇪🇸</span> Espagne
        </a>
        <a href="/countrycode/RU" class="country-button">
          <span class="flag">🇷🇺</span> Russie
        </a>
        <a href="/countrycode/JP" class="country-button">
          <span class="flag">🇯🇵</span> Japon
        </a>
        <a href="/countrycode/CN" class="country-button">
          <span class="flag">🇨🇳</span> Chine
        </a>
        <a href="/countrycode/IN" class="country-button">
          <span class="flag">🇮🇳</span> Inde
        </a>
      </div>
    </section>

    <section class="section">
      <h3>👤 Explorer par genre</h3>
      <div class="gender-buttons">
        <a href="/gender/Female" class="gender-button female">
          👩 Personnalités féminines
        </a>
        <a href="/gender/Male" class="gender-button male">
          👨 Personnalités masculines
        </a>
      </div>
    </section>

    <section class="section">
      <h3>📊 Aperçu du dataset</h3>
      <p style="margin-bottom: 15px; color: #7f8c8d;">Les 10 premières personnalités de notre base de données :</p>
      <div class="dataset-preview">${prettyJSON}</div>
    </section>

    <footer class="footer">
      <p>🎯 API Pantheon - Votre passerelle vers l'histoire mondiale</p>
      <p style="font-size: 0.9rem; margin-top: 10px;">
        Bonne exploration ! 🚀
      </p>
    </footer>
  </div>

  <script>
    function searchPerson() {
      const term = document.getElementById('searchTerm').value;
      if (term.trim()) {
        window.location.href = '/search?term=' + encodeURIComponent(term);
      }
    }
    
    document.getElementById('searchTerm').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchPerson();
      }
    });
  </script>
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
    getPersonneCountrycode(@Param('countryCode') countryCode: string): Personne[] {
        const code = isNaN(Number(countryCode)) ? countryCode : Number(countryCode);
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

    @Delete('/personnes/:name')
    remove(@Param('name') name: string): void {
        this.personneService.remove(name);
    }
}
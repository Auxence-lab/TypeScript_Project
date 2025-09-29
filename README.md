# 🏛️ Pantheon API

Une API REST élégante pour explorer les personnalités historiques du monde entier, construite avec NestJS et TypeScript.

**Créée avec ❤️ par Lina et Auxence**

---

## 📋 Table des matières

- [À propos](#à-propos)
- [Installation](#installation)
- [Démarrage rapide](#démarrage-rapide)
- [Endpoints de l'API](#endpoints-de-lapi)
- [Exemples d'utilisation](#exemples-dutilisation)
- [Structure des données](#structure-des-données)
- [Sources des données](#sources-des-données)

---

## 🎯 À propos

Pantheon API vous permet d'accéder à une vaste base de données de personnalités historiques du monde entier. Explorez les données par pays, genre, nom, ou effectuez des recherches personnalisées pour découvrir les figures marquantes de l'histoire.

### Fonctionnalités principales

- ✅ Accès à des milliers de personnalités historiques
- ✅ Filtrage par pays (codes ISO 2 et 3)
- ✅ Filtrage par genre
- ✅ Recherche par nom
- ✅ Navigation par pages
- ✅ Interface web intuitive
- ✅ Informations détaillées (profession, industrie, domaine, HPI)

---

## 🚀 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

### Étapes d'installation

```bash
# Cloner le repository
git clone [url-du-repo]

# Installer les dépendances
npm install

# Démarrer l'application
npm run start

# Pour le mode développement avec rechargement automatique
npm run start:dev
```

L'API sera accessible sur `http://localhost:3000`

---

## 🌐 Application déployée

### Accéder à l'application en ligne

L'API est déployée sur **Clever Cloud** et accessible publiquement à l'adresse suivante :

**🔗 [https://votre-app.cleverapps.io](https://votre-app.cleverapps.io)**

> **Note :** Remplacez `votre-app` par le nom réel de votre application Clever Cloud.

Ouvrez simplement cette URL dans votre navigateur pour accéder à l'interface web interactive !

### Exemples d'URLs directes

Vous pouvez accéder directement aux données en ouvrant ces URLs dans votre navigateur :

- **Toutes les personnalités françaises** : `https://votre-app.cleverapps.io/countrycode/FR`
- **Rechercher Einstein** : `https://votre-app.cleverapps.io/search?term=Einstein`
- **Toutes les femmes** : `https://votre-app.cleverapps.io/gender/Female`
- **Page 2** : `https://votre-app.cleverapps.io/personnes?Page=2`

---

## 🎨 Démarrage rapide

### En local

Après l'installation, ouvrez votre navigateur et rendez-vous sur :

**🔗 [http://localhost:3000](http://localhost:3000)**

### En ligne (sans installation)

Accédez directement à l'application déployée :

**🔗 [https://votre-app.cleverapps.io](https://votre-app.cleverapps.io)**

Vous verrez une magnifique interface avec tous les endpoints disponibles et des exemples interactifs.

---

## 📚 Endpoints de l'API

### 🏠 Page d'accueil

```
GET /
```

Retourne une interface web HTML interactive avec tous les endpoints disponibles.

---

### 📋 Récupérer toutes les personnes

```
GET /personnes
```

Retourne la liste complète de toutes les personnalités historiques, triées par ordre alphabétique.

**Exemple de réponse :**
```json
[
  {
    "name": "Albert Einstein",
    "birthCity": "Ulm",
    "birthState": "Baden-Württemberg",
    "countryName": "Germany",
    "countryCode2": "DE",
    "countryCode3": "DEU",
    "LAT": 48.4,
    "LON": 9.98,
    "birthyear": 1879,
    "gender": "Male",
    "occupation": "Physicist",
    "industry": "Science and Technology",
    "domain": "Natural Sciences",
    "HPI": 88.42
  }
]
```

---

### 📄 Navigation par pages

```
GET /personnes?Page={numéro}
```

Retourne 15 personnalités par page.

**Paramètres :**
- `Page` : Numéro de la page (commence à 1)

**Exemples :**
```bash
# Première page (personnes 1-15)
GET /personnes?Page=1

# Deuxième page (personnes 16-30)
GET /personnes?Page=2

# Troisième page (personnes 31-45)
GET /personnes?Page=3
```

---

### 👤 Rechercher une personne par nom

```
GET /personnes/{nom}
```

Retourne les informations détaillées d'une personne spécifique.

**Exemples :**
```bash
GET /personnes/Albert Einstein
GET /personnes/Napoleon Bonaparte
GET /personnes/Marie Curie
```

---

### 🌍 Filtrer par pays

```
GET /countrycode/{code}
```

Retourne toutes les personnalités d'un pays spécifique.

**Paramètres :**
- `code` : Code pays ISO 2 ou ISO 3 (ex: FR, FRA, US, USA)

**Exemples :**
```bash
# France
GET /countrycode/FR
GET /countrycode/FRA

# États-Unis
GET /countrycode/US
GET /countrycode/USA

# Royaume-Uni
GET /countrycode/GB
GET /countrycode/GBR
```

**Pays populaires :**
- 🇫🇷 France : `FR` ou `FRA`
- 🇺🇸 États-Unis : `US` ou `USA`
- 🇬🇧 Royaume-Uni : `GB` ou `GBR`
- 🇩🇪 Allemagne : `DE` ou `DEU`
- 🇮🇹 Italie : `IT` ou `ITA`
- 🇪🇸 Espagne : `ES` ou `ESP`
- 🇷🇺 Russie : `RU` ou `RUS`
- 🇯🇵 Japon : `JP` ou `JPN`
- 🇨🇳 Chine : `CN` ou `CHN`
- 🇮🇳 Inde : `IN` ou `IND`

---

### 👥 Filtrer par genre

```
GET /gender/{genre}
```

Retourne toutes les personnalités d'un genre spécifique.

**Paramètres :**
- `genre` : "Male" ou "Female"

**Exemples :**
```bash
# Toutes les femmes historiques
GET /gender/Female

# Tous les hommes historiques
GET /gender/Male
```

---

### 🔍 Recherche personnalisée

```
GET /search?term={terme}
```

Effectue une recherche dans les noms des personnalités.

**Paramètres :**
- `term` : Terme de recherche (sensible à la casse)

**Exemples :**
```bash
GET /search?term=Einstein
GET /search?term=Mozart
GET /search?term=Napoleon
GET /search?term=Tesla
```

---

### ➕ Ajouter une personne

```
POST /
```

Ajoute une nouvelle personnalité à la base de données.

**Corps de la requête (JSON) :**
```json
{
  "name": "Nouvelle Personne",
  "birthCity": "Paris",
  "birthState": "Île-de-France",
  "countryName": "France",
  "countryCode2": "FR",
  "countryCode3": "FRA",
  "LAT": 48.8566,
  "LON": 2.3522,
  "birthyear": 1900,
  "gender": "Male",
  "occupation": "Artiste",
  "industry": "Arts",
  "domain": "Visual Arts",
  "HPI": 75.5
}
```

---

### 🗑️ Supprimer une personne

```
DELETE /personnes/{nom}
```

Supprime une personnalité de la base de données.

**Exemple :**
```bash
DELETE /personnes/Albert Einstein
```

---

## 💡 Exemples d'utilisation

### Utilisation directe dans le navigateur

#### En local
Ouvrez simplement ces URLs dans votre navigateur :

- **Page d'accueil** : `http://localhost:3000`
- **Toutes les personnalités** : `http://localhost:3000/personnes`
- **Personnalités françaises** : `http://localhost:3000/countrycode/FR`
- **Rechercher Einstein** : `http://localhost:3000/search?term=Einstein`
- **Page 2** : `http://localhost:3000/personnes?Page=2`
- **Toutes les femmes** : `http://localhost:3000/gender/Female`

#### En ligne (Clever Cloud)
Remplacez `localhost:3000` par votre URL de production :

- **Page d'accueil** : `https://votre-app.cleverapps.io`
- **Toutes les personnalités** : `https://votre-app.cleverapps.io/personnes`
- **Personnalités françaises** : `https://votre-app.cleverapps.io/countrycode/FR`
- **Rechercher Einstein** : `https://votre-app.cleverapps.io/search?term=Einstein`
- **Page 2** : `https://votre-app.cleverapps.io/personnes?Page=2`
- **Toutes les femmes** : `https://votre-app.cleverapps.io/gender/Female`

### Avec JavaScript (fetch)

```javascript
// URL de base (changez selon votre environnement)
const BASE_URL = 'http://localhost:3000'; // Local
// const BASE_URL = 'https://votre-app.cleverapps.io'; // Production

// Récupérer toutes les personnalités américaines
fetch(`${BASE_URL}/countrycode/US`)
  .then(response => response.json())
  .then(data => console.log(data));

// Rechercher Mozart
fetch(`${BASE_URL}/search?term=Mozart`)
  .then(response => response.json())
  .then(data => console.log(data));

// Ajouter une nouvelle personne
fetch(BASE_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test Person',
    birthCity: 'Paris',
    // ... autres champs
  })
});
```

---

## 🚀 Déploiement sur Clever Cloud

### Prérequis

- Compte Clever Cloud
- Git installé
- Application NestJS prête

### CleverCloud

1**Accéder à votre application**
    - L'URL sera disponible dans le dashboard Clever Cloud
    - Format : `https://app-675765f1-a0ff-4780-ad1d-2b2b926f399e.cleverapps.io`

---

## 📊 Structure des données

Chaque personnalité contient les informations suivantes :

| Champ | Type | Description |
|-------|------|-------------|
| `name` | string | Nom complet de la personne |
| `birthCity` | string | Ville de naissance |
| `birthState` | string | État/région de naissance |
| `countryName` | string | Nom du pays |
| `countryCode2` | string | Code pays ISO 2 lettres |
| `countryCode3` | string | Code pays ISO 3 lettres |
| `LAT` | number | Latitude du lieu de naissance |
| `LON` | number | Longitude du lieu de naissance |
| `birthyear` | number | Année de naissance |
| `gender` | string | Genre (Male/Female) |
| `occupation` | string | Profession principale |
| `industry` | string | Secteur d'activité |
| `domain` | string | Domaine d'expertise |
| `HPI` | number | Historical Popularity Index |

---

## 🗂️ Sources des données

Les données proviennent de deux sources :

1. **Fichier local** : `src/dataset.json`
2. **API externe** : [Harvard Dataverse - Pantheon Dataset](https://dataverse.harvard.edu/)

Les données sont automatiquement chargées au démarrage de l'application grâce au système `OnModuleInit` de NestJS.

---

## 🛠️ Technologies utilisées

- **NestJS** : Framework backend
- **TypeScript** : Langage de programmation
- **PapaParse** : Parsing de fichiers CSV
- **Axios** : Requêtes HTTP
- **RxJS** : Programmation réactive

---

## 📝 Notes importantes

- La recherche est **sensible à la casse** : "Einstein" ≠ "einstein"
- Les données sont stockées en mémoire et rechargées à chaque redémarrage
- La pagination affiche 15 résultats par page
- Les résultats sont toujours triés par ordre alphabétique
- Les codes pays acceptent les formats ISO 2 et ISO 3

---

## 🎉 Bon exploration !

N'hésitez pas à explorer l'API et à découvrir les personnalités historiques qui ont marqué notre monde ! 🚀

Pour toute question ou suggestion, contactez **Lina** et **Auxence**.

---

**Made with ❤️ and lots of ☕**
# Michelin Library - Documentation Technique

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Utilisation](#utilisation)
7. [API REST](#api-rest)
8. [Base de données](#base-de-données)
9. [Développement](#développement)

---

## Vue d'ensemble

Michelin Library est une application web full-stack de gestion de bibliothèque. Elle permet de gérer une collection de livres avec des fonctionnalités CRUD complètes et des visualisations statistiques.

### Fonctionnalités principales

- Gestion complète des livres (création, consultation, modification, suppression)
- Recherche et filtrage en temps réel avec debounce automatique
- Statistiques visuelles par catégorie, auteur et décennie
- Interface responsive avec navigation sidebar
- Architecture containerisée avec Docker

---

## Architecture

L'application suit une architecture client-serveur à trois niveaux :

```
Frontend (React + Vite)     →  Port 3000
       ↓ HTTP REST API
Backend (Node.js + Express) →  Port 5000
       ↓ Prisma ORM
Database (PostgreSQL)       →  Port 5432
```

### Stack technique

**Frontend**
- React 18.3 - Interface utilisateur
- TypeScript 5.6 - Typage statique
- Vite 6.0 - Build tool
- TailwindCSS 4.0 - Styles
- React Router 7.1 - Navigation
- Chart.js 4.4 - Graphiques
- Lucide React - Icônes

**Backend**
- Node.js 20 - Runtime
- Express 4.21 - Framework web
- TypeScript 5.7 - Typage backend
- Prisma 5.22 - ORM

**Infrastructure**
- PostgreSQL 16 - Base de données
- Docker & Docker Compose - Containerisation

---

## Technologies

### Dépendances Frontend

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.2",
  "typescript": "^5.6.2",
  "@vitejs/plugin-react": "^4.3.4",
  "vite": "^6.0.11",
  "@tailwindcss/vite": "^4.0.0-beta.7",
  "chart.js": "^4.4.7",
  "react-chartjs-2": "^5.3.0",
  "lucide-react": "^0.556.0"
}
```

### Dépendances Backend

```json
{
  "express": "^4.21.2",
  "prisma": "^5.22.0",
  "@prisma/client": "^5.22.0",
  "typescript": "^5.7.3",
  "tsx": "^4.19.2",
  "cors": "^2.8.5"
}
```

---

## Installation

### Prérequis

- Docker (version 20.10 ou supérieure)
- Docker Compose (version 2.0 ou supérieure)
- Ports disponibles : 3000, 5000, 5432

### Étapes d'installation

**1. Cloner le projet**

```bash
git clone https://github.com/BradSavary/MichelinLibrary.git
cd MichelinLibrary
```

**2. Configuration de l'environnement**

Créer le fichier `.env` dans le dossier `backend` :

```env
DATABASE_URL="postgresql://michelin:michelin123@database:5432/michelin_library"
```

**3. Lancer l'application**

```bash
docker-compose up -d
```

Cette commande va :
- Créer les 3 containers (database, backend, frontend)
- Installer toutes les dépendances
- Appliquer les migrations Prisma
- Initialiser la base avec 60+ livres de test

**4. Vérifier le statut**

```bash
docker-compose ps
```

Les 3 services doivent être en statut "Up".

---

## Configuration

### Variables d'environnement

**Backend (`backend/.env`)**

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PORT=5000
```

### Ports

| Service  | Port interne | Port externe |
|----------|--------------|--------------|
| Frontend | 3000         | 3000         |
| Backend  | 5000         | 5000         |
| Database | 5432         | 5432         |

---

## Utilisation

### Démarrage

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f backend
```

### Arrêt

```bash
# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (efface la base de données)
docker-compose down -v
```

### Redémarrage

```bash
# Redémarrer un service
docker-compose restart backend

# Rebuild après modification
docker-compose up --build -d
```

### Accès

- **Application** : http://localhost:3000
- **API** : http://localhost:5000/api/books
- **Base de données** : localhost:5432 (user: michelin, password: michelin123)

---

## API REST

### Endpoints

**Base URL** : `http://localhost:5000/api/books`

#### GET /api/books

Récupérer tous les livres avec filtres optionnels.

**Paramètres de requête** :
- `title` : Filtrer par titre
- `author` : Filtrer par auteur
- `category` : Filtrer par catégorie

**Exemple** :
```bash
curl "http://localhost:5000/api/books?category=Fiction"
```

**Réponse 200** :
```json
[
  {
    "id": "uuid",
    "title": "Le Petit Prince",
    "author": "Antoine de Saint-Exupéry",
    "category": "Fiction",
    "publishedYear": 1943,
    "description": "Un conte philosophique...",
    "coverImage": null,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### GET /api/books/:id

Récupérer un livre spécifique par son ID.

**Réponse 200** : Objet livre  
**Réponse 404** : `{ "error": "Book not found" }`

#### POST /api/books

Créer un nouveau livre.

**Corps de la requête** :
```json
{
  "title": "Titre du livre",
  "author": "Nom de l'auteur",
  "category": "Catégorie",
  "publishedYear": 2024,
  "description": "Description optionnelle",
  "coverImage": "https://example.com/cover.jpg"
}
```

**Champs obligatoires** : `title`, `author`, `category`  
**Réponse 201** : Livre créé

#### PUT /api/books/:id

Mettre à jour un livre existant.

**Corps de la requête** : Mêmes champs que POST (tous optionnels)  
**Réponse 200** : Livre mis à jour

#### DELETE /api/books/:id

Supprimer un livre.

**Réponse 200** : `{ "message": "Book deleted successfully" }`

#### GET /api/books/categories

Récupérer la liste des catégories uniques.

**Réponse 200** :
```json
["Fiction", "Science-Fiction", "Thriller", "Histoire"]
```

#### GET /api/books/stats

Récupérer les statistiques de la bibliothèque.

**Réponse 200** :
```json
{
  "totalBooks": 60,
  "booksByCategory": [
    { "category": "Fiction", "count": 15 }
  ],
  "booksByAuthor": [
    { "author": "Albert Camus", "count": 2 }
  ],
  "booksByDecade": [
    { "decade": "1940s", "count": 7 }
  ]
}
```

---

## Base de données

### Schéma Prisma

```prisma
model Book {
  id            String    @id @default(uuid())
  title         String
  author        String
  category      String
  publishedYear Int?
  description   String?
  coverImage    String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Migrations

```bash
# Créer une migration
docker-compose exec backend npx prisma migrate dev --name <nom_migration>

# Appliquer les migrations
docker-compose exec backend npx prisma migrate deploy

# Réinitialiser la base
docker-compose exec backend npx prisma migrate reset
```

### Seed

La base de données est initialisée avec 60+ livres de test couvrant différentes périodes et genres.

```bash
# Exécuter le seed
docker-compose exec backend npm run prisma:seed
```

---

## Développement

### Structure du projet

```
MichelinLibrary/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── bookController.ts
│   │   ├── routes/
│   │   │   └── books.ts
│   │   └── server.ts
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Textarea.tsx
│   │   │       ├── Select.tsx
│   │   │       ├── BookCard.tsx
│   │   │       └── index.ts
│   │   ├── pages/
│   │   │   ├── Books.tsx
│   │   │   ├── AddBook.tsx
│   │   │   ├── EditBook.tsx
│   │   │   └── Stats.tsx
│   │   ├── services/
│   │   │   └── bookService.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml
```

---

## Dépannage

### Erreur de migration Prisma

```bash
# Réinitialiser complètement
docker-compose down -v
docker-compose up -d
```

### Logs des containers

```bash
# Tous les services
docker-compose logs

# Service spécifique
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database
```

---


## Potentiels améliorations

- Pour créer ou modifier un livre : ajouter une preview des "Catégorie" déjà existantes pour éviter les doublons et simplifier les créations/modifications.
- Ajouter des options de tri.
- Importer directement des images pour les couvertures.
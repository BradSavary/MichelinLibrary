# Michelin Library - Guide Utilisateur

## Table des matières

1. [Introduction](#introduction)
2. [Accès à l'application](#accès-à-lapplication)
3. [Navigation](#navigation)
4. [Gestion des livres](#gestion-des-livres)
5. [Recherche et filtrage](#recherche-et-filtrage)
6. [Statistiques](#statistiques)
7. [Questions fréquentes](#questions-fréquentes)

---

## Introduction

Michelin Library est une application de gestion de bibliothèque personnelle. Elle vous permet d'organiser, rechercher et visualiser votre collection de livres de manière simple et efficace.

### Fonctionnalités

- Ajout, modification et suppression de livres
- Recherche multicritère (titre, auteur, catégorie)
- Statistiques visuelles de votre collection
- Interface responsive (ordinateur, tablette, mobile)

---

## Accès à l'application

**URL** : http://localhost:3000

Ouvrez votre navigateur web et accédez à cette adresse.

---

## Navigation

### Barre latérale (Sidebar)

L'application comprend une barre de navigation sur la gauche avec deux sections :

- **Bibliothèque** : Gestion de vos livres
- **Statistiques** : Visualisation des données

#### Mode desktop
La sidebar reste visible en permanence.

#### Mode mobile
Utilisez le menu burger (☰) en haut à gauche pour afficher/masquer la sidebar.

---

## Gestion des livres

### Consulter la bibliothèque

La page principale affiche tous vos livres sous forme de cartes. Chaque carte comprend :

- Image de couverture (ou placeholder par défaut)
- Titre du livre
- Auteur
- Catégorie
- Année de publication
- Description (aperçu)
- Boutons d'action (Modifier / Supprimer)

### Ajouter un livre

1. Cliquez sur **"Ajouter un livre"** (bouton en haut à droite)
2. Remplissez le formulaire :

**Champs obligatoires** :
- Titre
- Auteur
- Catégorie

**Champs optionnels** :
- Année de publication
- Description
- URL de l'image de couverture

3. Cliquez sur **"Créer le livre"**

Le livre est ajouté immédiatement à votre bibliothèque.

### Modifier un livre

1. Sur la carte du livre, cliquez sur **"Modifier"**
2. Le formulaire s'affiche avec les données actuelles
3. Modifiez les champs souhaités
4. Cliquez sur **"Enregistrer les modifications"**

Vous pouvez cliquer sur **"Annuler"** pour revenir sans sauvegarder.

### Supprimer un livre

1. Sur la carte du livre, cliquez sur **"Supprimer"**
2. Confirmez la suppression dans la fenêtre de dialogue

**Attention** : Cette action est irréversible.

---

## Recherche et filtrage

### Panneau de filtres

La page Bibliothèque propose trois types de filtres qui peuvent être combinés :

#### Recherche par titre
Tapez le titre ou une partie du titre du livre recherché.

#### Recherche par auteur
Tapez le nom de l'auteur recherché.

#### Filtrage par catégorie
Sélectionnez une catégorie dans le menu déroulant.

### Fonctionnement

- Les résultats se mettent à jour **automatiquement** après 300ms de saisie
- La recherche est **insensible à la casse** (majuscules/minuscules)
- Les filtres sont **cumulatifs** (titre + auteur + catégorie)

### Réinitialiser les filtres

Cliquez sur **"Réinitialiser les filtres"** pour effacer tous les champs et afficher tous les livres.

---

## Statistiques

### Accès

Cliquez sur **"Statistiques"** dans la sidebar pour accéder aux visualisations.

### Vue d'ensemble

Un compteur affiche le **nombre total de livres** dans votre bibliothèque.

### Graphiques disponibles

#### 1. Livres par catégorie

**Type** : Graphique en barres verticales

Affiche la répartition de vos livres par catégorie (Fiction, Science-Fiction, Thriller, etc.).

**Utilité** : Identifier les genres les plus représentés dans votre collection.

#### 2. Top 10 auteurs

**Type** : Graphique circulaire (camembert)

Affiche les 10 auteurs avec le plus de livres dans votre bibliothèque.

**Utilité** : Découvrir vos auteurs favoris ou identifier des doublons.

#### 3. Livres par décennie de publication

**Type** : Graphique en barres horizontales

Affiche le nombre de livres publiés par décennie (1940s, 1950s, 1980s, etc.).

**Utilité** : Visualiser la période de publication de votre collection.

### Interactions

- **Survolez** un élément du graphique pour voir les détails exacts
- **Cliquez** sur une légende (graphique circulaire) pour masquer/afficher une catégorie

---

## Questions fréquentes

### Comment ajouter une image de couverture ?

1. Trouvez une image sur Internet (Amazon, Goodreads, Google Images)
2. Faites un clic droit sur l'image > "Copier l'adresse de l'image"
3. Collez l'URL dans le champ "URL de l'image de couverture"
4. Un aperçu s'affiche automatiquement

Si l'image ne fonctionne pas, laissez le champ vide. Un placeholder sera affiché.

### Pourquoi les résultats de recherche mettent du temps à apparaître ?

Un délai de 300ms (debounce) est appliqué pour éviter de surcharger le serveur pendant la saisie.

### Puis-je récupérer un livre supprimé ?

Non, la suppression est définitive. Assurez-vous de votre choix avant de confirmer.

### Comment trier les livres ?

Les livres sont actuellement triés par date d'ajout (les plus récents en premier).

### Combien de livres puis-je ajouter ?

Il n'y a pas de limite. L'application peut gérer des milliers de livres.

---

## Conseils d'utilisation

### Organisation

- Utilisez des **catégories cohérentes** (ex: "Science-Fiction" plutôt que "SF" ou "Sci-Fi")
- Ajoutez des **descriptions** pour retrouver facilement les livres
- Privilégiez des **URLs d'images stables** (évitez les images temporaires)

### Recherche efficace

- Utilisez **un seul filtre** pour des recherches larges
- **Combinez plusieurs filtres** pour des recherches précises
- Cliquez sur **"Réinitialiser"** si vous ne trouvez pas de résultats

---

## Support

Pour obtenir de l'aide :

1. Consultez cette documentation
2. Vérifiez la documentation technique (pour les développeurs)

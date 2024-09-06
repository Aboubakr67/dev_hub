# Dev Hub

## Description

Dev Hub est un blog destiné aux développeurs où vous pouvez créer et partager des articles sur divers langages de programmation et frameworks. Ce projet se compose d'une partie front-end et d'une partie back-end, toutes deux conçues pour offrir une expérience fluide et agréable.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [MongoDB](https://www.mongodb.com/) ou un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) pour la base de données
- [npm](https://www.npmjs.com/get-npm) (généralement installé avec Node.js)

## Installation

### Frontend

1. Naviguez dans le dossier `front` :

   ```bash
   cd front

   ```

2. Installez les dépendances :

   ```bash
   npm install

   ```

3. Démarrez le serveur de développement :

   ```bash
   npm run dev
   ```

### Back-end

1. Naviguez dans le dossier `back` :

   ```bash
   cd back

   ```

2. Installez les dépendances :

   ```bash
   npm install

   ```

3. Génerer les catégories :

   ```bash
   cd Data

   node generateCategories.js

   ```

4. Démarrez le serveur de développement :

   ```bash
   npm run start
   ```

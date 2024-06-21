## English Version - French Version Below 
## To Run this Project

### Navigate to Project Directory

Ensure you are in the 'vite-project' directory before proceeding with the following commands.

```bash
cd vite-project
nix-shell -p nodejs_21
npm install
npm run dev
```

## Project Overview:
This project involves creating a landing page to facilitate the collection of user information for booking test drive sessions at a car dealership. The goal is to support an Acquisition team member in launching a new prospect campaign for a specific car brand. 

The application is designed to function well on both desktop and mobile platforms, providing a consistent user experience across different screen sizes.

## Completed Achievements:
### Page Implementation and Interactions:
- Implemented pages with interactions between different states using buttons.
- Integrated buttons and form fields to enable navigation and data submission.

### Form Management:
- Adapted the form to work on both desktop and mobile devices.
- Maintained page design consistency using dedicated CSS files.

### Date and Phone Number Conversion:
- Implemented conversion of phone numbers to the required format (+33 XX XX XX XX).
- Formatted leasing duration into months (e.g., "6 mois" to "6M").

## Work in Progress:
### API Requests:
- Configured a request to obtain the name of a city based on a postal code using the French government's Administrative Division API.
- Configured a request to send prospect information (lead) without documentation for this request.
- Used fetch to send prospect information to a remote API.
- Used await to manage asynchronous calls.
- Partial implementation of API requests with ongoing issues.

-------------------------------------------------
## French Version

## Pour exécuter ce projet

### Naviguer vers le répertoire du projet

Assurez-vous d'être dans le répertoire "vite-project" avant de continuer avec les commandes suivantes.

```bash
cd vite-project
nix-shell -p nodejs_21
npm install
npm run dev
```

## Aperçu du projet :
Ce projet consiste à créer une page de destination pour faciliter la collecte des informations utilisateur afin de réserver des essais de conduite chez un concessionnaire automobile. L'objectif est de soutenir un membre de l'équipe d'acquisition dans le lancement d'une nouvelle campagne de prospection pour une marque de voiture spécifique.

L'application est conçue pour fonctionner efficacement sur les plateformes de bureau et mobiles, offrant une expérience utilisateur cohérente sur différentes tailles d'écran.

## Réalisations accomplies :
### Implémentation des pages et interactions :
- Mise en place des pages avec des interactions entre différents états à l'aide de boutons.
- Intégration des boutons et des champs de formulaire pour permettre la navigation et la soumission des données.

### Gestion du formulaire :
- Adaptation du formulaire pour fonctionner sur les appareils de bureau et mobiles.
- Maintien de la cohérence du design des pages à l'aide de fichiers CSS dédiés.

### Conversion de la date et du numéro de téléphone :
- Implémentation de la conversion des numéros de téléphone au format requis (+33 XX XX XX XX).
- Formatage de la durée de leasing en mois (par exemple, de "6 mois" à "6M").

## En cours :
### Requêtes API :
- Configuration d'une requete pour obtenir le nom d'une ville à partir d'un code postal en utilisant l'API de découpage administratif du gouvernement français.
- Configuration d'une requete pour permettre d'envoyer les informations du prospect (lead). Il n'y a pas de documentatino pour cette requete. 
- Utilisation de fetch pour envoyer les informations prospect à une API distante.
- Utilisation de await pour gérer les appels asynchrones.
- Implémentation partielle des requêtes API avec des problèmes en cours.
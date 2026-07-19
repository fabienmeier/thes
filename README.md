# 🍵 Ma Collection de Thés

Carnet de dégustation hébergé sur GitHub Pages. Consultable partout, partageable en lecture seule, modifiable avec un token GitHub.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application (code uniquement, ne contient plus les données) |
| `thes.json` | **Les données** de la collection (mis à jour automatiquement par l'app) |
| `manifest.webmanifest`, `sw.js`, `icon.svg` | PWA : installation sur l'écran d'accueil + mode hors ligne |

## Déploiement

1. Pousser les 5 fichiers à la racine du dépôt `gargouille88/thes` (branche `main`).
2. Sur GitHub : **Settings → Pages → Deploy from a branch → main / (root)**.
3. Le site sera sur `https://gargouille88.github.io/thes/`.

## Token (mode édition)

1. Créer un **fine-grained token** : github.com → Settings → Developer settings → Fine-grained tokens.
2. *Repository access* : **Only select repositories** → `thes` uniquement.
3. *Permissions* : **Contents → Read and write**. Rien d'autre.
4. Dans l'app, cliquer 🔑 et coller le token. Sans token, la page est en lecture seule — c'est le mode à partager.

## Migration depuis l'ancienne version

Tes données actuelles sont dans le `localStorage` de ton navigateur. Ouvre la nouvelle page **sur ce même navigateur** : elles seront reprises automatiquement, et la première sauvegarde (enregistrement du token ou première modification) créera `thes.json` sur GitHub. Ensuite, tous tes appareils liront ce fichier.

## Ce qui a changé

- Données séparées du code (`thes.json`) : plus de corruption d'accents, plus de fichier qui se réécrit lui-même, historique Git propre.
- Synchronisation robuste : debounce, gestion des conflits (409), reprise automatique des modifications hors ligne.
- Échappement HTML de tous les champs (anti-XSS), liens limités à http/https.
- Vue « cartes » sur mobile, mode sombre (🌙), en-tête de tableau fixe, PWA installable.
- Export/import JSON complet (tags, infusions, dégustations, historique inclus), parseur CSV corrigé.
- Note moyenne calculée depuis les dégustations (bouton dans l'onglet Dégustations).

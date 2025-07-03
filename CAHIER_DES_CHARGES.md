# Cahier des charges — Projet Tuto_training-

## 1. Problématique

L'apprentissage de Git est souvent perçu comme complexe, technique et peu accessible, notamment pour les débutants ou les équipes non techniques. Les ressources existantes sont dispersées, rarement interactives, et ne permettent pas de s'entraîner en conditions réelles. Il manque une plateforme centralisée, moderne et pédagogique qui combine explications claires, pratique interactive et expérience utilisateur premium.

## 2. Solution apportée

Tuto_training- propose une plateforme web premium, moderne et responsive dédiée à l'apprentissage collaboratif des commandes Git. Le site offre :
- Un design harmonisé, professionnel et validé designer (glassmorphism, gradients, animations, responsive)
- Des pages explicatives pour chaque commande Git, avec exemples, astuces, illustrations premium
- Une recherche instantanée et une navigation fluide
- Un espace membre sécurisé (à venir) pour suivre sa progression
- Un IDE Git intégré (à venir) pour simuler et pratiquer les commandes en direct, sans rien installer
- Une accessibilité et une expérience mobile optimales
- Un socle technique robuste, sécurisé et évolutif

---

## 3. Présentation du projet

Tuto_training- est une plateforme web premium, moderne et responsive dédiée à l'apprentissage collaboratif des commandes Git. Elle vise à rendre l'apprentissage de Git accessible, interactif et professionnel, avec une expérience utilisateur digne d'un site validé designer.

---

## 4. Fonctionnalités déjà implémentées

- Accueil premium avec navigation moderne, header/footer harmonisés, design glassmorphism, responsive.
- Page Commandes : grille de toutes les commandes Git, recherche instantanée, icônes SVG premium, responsive parfait.
- Pages de détail pour chaque commande Git : header/footer premium, titres, description claire, exemples de code stylisés, illustration/capture premium, astuce, responsive, accessibilité.
- Page À propos : présentation des contributeurs, rôles, photos, descriptions, réseaux sociaux animés, design premium, responsive.
- Recherche dynamique sur les commandes (filtrage instantané, accessibilité, effet premium, message "aucun résultat").
- Nettoyage du code, centralisation des styles dans `main.css`, suppression des fichiers obsolètes.
- README.md à jour, expliquant la structure, la logique et la contribution.

---

## 5. Fonctionnalités à venir

- Authentification obligatoire (inscription, connexion, gestion de session, redirection automatique si non authentifié).
- Espace membre (profil, historique des commandes exécutées, tableau de bord personnel, badges, statistiques).
- IDE Git personnalisé intégré (éditeur de code, terminal interactif, simulation des commandes Git en temps réel, affichage des résultats, sandbox sécurisée).
- Administration (gestion des contenus, gestion des utilisateurs, back-office).
- Mode sombre/clair automatique.
- Internationalisation (français, anglais, etc.).
- Blog ou tutoriels interactifs, mini-quizz.
- Documentation technique et utilisateur intégrée.
- Sécurité avancée (protection XSS, CSRF, limitation des tentatives, chiffrement, logs, HTTPS).
- Déploiement automatisé (CI/CD, Dockerisation, monitoring, variables d'environnement).

---

## 6. Architecture et arborescence

### Structure technique
- **Frontend** : HTML5, CSS3 (main.css), JS natif (React prévu pour l'IDE et l'espace membre)
- **Backend** (à venir) : Node.js/Express, MongoDB ou PostgreSQL
- **IDE intégré** : Monaco Editor ou xterm.js, sandbox Docker/WASM
- **Déploiement** : Docker, CI/CD, Vercel/Netlify (frontend), Render/Heroku (backend)

### Arborescence fonctionnelle
- Accueil (`index.html`)
- Commandes Git (`AcceilCommand.html`)
- Détail de chaque commande (`commands/git-*.html`)
- À propos (`about.html`)
- Contact (à venir)
- Scripts (`Scripts/`)
- Styles (`styles/main.css`)
- Assets (images, logos, screenshots, SVG)

### Schéma d'architecture (Mermaid)

```mermaid
graph TD;
  Utilisateur-->|Navigateur|Frontend[Frontend (HTML/CSS/JS)]
  Frontend-->|API REST|Backend[Backend (Node.js/Express)]
  Backend-->|DB|Database[(MongoDB/PostgreSQL)]
  Frontend-->|IDE intégré|IDE[IDE Git (Monaco/xterm.js)]
  IDE-->|Sandbox|Sandbox[Docker/WASM]
  Frontend-->|Assets|Assets[Images, SVG, CSS]
```

---

## 7. Planning estimatif

| Étape/Fonctionnalité                | Responsable   | Durée estimée | Statut      |
|-------------------------------------|---------------|--------------|-------------|
| Refonte premium (UI/UX, CSS, pages) | Équipe Front  | 2 semaines   | Terminé     |
| Recherche dynamique                 | Équipe Front  | 2 jours      | Terminé     |
| Nettoyage code, centralisation CSS  | Équipe Front  | 2 jours      | Terminé     |
| Authentification/Espace membre      | Équipe Full   | 1 semaine    | À faire     |
| IDE Git personnalisé intégré        | Équipe Full   | 2 semaines   | À faire     |
| Sécurité avancée (auth, sandbox)    | Équipe Back   | 1 semaine    | À faire     |
| Déploiement automatisé (CI/CD)      | DevOps        | 3 jours      | À faire     |
| Documentation technique/utilisateur | Tous          | 2 jours      | À faire     |
| Tests fonctionnels & accessibilité  | QA            | 3 jours      | À faire     |

---

## 8. Tableau des tâches (Kanban)

| Tâche/Fonctionnalité                | Responsable   | Statut      |
|-------------------------------------|---------------|-------------|
| Accueil premium                     | Équipe Front  | Terminé     |
| Page Commandes + recherche          | Équipe Front  | Terminé     |
| Détail commandes premium            | Équipe Front  | Terminé     |
| Page À propos                       | Équipe Front  | Terminé     |
| Nettoyage code, centralisation CSS  | Équipe Front  | Terminé     |
| Authentification                    | Équipe Full   | À faire     |
| Espace membre                       | Équipe Full   | À faire     |
| IDE Git intégré                     | Équipe Full   | À faire     |
| Sécurité avancée                    | Équipe Back   | À faire     |
| Déploiement CI/CD                   | DevOps        | À faire     |
| Documentation                       | Tous          | À faire     |
| Tests QA                            | QA            | À faire     |

---

## 9. Design & identité visuelle

- Style premium, moderne, glassmorphism, gradients, ombres, animations douces.
- Logos, palette de couleurs et typographies premium définis et utilisés.
- Responsive design sur toutes les pages.
- Accessibilité (contrastes, aria-labels, navigation clavier, images avec alt).

---

## 10. Technologies et contraintes techniques

- Frontend : HTML5, CSS3 (main.css), JavaScript ES6+ (JS natif, React prévu pour l'IDE et l'espace membre).
- Backend (à venir) : Node.js/Express, MongoDB ou PostgreSQL.
- IDE intégré : Monaco Editor ou xterm.js, sandbox Docker ou WASM.
- Authentification : JWT, chiffrement bcrypt, gestion des rôles.
- Déploiement : Docker, CI/CD (GitHub Actions), hébergement sur Vercel/Netlify (frontend) et Render/Heroku (backend).
- Sécurité : chiffrement, sanitization, sandbox, HTTPS, logs, RGPD à respecter.

---

## 11. Contenus

- Textes premium rédigés et validés designer.
- Images, logos, screenshots fournis et optimisés.
- Langue principale : français (multilingue à venir).

---

## 12. Critères de validation

- Toutes les pages premium sont en ligne, accessibles et responsives.
- Recherche et navigation fonctionnelles.
- Authentification et IDE intégrés (pour la V2).
- Accessibilité et sécurité validées.
- Tests fonctionnels, compatibilité navigateurs, responsive, accessibilité, sécurité.
- Documentation technique et utilisateur à jour.

---

## 13. Collaboration et gestion de projet

- Utilisation de Git/GitHub pour la gestion de versions, issues, pull requests.
- Revue de code systématique avant merge.
- Communication régulière (issues, réunions, documentation).
- Cahier des charges versionné dans le repo et mis à jour à chaque évolution majeure. 
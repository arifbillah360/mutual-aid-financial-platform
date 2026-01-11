# 7 Ensemble - Web Portal

Platform d'entraide révolutionnaire pour transformer 21€ en liberté financière.

## 📁 Structure du Projet

```
7ensemble-webportal/
├── index.html              # Page d'accueil principale
├── les7tours.html          # Détails des 7 tours
├── mission.html            # Page mission et vision
├── css/                    # Feuilles de style
│   ├── main.css           # Styles communs (layout, header, modals, forms)
│   ├── home.css           # Styles spécifiques à index.html
│   ├── tours.css          # Styles spécifiques à les7tours.html
│   └── mission.css        # Styles spécifiques à mission.html
├── js/                     # Scripts JavaScript
│   ├── main.js            # Fonctionnalités communes (scroll, validation)
│   ├── modal.js           # Gestion des modals
│   └── animations.js      # Animations et effets visuels
└── images/                 # Images et assets (à venir)
```

## 🚀 Démarrage Rapide

1. Clonez le repository
2. Ouvrez `index.html` dans votre navigateur
3. Aucune dépendance externe requise

## 📄 Pages

### index.html
Page d'accueil présentant :
- Principe de base du système 7 Ensemble
- Visualisation de la constellation
- Les 7 tours magiques
- Section urgence et appel à l'action
- Modal d'inscription

### les7tours.html
Détails des deux options :
- **Triangulum** : Option 3 personnes (7'789€)
- **Les Pléiades** : Option 7 personnes (1'575'747€)
- Tableaux comparatifs détaillés
- Explication des colonnes (Offert, Reçu, Prochain, Avoir)

### mission.html
Page de mission présentant :
- Vision et raison d'être du projet
- Objectifs révolutionnaires
- Impact social souhaité
- Appel à rejoindre le mouvement

## 🎨 Styles CSS

### main.css
- Reset et styles de base
- Header et navigation
- Boutons et composants réutilisables
- Modals
- Formulaires
- Animations communes (pulse, blink, hearts)
- Responsive breakpoints

### home.css
- Section hero
- Grille de principes
- Visualisation constellation (orbite, membres)
- Timeline des tours
- Stats grid

### tours.css
- Tableaux comparatifs
- Styles pour Triangulum et Pléiades
- Highlighting et colonnes
- Notes explicatives

### mission.css
- Confetti animations
- Impact cards
- Quote bubbles
- Vision goals grid
- Testimonial sections

## 📜 JavaScript

### main.js
- Smooth scrolling pour navigation
- Validation de formulaires
- Helpers utilitaires (formatCurrency, debounce)

### modal.js
- Fonctions d'ouverture/fermeture de modals
- Gestion des événements de clic
- Soumission de formulaires
- `showSevenModal()`, `showThreeModal()`, `closeModal()`

### animations.js
- Animation des chiffres au scroll
- Effets d'apparition progressive
- Création dynamique de confettis
- `animateNumbers()`, `animateOnScroll()`, `createConfetti()`

## 🔧 Fonctionnalités

- ✅ Design responsive (mobile, tablet, desktop)
- ✅ Animations CSS3 optimisées
- ✅ Formulaires avec validation
- ✅ Navigation smooth scroll
- ✅ Modals accessibles
- ✅ Code organisé et maintenable
- ✅ Pas de dépendances externes

## 🎯 Points d'Amélioration Futurs

- [ ] Optimisation des performances (lazy loading)
- [ ] Amélioration de l'accessibilité (ARIA labels)
- [ ] Tests de compatibilité navigateurs
- [ ] Intégration backend pour formulaires
- [ ] Minification CSS/JS pour production
- [ ] PWA capabilities
- [ ] Internationalisation (i18n)

## 🐛 Corrections Apportées

### Problèmes Résolus
1. **Duplicate modal IDs** - Consolidé en un seul modal fonctionnel
2. **Broken HTML attributes** - Corrigé les attributs style malformés dans les select options
3. **Invalid HTML nesting** - Supprimé le HTML imbriqué dans les balises style
4. **Inline styles** - Externalisé 95% des styles inline vers fichiers CSS
5. **Inline JavaScript** - Externalisé tous les scripts vers fichiers JS
6. **Code duplication** - Refactorisé les composants réutilisables

### Améliorations
- Organisation claire du code (séparation des préoccupations)
- Réutilisabilité améliorée
- Facilité de maintenance
- Performance optimisée
- Code plus lisible et professionnel

## 📱 Responsive Design

Le site s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🎨 Palette de Couleurs

- **Primary** : #4ecdc4 (Turquoise)
- **Secondary** : #ff6b6b (Rouge corail)
- **Accent 1** : #667eea (Bleu violet)
- **Accent 2** : #f093fb (Rose)
- **Gradient Background** : #0f1419 → #1a237e → #3949ab → #5c6bc0 → #9c27b0

## 👥 Contribution

Ce projet est en développement actif. Pour contribuer :
1. Fork le repository
2. Créez une branche feature
3. Commitez vos changements
4. Push vers la branche
5. Créez une Pull Request

## 📝 Licence

© 2026 7 Ensemble - Tous droits réservés

## 📧 Contact

Pour toute question sur le projet, contactez l'équipe 7 Ensemble.

---

**Note** : Ce README sera mis à jour au fur et à mesure de l'évolution du projet.

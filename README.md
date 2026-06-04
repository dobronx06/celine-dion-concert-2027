# Concerts de Céline Dion à Paris La Défense Arena - Mai 2027

Site de compte à rebours pour les concerts de Céline Dion à Paris La Défense Arena les 28 et 29 mai 2027.

## Instanciation

Ce site a été généré à partir du template countdown avec les données validées et le thème personnalisé "élégance théâtrale parisienne".

**Données sources:**
- `/Users/tom/celine-dion-concert-2027/data.json` (validé)
- `/Users/tom/celine-dion-concert-2027/theme.json` (direction artistique)

**Template source:**
- `/Users/tom/Documents/GitHub/template-countdown/`

## Caractéristiques

- 2 événements confirmés (28 et 29 mai 2027)
- Compte à rebours en direct avec Web Components
- Thème personnalisé : fond noir élégant avec accents dorés (#d4af37)
- Polices : Cinzel (titres) + Inter (texte)
- Effets visuels : spotlight, shimmer doré, backdrop blur, grain cinématographique
- Responsive et accessible (WCAG AA)
- Métadonnées SEO complètes + JSON-LD
- Disclaimer : "Site non affilié à Céline Dion ni à ses représentants."

## Développement

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/
npm run preview    # preview du build
```

## Build Status

✅ Build réussi le 2026-06-04
- 3 pages HTML générées
- 3 images OG SVG générées
- Prêt pour déploiement

## Structure

```
dist/
├── index.html                           # Page d'accueil (liste des 2 concerts)
├── celine-dion-28-mai-2027/
│   └── index.html                       # Page détail concert 28 mai
├── celine-dion-29-mai-2027/
│   └── index.html                       # Page détail concert 29 mai
└── og/
    ├── index.svg                        # OG image accueil
    ├── celine-dion-28-mai-2027.svg     # OG image concert 28 mai
    └── celine-dion-29-mai-2027.svg     # OG image concert 29 mai
```

## Prochaines étapes

1. **Nom de domaine** : utiliser `domain-checker` pour trouver un domaine disponible
2. **Déploiement** : utiliser `repo-pusher` pour créer le repo GitHub et déployer sur Cloudflare Pages

## Configuration déploiement Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

## Sources

- Annonce officielle : https://www.celinedion.com/news/due-to-overwhelming-demand-celine-dion-announces-additional-dates-at-paris-la-defense-arena-in-may-2027/
- Salle : https://www.parisladefense-arena.com/en/evenement/celine-dion-paris-2027-en/
- Paris La Défense : https://www.parisladefense.com/en/news/events/celine-dion-shows-2027

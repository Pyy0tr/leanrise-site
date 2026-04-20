# LEANRISE — Site web

Site de Gianni Di Guida, coach fitness en ligne. Brand : **LEANRISE**.

## Stack

| Composant | Outil |
|-----------|-------|
| Static site generator | 11ty (Eleventy) v3 |
| Templating | Nunjucks |
| CMS client | Decap CMS |
| Hébergement | Vercel (migré depuis Netlify — 2026-04-20) |
| CI/CD | Vercel (auto-deploy sur push `main`) |
| Domaine | `leanrise-coaching.com` (Cloudflare Registrar) |
| DNS / Anti-bot | Cloudflare (Bot Fight Mode activé) |

## URLs

| Environnement | URL |
|---------------|-----|
| Production | `https://www.leanrise-coaching.com` |
| Local | `http://localhost:8080` |

## Commandes

```bash
npm start       # serveur local avec hot reload
npm run build   # compile le site dans _site/
```

## Structure

```
leanrise-site/
├── src/
│   ├── _includes/     # layouts et partials Nunjucks
│   ├── _data/         # contenu géré par Decap CMS (YAML/JSON)
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css
│   │   ├── js/
│   │   │   ├── animations.js
│   │   │   └── gallery.js
│   │   └── images/
│   │       ├── logo-leanrise-light.png
│   │       └── photos/  # toutes en .webp
│   ├── admin/         # interface Decap CMS (/admin)
│   └── robots.txt     # anti-bot (SEO crawlers + AI bots bloqués)
├── _site/             # output compilé — ignoré par git
├── .eleventy.js       # config 11ty
└── netlify.toml       # conservé, non utilisé (migration Vercel)
```

## Pages

| URL | Statut | Description |
|-----|--------|-------------|
| `/` | ✅ Live | Landing page principale |
| `/admin/` | ✅ Live | Interface Decap CMS |

## Funnel

```
Instagram ad → Landing page → Calendly → Page merci
```

## Optimisations images
- Format WebP (converti depuis JPEG, -48% de poids)
- `loading="eager"` uniquement sur `transformation-01.webp`
- `loading="lazy"` sur toutes les autres photos

## CMS client (Decap CMS) — à faire

Gianni doit pouvoir gérer seul :
- Ajouter un lien de vidéo témoignage YouTube
- Ajouter une photo de transformation

Tout le reste (textes, design, structure) est géré par Pyyotr directement.

### Setup requis
Le backend actuel (`git-gateway`) est spécifique à Netlify et ne fonctionne plus depuis la migration Vercel.
Migration à faire vers le backend `github` :
1. Créer une **GitHub OAuth App** (GitHub Settings → Developer settings → OAuth Apps)
2. Déployer un **proxy OAuth** via Vercel serverless function
3. Mettre à jour `src/admin/config.yml` avec le nouveau backend
4. Connecter les collections CMS aux templates Nunjucks

## Prochaines étapes
- Mettre en place le CMS (voir section ci-dessus)
- Page merci post-Calendly

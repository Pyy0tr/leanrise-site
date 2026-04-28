# LEANRISE — Site web

Site de Gianni Di Guida, coach fitness en ligne. Brand : **LEANRISE**.

## Stack

| Composant | Outil |
|-----------|-------|
| Static site generator | 11ty (Eleventy) v3 |
| Templating | Nunjucks |
| CMS client | Decap CMS v3 |
| Auth CMS | GitHub OAuth App + proxy Vercel serverless |
| Hébergement | Vercel (auto-deploy sur push `main`) |
| Domaine | `leanrise-coaching.com` (Cloudflare Registrar) |
| DNS / CDN / Cache | Cloudflare (proxied, cache rules actives) |

## URLs

| Environnement | URL |
|---------------|-----|
| Production | `https://www.leanrise-coaching.com` |
| Local | `http://localhost:8080` |
| Back-office | `https://www.leanrise-coaching.com/admin/` |

## Commandes

```bash
npm start       # serveur local avec hot reload
npm run build   # compile le site dans _site/
```

## Structure

```
leanrise-site/
├── api/
│   ├── auth.js        # proxy OAuth GitHub — /api/auth (Vercel serverless)
│   └── callback.js    # callback OAuth — /api/callback (Vercel serverless)
├── src/
│   ├── _data/
│   │   ├── testimonials.json   # IDs YouTube (géré via CMS)
│   │   └── transformations.json # chemins photos (géré via CMS)
│   ├── assets/
│   │   ├── css/main.css
│   │   ├── js/
│   │   │   ├── animations.js
│   │   │   ├── gallery.js
│   │   │   └── vidgallery.js
│   │   └── images/photos/      # toutes en .webp
│   ├── admin/
│   │   ├── index.html          # interface Decap CMS
│   │   └── config.yml          # config CMS (backend github, collections JSON)
│   └── robots.txt
├── _site/             # output compilé — ignoré par git
├── .eleventy.js       # config 11ty (filtre json custom)
└── vercel.json        # headers de cache + routes serverless
```

## Pages

| URL | Statut | Description |
|-----|--------|-------------|
| `/` | ✅ Live | Landing page principale |
| `/admin/` | ✅ Live | Interface Decap CMS (login GitHub) |

## Funnel

```
Instagram ad → Landing page → Calendly → Page merci
```

## CMS back-office (Decap CMS)

Gianni peut gérer seul depuis `/admin/` :
- **Témoignages vidéo** — ajouter/supprimer des IDs YouTube
- **Photos de transformation** — uploader des photos

Tout le reste (textes, design, structure) est géré par Pyyotr directement.

### Architecture OAuth
```
Navigateur → /api/auth → GitHub OAuth App → /api/callback → Decap CMS
```
- OAuth App GitHub : `Leanrise CMS`
- Variables Vercel requises : `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `SITE_URL`

## Optimisations
- Images WebP (converti depuis JPEG, -48%)
- Cache Cloudflare : règle "Cache tout le site" sur les deux hostnames
- Headers Vercel : images `immutable 1 an`, CSS/JS `1 semaine`, HTML `must-revalidate`

## Prochaines étapes
- Page merci post-Calendly

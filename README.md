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
│   │   ├── js/
│   │   └── images/
│   ├── admin/         # interface Decap CMS (/admin)
│   └── robots.txt     # anti-bot (SEO crawlers + AI bots bloqués)
├── _site/             # output compilé — ignoré par git
├── .eleventy.js       # config 11ty
└── netlify.toml       # config Netlify (conservé, non utilisé)
```

## Pages

| URL | Statut | Description |
|-----|--------|-------------|
| `/` | Placeholder | Index |
| `/landing-v1/` | ✅ Live | Landing page v1 — direction validée Gianni |
| `/admin/` | ✅ Live | Interface Decap CMS |

## Funnel

```
Instagram ad → VSL → Calendly → Page merci
```

## Prochaines étapes
- Intégrer retour détaillé Gianni (animations, style minimaliste)
- Construire landing finale, VSL, page merci

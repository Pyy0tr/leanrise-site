# LEANRISE — Site web

Site de Gianni Di Guida, coach fitness en ligne. Brand : **LEANRISE**.

## Stack

| Composant | Outil |
|-----------|-------|
| Static site generator | 11ty (Eleventy) v3 |
| Templating | Nunjucks |
| CMS client | Decap CMS |
| Hébergement | Netlify |
| CI/CD | Netlify (auto-deploy sur push `main`) |

## URLs

| Environnement | URL |
|---------------|-----|
| Production | `https://leanrise.netlify.app` |
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
│   └── admin/         # interface Decap CMS (/admin)
├── _site/             # output compilé — ignoré par git
├── .eleventy.js       # config 11ty
└── netlify.toml       # config Netlify
```

## Funnel

```
Instagram ad → VSL → Calendly → Page merci
```

# Leanrise — Guide d'administration technique

## Vue d'ensemble

Le site leanrise-coaching.com est composé de trois briques :

| Brique | Rôle |
|---|---|
| **Eleventy** | Générateur de site statique (SSG) — transforme les templates en HTML |
| **Vercel** | Hébergement + déploiement automatique + fonctions serverless |
| **Decap CMS** | Interface d'administration à `/admin` |

Le flux est le suivant : modification dans le CMS → commit automatique sur GitHub → Vercel rebuild → site mis à jour en ~1 minute.

---

## Comptes et accès

| Service | URL | Compte |
|---|---|---|
| GitHub | github.com | Pyy0tr |
| Vercel | vercel.app | lier au compte GitHub |
| Site prod | leanrise-coaching.com | — |
| Back office | leanrise-coaching.com/admin | login GitHub |

---

## Structure du repo

```
leanrise-site/
├── api/
│   ├── auth.js          # proxy OAuth GitHub (étape 1)
│   └── callback.js      # proxy OAuth GitHub (étape 2)
├── src/
│   ├── _data/
│   │   ├── testimonials.json    # URLs/IDs vidéos YouTube
│   │   └── transformations.json # chemins photos
│   ├── admin/
│   │   └── index.html   # interface Decap CMS
│   ├── assets/
│   └── index.njk        # template principal
├── .eleventy.js         # config Eleventy + filtres
└── vercel.json          # config Vercel
```

---

## Variables d'environnement Vercel

Ces trois variables sont requises pour que le back office fonctionne. Les modifier dans **Vercel → leanrise-site → Settings → Environment Variables**.

| Variable | Valeur |
|---|---|
| `GITHUB_CLIENT_ID` | Client ID de l'OAuth App GitHub |
| `GITHUB_CLIENT_SECRET` | Secret de l'OAuth App GitHub |
| `SITE_URL` | `https://www.leanrise-coaching.com` |

⚠️ Après toute modification des variables, faire un **Redeploy** dans Vercel pour qu'elles soient injectées dans les fonctions.

---

## OAuth App GitHub

L'authentification du back office passe par une **GitHub OAuth App** (pas une GitHub App — ce sont deux choses différentes).

Pour la consulter ou la recréer :
**github.com → Settings → Developer settings → OAuth Apps → Leanrise CMS**

| Champ | Valeur |
|---|---|
| Homepage URL | `https://www.leanrise-coaching.com` |
| Authorization callback URL | `https://www.leanrise-coaching.com/api/callback` |

Si l'app est recréée, mettre à jour `GITHUB_CLIENT_ID` et `GITHUB_CLIENT_SECRET` dans Vercel puis redéployer.

---

## Déploiement

Tout push sur la branche `main` déclenche automatiquement un redeploy Vercel.

```bash
git add .
git commit -m "description de la modification"
git push
```

Pour forcer un redeploy sans modification de code :
**Vercel → Deployments → dernier deploy → ··· → Redeploy**

---

## Ajouter une nouvelle collection au CMS

1. Créer le fichier de données dans `src/_data/` (format JSON)
2. Ajouter la collection dans `src/admin/index.html` dans l'objet `collections` de `CMS.init()`
3. Utiliser la donnée dans le template Nunjucks (`src/index.njk`)
4. Push → redeploy automatique

---

## Problèmes connus et solutions

| Problème | Cause | Solution |
|---|---|---|
| Login retourne une page GitHub 404 | `GITHUB_CLIENT_ID` vide dans la fonction | Supprimer/recréer la var Vercel + redeploy |
| "Repo not found" au login | OAuth App vs GitHub App | Vérifier que c'est bien une **OAuth App** |
| Modifications CMS non visibles sur le site | Build pas déclenché | Vérifier dans Vercel → Deployments que le build s'est lancé |

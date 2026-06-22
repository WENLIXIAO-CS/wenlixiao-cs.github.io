# wenlixiao-cs.github.io

Personal portfolio site. Next.js 14 (App Router) + Tailwind, content lives in `app/data/*.ts`,
rendered by components in `app/components/`.

## Local dev

```bash
npm run dev   # next dev (falls back to :3001/:3002 if :3000 is taken)
```

## Deployment (Vercel)

- **GitHub repo:** `WENLIXIAO-CS/wenlixiao-cs.github.io` (remote `origin`).
- **Vercel project:** `wenlixiao-cs-github-io` (team `wenli-xiaos-projects`),
  connected to the GitHub repo via the GitHub integration.
- **Production branch:** `nextjs` (NOT `main`). Pushing to `nextjs` triggers a production deploy.
- **Custom domain:** `www.wenlixiao.com` (with `wenlixiao.com` → `www` redirect).
- `autoAssignCustomDomains` is **on**, so each production deploy auto-points the domain
  at the newest build — no manual promote needed.

### Keep only one deployment (manual cleanup)

Vercel retains every push as an immutable deployment. To keep only the current
production deployment and delete the older unaliased ones, run:

```bash
vercel rm wenlixiao-cs-github-io --safe --yes
```

`--safe` skips the currently-aliased production deployment, so this is safe to run anytime
(e.g. after pushing an update). Re-run it periodically to prune accumulated deployments.

If the domain ever lags behind the latest push, manually promote a deployment:

```bash
vercel ls wenlixiao-cs-github-io          # find the latest deployment id/url
vercel promote <deployment-id> --yes
```

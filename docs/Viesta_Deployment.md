# Viesta Deployment Guide

This guide explains how to deploy the Viesta Nutrition website to Vercel after selecting its Git repository in the Vercel dashboard.

## 1. Current deployment readiness

The repository is technically ready for a Vercel preview deployment:

- It is a Next.js App Router application.
- `package.json` defines the standard `build` and `start` scripts.
- `package-lock.json` is committed, so Vercel will use npm.
- The project root contains the Next.js configuration and application source.
- Product and blog detail routes generate their parameters from local data.
- Static assets are stored in `public/`.
- There is no database, authentication service, server-side secret, or required environment variable.
- The application does not require a custom `vercel.json` file.

Technical deployment readiness is not the same as business launch readiness. Treat the first deployment as a preview or staging deployment until the launch checklist in this guide is complete.

## 2. Production launch blockers

Confirm these items before directing customers to the production domain:

- Review product labels, ingredients, usage directions, warnings, and health claims.
- Replace placeholder testimonials with approved customer reviews or remove them.
- Finalize the privacy policy, terms of service, and returns/refund policy.
- Confirm the final M-Pesa Paybill/Till and payment instructions.
- Confirm all displayed contact information and remove placeholder wording.
- Test the complete WhatsApp order handoff on real mobile devices.
- Confirm that `https://viesta.co.ke` is the intended canonical production URL.

The canonical URL is currently defined in `src/data/site.ts`. Preview deployments will still generate metadata based on `https://viesta.co.ke`; this is acceptable for internal review, but the custom domain should be connected before the public launch.

## 3. Import configuration after selecting the repository

After selecting the Viesta repository in Vercel, review the project configuration before clicking **Deploy**.

Use these values:

| Setting | Value | Notes |
|---|---|---|
| Project Name | `viesta` or the preferred Vercel project name | This affects the generated `vercel.app` URL, not the website branding. |
| Framework Preset | Next.js | Vercel should detect this automatically. |
| Root Directory | `./` | The Next.js project is at the repository root. |
| Install Command | Default | Vercel detects `package-lock.json` and uses npm. |
| Build Command | Default (`npm run build`) | The repository already defines the correct script. |
| Output Directory | Default | Do not set `out`, `.next`, or another custom directory. Vercel handles Next.js output. |
| Development Command | Default (`npm run dev`) | No override is required. |
| Node.js Version | `20.x` | This matches the repository's documented Node.js 20 requirement and is a conservative deployment choice. |
| Environment Variables | None | The current application does not read environment variables. |

Do not enable monorepo settings or change the root directory. Do not add a `vercel.json` file merely to repeat these defaults.

Vercel currently supports Node.js 20.x, 22.x, and 24.x. If 20.x is no longer available in the dashboard, use the oldest actively supported Vercel LTS version that satisfies the installed Next.js version, then validate the production build and application behavior before launch. Next.js 16 requires Node.js 20.9 or newer.

Official references:

- [Deploying Git repositories with Vercel](https://vercel.com/docs/git)
- [Supported Node.js versions on Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Next.js installation and runtime requirements](https://nextjs.org/docs/app/getting-started/installation)

## 4. Create the first deployment

1. Confirm the settings in the previous section.
2. Leave the Environment Variables section empty.
3. Click **Deploy**.
4. Wait for dependency installation, the Next.js build, and deployment to finish.
5. If the deployment succeeds, open the generated `*.vercel.app` URL.
6. Keep the deployment URL for preview testing before connecting the production domain.

If Vercel reports a build failure, open the failed deployment and inspect its build logs. Start with the first meaningful error rather than later cascading errors.

Common configuration mistakes for this repository are:

- Selecting a subdirectory instead of the repository root.
- Overriding the output directory with `out` or `.next`.
- Using an unsupported Node.js version.
- Overriding the install or build command unnecessarily.
- Deploying a repository revision that does not contain `package-lock.json` or the required public images.

## 5. Preview deployment validation

Validate the generated Vercel URL before connecting `viesta.co.ke`.

### Core routes

Open and inspect:

- `/`
- `/shop`
- At least two `/products/[slug]` pages
- `/cart`
- `/checkout`
- `/blog`
- At least one `/blog/[slug]` page
- `/about`
- `/contact`
- `/faqs`
- `/privacy-policy`
- `/returns-refund-policy`
- `/terms-of-service`
- A deliberately invalid URL to confirm the 404 experience

### Functional checks

- Confirm all product, category, blog, brand, and logo images load.
- Search, filter, and sort products.
- Add products to the cart and change quantities.
- Refresh the page and confirm the cart persists in the browser.
- Complete checkout validation with valid and invalid customer data.
- Check shipping fees for Nairobi, Kiambu, a KES 500 town, and the “Other” option.
- Open the generated WhatsApp order and verify the recipient, items, quantities, customer details, shipping, and total.
- Test header navigation, mobile navigation, cart drawer, footer links, and the floating WhatsApp button.
- Check the site at mobile, tablet, and desktop widths.
- Check browser console and Vercel runtime logs for unexpected errors.

Opening WhatsApp does not submit an order automatically. The customer must send the pre-filled message in WhatsApp.

## 6. Production branch and automatic deployments

The repository's production branch is `main`.

With Vercel's standard Git integration:

- A deployment from the production branch becomes a production deployment.
- Other branches and pull requests normally create preview deployments.
- New commits pushed to `main` trigger new production builds automatically.

Before relying on this workflow, open **Project → Settings → Git** and confirm that the Production Branch is `main`.

For safer releases while the website is pre-launch, validate changes through preview deployments before merging them into `main`. If the project is configured to stage production deployments, a deployment can instead be promoted manually from the **Deployments** page.

See [Vercel deployment environments](https://vercel.com/docs/deployments/overview) and [promoting a deployment](https://vercel.com/docs/deployments/promoting-a-deployment).

## 7. Connect `viesta.co.ke`

Connect the domain only after the preview deployment and business content are approved.

1. Open the Viesta project in Vercel.
2. Go to **Settings → Domains**.
3. Add `viesta.co.ke`.
4. Add `www.viesta.co.ke` when prompted, or add it separately.
5. Choose which hostname is primary and configure the other to redirect to it. Using one canonical hostname avoids duplicate URLs.
6. At the domain registrar or current DNS provider, add the exact DNS records Vercel displays.
7. Do not copy an IP address or CNAME from an unrelated guide: Vercel may show project-specific values.
8. Preserve existing email-related DNS records, including MX, SPF, DKIM, and DMARC records. Replacing nameservers without recreating those records can interrupt email delivery.
9. Wait for Vercel to report that the domain configuration is valid.
10. Confirm that Vercel has provisioned HTTPS and that both the apex and `www` hostnames behave as intended.

DNS propagation can take time. If Vercel shows **Invalid Configuration**, compare the record name, type, and value against the exact values in **Settings → Domains**. Remove conflicting A, AAAA, or CNAME records only after confirming they are obsolete.

Official references:

- [Set up a custom domain on Vercel](https://vercel.com/docs/domains/set-up-custom-domain)
- [Add and configure a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Troubleshoot Vercel domains](https://vercel.com/docs/domains/troubleshooting)

## 8. Post-domain validation

Repeat the preview checks on the production domain, then specifically verify:

- `https://viesta.co.ke` loads over HTTPS without certificate warnings.
- `www.viesta.co.ke` redirects to the chosen canonical hostname, or the reverse if `www` is canonical.
- Page metadata and shared links use the intended production domain.
- Product and blog detail pages work when opened directly in a new browser session.
- Refreshing a nested route does not return a platform 404.
- WhatsApp links still target the confirmed Viesta number.
- No browser mixed-content warnings appear.
- Email service remains operational after DNS changes.

Test from at least one mobile network as well as a regular Wi-Fi connection. This helps reveal DNS caching and mobile WhatsApp handoff issues.

## 9. Environment variables

No environment variables are currently required. Do not create placeholder secrets in Vercel.

If the application later adds analytics, an API, a CMS, or another external service:

- Document every required variable and which environments need it.
- Keep secrets out of Git and local committed files.
- Use `NEXT_PUBLIC_` only for values that are safe to expose to browser JavaScript.
- Set separate values for Development, Preview, and Production where appropriate.
- Redeploy after changing build-time environment variables.

## 10. Logs and troubleshooting

For a failed or unhealthy deployment:

1. Open **Project → Deployments**.
2. Select the affected deployment.
3. Inspect the build logs for installation, TypeScript, static generation, or missing-file errors.
4. Inspect runtime logs if the build succeeded but a deployed route fails.
5. Confirm the deployed commit and branch are the intended revision.
6. Confirm the Root Directory, Framework Preset, Node.js version, and build settings match this guide.
7. Fix the underlying problem in the repository, verify it locally, and push a new commit.

Avoid repeatedly redeploying the same unchanged commit when the error is caused by source code or configuration. A redeploy is useful when settings or environment variables changed, or when a transient platform failure is suspected.

## 11. Redeploy, promote, and rollback

From **Project → Deployments**, Vercel allows eligible deployments to be inspected, redeployed, promoted, or rolled back.

- **Redeploy** rebuilds a selected revision. Use it after a relevant Vercel setting changes or for a suspected transient build failure.
- **Promote to Production** makes an eligible deployment serve production traffic.
- **Instant Rollback** restores a previously served production deployment without rebuilding it.

For an incident after release:

1. Identify the last known-good production deployment.
2. Use **Instant Rollback** from the deployment menu.
3. Confirm the production domain serves the restored deployment.
4. Investigate and fix the issue on a separate branch.
5. Validate the fix through a preview deployment before returning it to production.

A rollback restores an older build. It does not rebuild that revision with newly changed environment variables. Vercel plan limits can also affect how far back a project may roll back.

See [managing deployments](https://vercel.com/docs/deployments/managing-deployments) and [instant rollback](https://vercel.com/docs/instant-rollback).

## 12. Local verification before production deployment

Automated verification was not run while preparing this guide. Run the following commands from:

```text
/home/camline/Documents/Projects/Viesta
```

### Targeted application tests

```bash
npm test
```

Verifies cart, pricing, currency, shipping, validation, WhatsApp, product data, and tested UI behavior.

### Type checking

```bash
npm run type-check
```

Checks TypeScript correctness without creating build output.

### Linting

```bash
npm run lint
```

Checks the source against the configured ESLint and Next.js rules. Next.js 16 does not automatically run linting as part of `next build`.

### Formatting check

```bash
npm run format:check
```

Checks repository formatting without rewriting files.

### Production build

```bash
npm run build
```

Creates the production Next.js build and is the closest local check to Vercel's build step. It may require network access on a clean machine to download dependencies or fetch build-time assets such as Google Fonts.

Run the commands in the order shown so faster failures are found before the production build. The deployment should not be considered fully verified until these checks succeed and the deployed smoke tests are complete.

## 13. Release checklist

Use this final checklist before announcing the website:

- [ ] Product facts and claims are approved.
- [ ] Legal policies are final.
- [ ] Payment instructions are confirmed.
- [ ] Contact information is confirmed and placeholder wording is removed.
- [ ] Testimonials are approved or removed.
- [ ] Local tests, type checking, linting, formatting check, and production build pass.
- [ ] The Vercel preview smoke test passes.
- [ ] The production branch is `main`.
- [ ] `viesta.co.ke` and `www.viesta.co.ke` are configured correctly.
- [ ] HTTPS is active.
- [ ] Existing email DNS records remain intact.
- [ ] The production-domain smoke test passes.
- [ ] WhatsApp checkout is verified on a real mobile device.
- [ ] A known-good deployment is available for rollback.

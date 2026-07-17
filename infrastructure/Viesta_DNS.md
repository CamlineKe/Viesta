# Viesta DNS and Domain Operations

This guide documents how `viestanutrition.com` connects cPanel-managed DNS to the Viesta website deployed on Vercel. Use it when reviewing the current setup, changing DNS records, adding email or verification records, troubleshooting propagation, or handing domain operations to another maintainer.

## 1. Service responsibilities

The domain setup has separate services with different responsibilities:

| Service | Responsibility |
|---|---|
| Domain registrar | Owns the domain registration and controls which nameservers are authoritative. |
| cPanel DNS | Hosts the authoritative DNS zone through the configured Cloudon nameservers. |
| Vercel | Hosts the Next.js website, connects the custom domain, provisions HTTPS, and redirects the secondary hostname. |
| cPanel hosting | Previously hosted WordPress and may still provide cPanel access or email services. It does not host the current website. |

The former WordPress installation has been removed. Removing WordPress does not move DNS or cancel the cPanel account.

## 2. Current production configuration

The following snapshot was confirmed on July 17, 2026.

### Authoritative nameservers

```text
ns1.cloudon.com
ns2.cloudon.net
ns3.cloudon.org
```

These nameservers mean the active DNS records are managed in the cPanel Zone Editor. Records created in another provider will have no effect unless the registrar's nameserver delegation is changed.

### Website records

| Name | TTL | Type | Value |
|---|---:|---|---|
| `viestanutrition.com` | `14400` | `A` | `216.198.79.1` |
| `www.viestanutrition.com` | `14400` | `CNAME` | `d8d8a586c5bb7fe8.vercel-dns-017.com` |

The TTL of `14400` seconds is four hours. A resolver can continue serving a cached value for that period after a change.

This table is an operational snapshot, not a permanent source of truth. Before recreating or changing either record, open **Vercel → Project → Settings → Domains** and use the exact values Vercel currently displays for this project.

### Application canonical URL

The application defines its canonical production origin in `src/data/site.ts`:

```text
https://viestanutrition.com
```

Next.js uses this origin for absolute metadata and structured-data URLs. If the primary production hostname changes, update the DNS and Vercel configuration together with this application value and its tests.

## 3. Connect the domain to Vercel

1. Deploy and validate the project using its generated `*.vercel.app` URL.
2. In Vercel, open the project and go to **Settings → Domains**.
3. Add `viestanutrition.com`.
4. Add `www.viestanutrition.com` if Vercel does not add it automatically.
5. Set `viestanutrition.com` as the primary production hostname.
6. Configure `www.viestanutrition.com` to redirect to the primary hostname.
7. Copy the exact apex `A` and `www` CNAME values displayed by Vercel.
8. Add or update those values in the cPanel Zone Editor.
9. Wait until both Vercel domain entries report **Valid Configuration**.
10. Confirm HTTPS works for both hostnames and that `www` redirects as intended.

Do not copy DNS targets from an unrelated project or an old guide. Vercel can assign project-specific targets.

## 4. Manage website records in cPanel

1. Sign in through the hosting provider's customer portal or the cPanel server hostname.
2. Open **Domains → Zone Editor**.
3. Locate `viestanutrition.com` and click **Manage**.
4. Compare the existing record names, types, and values with Vercel's Domains screen.
5. Edit only the records that need to change.
6. Click **Save All Records**.
7. Record the change using the template in this guide.

For the website, the zone should have one apex `A` record and one `www` CNAME record. Avoid these conflicts:

- Multiple apex `A` records unless Vercel explicitly requires them.
- An obsolete apex `AAAA` record pointing to another server.
- An `A` or `AAAA` record for `www` alongside its CNAME.
- More than one CNAME for `www`.
- A wildcard record that unexpectedly sends subdomains to the former hosting server.

Do not use **Reset DNS Zone** during routine maintenance. Resetting can restore hosting-provider defaults and overwrite working website, email, and verification records.

## 5. Preserve non-website records

Website records are only part of a DNS zone. Before deleting or replacing records, export or screenshot the complete zone and identify the service that owns each record.

Common non-website records include:

| Record | Typical purpose |
|---|---|
| `MX` | Routes incoming email. |
| SPF `TXT` | Lists systems permitted to send domain email. |
| DKIM `TXT` | Publishes email-signing keys. |
| DMARC `TXT` | Defines handling and reporting for failed email authentication. |
| Verification `TXT` | Proves domain ownership to Vercel, Google, Microsoft, or another service. |
| `CAA` | Restricts which certificate authorities may issue certificates. |
| `SRV` | Publishes service endpoints used by some communication platforms. |

Deleting MX or email-authentication records can interrupt delivery or cause mail to be rejected as spam. Obtain exact replacement values from the email provider. Do not reconstruct them from memory.

Viesta currently uses a Gmail address in the application. If domain-based addresses such as `info@viestanutrition.com` are introduced later, document the email provider and add its required MX, SPF, DKIM, and DMARC records without changing the Vercel website records.

## 6. Add a future DNS record safely

Use this procedure for an email, analytics, search-console, social, or service-verification record:

1. Identify the requesting service and the exact hostname, type, value, and TTL it requires.
2. Confirm that the requested hostname does not conflict with the apex `A` or `www` CNAME.
3. Capture the current zone before editing.
4. Add the record in **cPanel → Zone Editor → Manage**.
5. Save the zone.
6. Wait for the requesting service to verify the record.
7. Test the website and any affected email service.
8. Record the change, owner, and rollback action.

Do not change nameservers merely to add one record. A nameserver migration moves responsibility for the entire zone and requires every active record to be recreated at the new DNS provider before delegation changes.

## 7. Propagation and caching

DNS changes are not visible everywhere immediately. Recursive resolvers, mobile networks, routers, operating systems, and browsers can retain an earlier answer until its TTL expires.

After a change:

1. Wait at least the previous record's TTL before diagnosing propagation as a failure.
2. Check both `https://viestanutrition.com` and `https://www.viestanutrition.com`.
3. Test in a private browser window.
4. Compare Wi-Fi with mobile data because they usually use different DNS resolvers.
5. Confirm both entries in Vercel show **Valid Configuration**.
6. Allow up to 24 hours for ordinary record changes and up to 48 hours for nameserver changes before escalating, unless the authoritative records are clearly wrong.

Lowering a TTL after a change does not shorten the lifetime of values that resolvers already cached. For a planned migration, lower the TTL before the migration and wait for the old TTL to expire.

## 8. Troubleshooting

### Some devices show the old website

Likely causes are cached DNS, cached browser content, or different answers for the apex and `www` hostnames.

1. Confirm both website records match Vercel.
2. Confirm both hostnames are assigned to the same Vercel project.
3. Test a private window on mobile data.
4. Wait for the previous TTL to expire.
5. Check for obsolete `A`, `AAAA`, CNAME, or wildcard records.

### Vercel reports Invalid Configuration

1. Compare Vercel's required record with cPanel character for character.
2. Confirm cPanel is still authoritative by checking the nameservers at the registrar.
3. Remove only records Vercel identifies as conflicting after confirming they are obsolete.
4. Check whether Vercel requires a TXT ownership-verification record.
5. Save the zone and wait for the active TTL.

### The website works but email fails

Check whether MX, SPF, DKIM, or DMARC records were deleted or changed. Restore the exact values from the email provider and verify mail in both directions.

### cPanel no longer opens through the domain

`https://viestanutrition.com:2083` is not a stable cPanel access method after the domain points to Vercel. Use the hosting provider's customer portal, server hostname, or server IP supplied by the hosting provider.

A URL containing `/cpsess.../` is a temporary authenticated cPanel session. Do not share or bookmark it. Log out and sign in again if a session URL is exposed.

## 9. Rollback

If a DNS change breaks the website:

1. Compare the zone with the pre-change snapshot.
2. Restore the previous known-good value only for the affected record.
3. Save the zone.
4. Keep the failed value and reason in the change record.
5. Wait for the relevant TTL and verify both hostnames again.

If the issue is caused by a bad application deployment rather than DNS, use Vercel's deployment rollback. Do not change DNS to compensate for an application release failure.

## 10. Change record template

Copy this block for each production DNS change:

```text
Date and time:
Changed by:
Reason:
Provider: cPanel Zone Editor
Hostname:
Record type:
Previous value:
New value:
TTL:
Vercel status:
Website verification:
Email verification, if relevant:
Rollback value:
```

Never include passwords, API tokens, private keys, or cPanel session URLs in the change record.

## 11. Operational checklist

Before a change:

- [ ] Confirm the registrar and authoritative nameservers.
- [ ] Capture the complete current DNS zone.
- [ ] Copy exact required values from the service requesting the change.
- [ ] Identify website, email, and verification dependencies.
- [ ] Plan the rollback value.

After a change:

- [ ] Save the cPanel zone.
- [ ] Confirm both Vercel domains show **Valid Configuration**.
- [ ] Test apex and `www` over HTTPS.
- [ ] Confirm the canonical redirect.
- [ ] Test on Wi-Fi and mobile data after propagation.
- [ ] Verify email if any email-related record changed.
- [ ] Record the final values and rollback information.

## 12. Official references

- [Set up a custom domain on Vercel](https://vercel.com/docs/domains/set-up-custom-domain)
- [Add and configure a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Troubleshoot Vercel domains](https://vercel.com/docs/domains/troubleshooting)
- [Manage DNS records on Vercel](https://vercel.com/docs/domains/managing-dns-records)
- [cPanel Zone Editor](https://docs.cpanel.net/cpanel/domains/zone-editor/)
- [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)

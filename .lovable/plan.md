

# Create `vercel.json` Security Headers and SPA Routing

## What This Does

Create a single file (`vercel.json`) in the project root with the exact configuration you provided. This adds:

- **SPA routing**: All routes rewrite to `/index.html` so React Router handles navigation
- **Security headers**: X-Content-Type-Options, X-Frame-Options, XSS Protection, Referrer-Policy, Permissions-Policy, Content-Security-Policy, and HSTS

These headers only take effect when deployed to Vercel and will not affect the Lovable preview.

## Technical Details

| File | Action |
|------|--------|
| `vercel.json` | Create new file with the exact JSON content provided |

No other files are modified. No dependencies added.


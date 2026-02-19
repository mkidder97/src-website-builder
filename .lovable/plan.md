

# Secure Contact Form with Cloudflare Turnstile, Honeypot, and Edge Function

## Overview

Route all contact form submissions through a server-side backend function instead of inserting directly from the browser. Add three layers of bot protection: Cloudflare Turnstile CAPTCHA, a honeypot field, and submission timing checks.

---

## Part A: Install Package

Install `@marsidev/react-turnstile` for the Turnstile CAPTCHA widget.

---

## Part B: Update `src/pages/Contact.tsx`

1. Remove the direct database client import (`supabase`), since submissions will go through the backend function instead.
2. Add imports for `Turnstile` from `@marsidev/react-turnstile`.
3. Add new state:
   - `turnstileToken` (string or null) -- tracks the CAPTCHA token
   - `formLoadTime` (number) -- records when the form mounted, used for timing-based bot detection
4. Add `website: ""` to `formData` state (honeypot field).
5. Add a hidden honeypot input field using `position: absolute; left: -9999px` (not `display: none`, since some bots detect that) with `tabIndex={-1}` and `autoComplete="off"` so real users never interact with it, but bots auto-fill it.
6. Add the `<Turnstile>` widget just above the submit button, using site key `0x4AAAAAACfZm7d1sYEtl7e0`.
7. Disable submit button when no Turnstile token: `disabled={loading || !turnstileToken}`.
8. Replace the `supabase.from("contact_submissions").insert(...)` call with a `fetch()` to the backend function at `/functions/v1/submit-contact`, sending validated form data plus `turnstileToken`, `website` (honeypot), and `elapsed` time.
9. Reset the form state on "Send Another Message" to include the `website` field.

---

## Part C: Create Backend Function

Create `supabase/functions/submit-contact/index.ts` with the following logic:

1. **CORS handling** -- standard preflight response with required headers
2. **IP-based rate limiting** -- max 5 submissions per IP per 15-minute window (in-memory)
3. **Honeypot check** -- if `website` field has content, return fake success (200) to fool the bot
4. **Timing check** -- if form was filled in under 3 seconds, return fake success (200)
5. **Input validation** -- sanitize and validate name, email, phone, company, message with length limits and basic HTML tag stripping
6. **Turnstile verification** -- POST the token to Cloudflare's siteverify endpoint using the `TURNSTILE_SECRET_KEY` secret; reject on failure
7. **Database insert** -- use the service role client to insert into `contact_submissions`
8. Return success or appropriate error responses with CORS headers on every path

Update `supabase/config.toml` to add:
```text
[functions.submit-contact]
verify_jwt = false
```

---

## Part D: Add Turnstile Secret

Prompt you to enter the `TURNSTILE_SECRET_KEY` value using the secrets tool, so the backend function can verify Turnstile tokens server-side. This will happen before deploying the function.

---

## Files Modified

| File | Change |
|------|--------|
| `src/pages/Contact.tsx` | Remove direct DB insert; add Turnstile widget, honeypot field (absolute positioning), timing check; call backend function instead |
| `supabase/functions/submit-contact/index.ts` | New -- server-side validation, Turnstile verification, rate limiting, honeypot/timing checks, DB insert |
| `supabase/config.toml` | Add `[functions.submit-contact]` with `verify_jwt = false` |

## Secrets Required

| Secret | Purpose |
|--------|---------|
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile token verification (you will be prompted to paste this) |


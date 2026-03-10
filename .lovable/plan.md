
## Security Dependency Updates

### Current Situation

After reviewing `package.json` and the CVE details, here is the precise status:

| Package | Current spec | Resolves to | CVE | Patched in | Status |
|---|---|---|---|---|---|
| `react-router-dom` | `^6.30.1` | 6.30.1 | CVE-2025-68470 (Open Redirect) | 6.30.2 | **Vulnerable** |
| `vite` | `^5.4.19` | 5.4.19 | CVE-2025-46565 & CVE-2025-32395 | 5.4.19 | **Already patched** |

The `^` (caret) prefix means npm installs the highest compatible version within the major series. Because `react-router-dom` is currently pinned at `^6.30.1`, npm resolves it to exactly 6.30.1 — it will not automatically pick up 6.30.2, since the caret only allows minor/patch upgrades *above* the stated version once the lockfile is in place.

### What Needs to Change

**Only one file, one line:**

- **`package.json`** — bump `react-router-dom` from `^6.30.1` → `^6.30.2`

Vite is already at 5.4.19 (the patched version), so no change is needed there.

### Why This Is Safe

- This is a pure **patch-level bump** (6.30.1 → 6.30.2) within the same major series. React Router follows semver, and patch releases contain only bug/security fixes — no breaking API changes.
- No component code, routing logic, or configuration needs to be touched.
- The lockfile (`package-lock.json` / `bun.lockb`) will regenerate automatically after the version change, pulling the new patch.

### CVE Reference

**CVE-2025-68470** — An attacker-supplied path can be crafted so that when a React Router application navigates to it via `navigate()`, `<Link>`, or `redirect()`, the app performs a redirect to an external URL. Fixed in 6.30.2 and 7.9.6.

---

### Technical Implementation

**File:** `package.json`
**Line 63** — change:
```
"react-router-dom": "^6.30.1",
```
to:
```
"react-router-dom": "^6.30.2",
```

That is the only change. No code files, no logic, no functionality is altered.

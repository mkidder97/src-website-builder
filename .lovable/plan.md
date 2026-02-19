

# Fix: Restore the `.env` File

## Problem
The `.env` file was deleted in a recent change and the previous attempts to restore it did not persist. The Supabase client in `src/integrations/supabase/client.ts` reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from environment variables. Without the `.env` file, these are `undefined`, causing the app to crash on load with "supabaseUrl is required."

## Solution
Recreate the `.env` file in the project root with the correct values:

```
VITE_SUPABASE_PROJECT_ID="mumphlldikfibcnunhia"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bXBobGxkaWtmaWJjbnVuaGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODgxODIsImV4cCI6MjA4NDc2NDE4Mn0.nWRzlQF1fVV6N5F_o4qdBaaSISdmD_wI8h4ogW30HYE"
VITE_SUPABASE_URL="https://mumphlldikfibcnunhia.supabase.co"
```

## Files Changed

| File | Action |
|------|--------|
| `.env` | Create (restore) |

No other files are modified. This is the same `.env` content that existed before it was deleted.

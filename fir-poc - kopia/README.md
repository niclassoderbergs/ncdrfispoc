# FIR POC module

All canonical POC code lives in this folder.

## Entry points

- `fir-poc/index.ts` module exports for POC
- `fir-poc/pages/FirGuiPocPage.tsx` main POC page

## Structure

- `pages/` UI pages and POC flow
- `data/` mock/static data used by pages
- `components/` shared POC components
- `styles.ts` POC styling
- `types.ts` POC domain types

## Compatibility files

These files are kept as thin re-exports so existing imports keep working:

- `/FirGuiPocPage.tsx`
- `fir-poc/FirGuiPocPage.tsx`

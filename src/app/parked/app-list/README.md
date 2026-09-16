# Parked: AppList screen

An app launcher listing EG modules (Access Manager, Crossdock, EDI Module,
Replicator, …). Ported from the standalone "POS Logon" Figma Make prototype, which
served it at `/apps`.

**Not routed.** Kept here so it stays in git history and can be brought back if the
launcher turns out to belong in the POS journey.

To activate, add to the `login` branch in `src/app/routes.tsx`:

```tsx
{ path: 'apps', element: <AppListPage /> },
```

Note `AppListPage` navigates to two-factor with `state: { from: "/apps" }`, so that
back-target only resolves once the route above exists.

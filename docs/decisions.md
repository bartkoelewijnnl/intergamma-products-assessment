# Decisions

Short records of the choices that shape this project: context, decision and the alternatives considered. The prompts behind them are in [prompts.md](prompts.md).

### Verlanglijst: Zustand met persist

- **Context:** Producten toevoegen en verwijderen, aantallen aanpassen, en de lijst moet bewaard blijven tussen browsersessies.
- **Besluit:** Een Zustand-store met de `persist`-middleware in `src/stores/wishlist.ts`, opgeslagen in `localStorage` onder `wishlist`. Met `skipHydration` laadt de store pas na hydration (via `persist.rehydrate()` in de header), zodat de eerste render in de browser gelijk is aan de server. Opgeslagen wordt alleen `productId` en `quantity`, prijs en naam komen uit de productdata.
- **Alternatieven:** Eigen store met `useSyncExternalStore` (geen dependency, maar meer eigen code rond laden en cachen); React Context met `useEffect` (Provider nodig, flits van een lege lijst bij laden); HeroUI `ToggleButton` voor het hartje (eigen styling naast het Button-thema, `Button` met `aria-pressed` doet hetzelfde).

### Toast bij toevoegen aan of verwijderen van de verlanglijst

- **Context:** Bij een klik op het hartje hoort een schermlezer via `aria-pressed` alleen dat de knop "ingedrukt" is. Dat de teller in de header verandert, wordt niet voorgelezen (WCAG 4.1.3, statusberichten).
- **Besluit:** Een HeroUI `Toast` met "Toegevoegd aan verlanglijst" of "Verwijderd van verlanglijst" en de productnaam als beschrijving. `Toast.Provider` staat in de layout, zodat meldingen op elke pagina werken. De toast staat in een meldingsgebied dat schermlezers voorlezen en verdwijnt na 4 seconden. Ziende gebruikers krijgen zo ook bevestiging, vooral als de teller buiten beeld is.
- **Alternatieven:** Een eigen verborgen `aria-live`-gebied (alleen voor schermlezers, ziende gebruikers missen de bevestiging); de teller in de header een `aria-live` geven (leest alleen een getal voor, zonder productnaam).

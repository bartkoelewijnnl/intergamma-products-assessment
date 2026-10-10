# Decisions

Short records of the choices that shape this project: context, decision and the alternatives considered. The prompts behind them are in [prompts.md](prompts.md).

### Wishlist: Zustand with persist

- **Context:** Products can be added and removed, quantities changed, and the list must persist between browser sessions.
- **Decision:** A Zustand store with the `persist` middleware in `src/stores/wishlist.ts`, saved in `localStorage` under `wishlist`. With `skipHydration` the store only loads after hydration (through `persist.rehydrate()` in the header), so the first client render matches the server. Only `productId` and `quantity` are stored, price and name come from the product data.
- **Alternatives:** A custom store with `useSyncExternalStore` (no dependency, but more own code for loading and caching); React Context with `useEffect` (needs a Provider, flash of an empty list on load); HeroUI `ToggleButton` for the heart (separate styling next to the Button theme, while `Button` with `aria-pressed` does the same).

### Toast when adding to or removing from the wishlist

- **Context:** When the heart is pressed, a screen reader only hears through `aria-pressed` that the button is "pressed". The changed count in the header is not announced (WCAG 4.1.3, status messages).
- **Decision:** A HeroUI `Toast` with "Toegevoegd aan verlanglijst" or "Verwijderd van verlanglijst" and the product name as description. `Toast.Provider` sits in the layout, so notifications work on every page. The toast is in a region that screen readers announce, and it disappears after 4 seconds. Sighted users get confirmation too, especially when the counter is out of view.
- **Alternatives:** A custom hidden `aria-live` region (screen readers only, sighted users miss the confirmation); giving the counter in the header `aria-live` (only reads out a number, without the product name).

### Badge counts products, not quantities

- **Context:** The favorites button shows a badge with the number of items on the wishlist. With 3 drills and 1 tin of paint, that could be 2 (products) or 4 (pieces).
- **Decision:** The badge counts products, so it shows 2. A wishlist is a list of things you want to remember: adding a product changes the badge, raising a quantity does not. The quantity matters for the total, which the drawer shows. The button label and the drawer header use the same count ("2 producten").
- **Alternatives:** Summing quantities, like a shopping cart (the badge would then change when editing a quantity, which reads as adding a new product).

### Only the default font is preloaded

- **Context:** Lighthouse on mobile measured an LCP of 3.6 s. The LCP element is the hero heading, and almost all of that time was render delay: three preloaded font files (127 KB) competed with the CSS for bandwidth. The Overpass italic file was never used, and Inter is only used by the Karwei theme.
- **Decision:** Load Overpass as a single normal-style file and set `preload: false` on Inter. Only the font for the default Gamma theme is preloaded. When someone switches to Karwei, Inter loads then, and the fallback font with matching metrics from `next/font` prevents a layout shift. Mobile LCP went from 3.6 s to 3.0 s (simulated), the performance score from 90 to 95.
- **Alternatives:** Keeping all fonts preloaded (88 KB extra on the critical path for nothing in the Gamma theme); preloading Inter only for the Karwei theme (the theme is only known in the browser after next-themes runs, too late for a preload in the HTML).

### Category tabs without a URL

- **Context:** The design has category filters: all products, each category and products on sale.
- **Decision:** HeroUI Tabs in a `ProductTabs` component. Every panel is rendered on the server at build time, the tabs only switch which one is visible. The page stays static and switching is instant. The selected category is not in the URL.
- **Alternatives:** `?categorie=verf` with `searchParams` (renders on every request, every click is a server round trip, and links are navigation rather than tabs); static routes per category with `generateStaticParams` (shareable URLs and no JavaScript needed, but a `<nav>` with separate pages instead of tabs; the better choice for a real shop with many products).

### HeroUI for interactive components

- **Context:** The drawer, tabs, number field, switch and toast need keyboard support, focus management and the right ARIA roles.
- **Decision:** HeroUI v3, built on React Aria. Focus trapping, Escape, arrow keys and screen reader announcements come from a well-tested base. Brand styling is done through theme tokens and classes, not by rebuilding components.
- **Alternatives:** Building these components ourselves (a lot of accessibility work that is easy to get wrong); shadcn/ui on Radix (comparable, but copies component code into the repo instead of a dependency with themes).

### Server Components by default

- **Context:** What runs on the server and what in the browser should be a conscious choice.
- **Decision:** Everything is a Server Component unless it needs browser state. That leaves three Client Components: the heart button, the wishlist drawer and the theme switch. The page is prerendered as static HTML, and a card only ships JavaScript for its heart. Product data stays on the server and goes to the drawer as a prop, so swapping the JSON for an API only touches server code.
- **Alternatives:** A client-side card or grid (simpler, but ships everything for one button); importing the JSON in the drawer (ties client code to the data source).

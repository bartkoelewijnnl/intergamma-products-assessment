# Intergamma products assessment

A product listing page with a wishlist side panel, built for the Intergamma front-end assessment. It has a Gamma and a Karwei theme that you switch in the header.

## Features

- Product listing with fake products from [`src/data/products.json`](src/data/products.json)
- Category tabs: all products, each category and products on sale
- Product photos with `next/image`, a category icon for products without one
- Wishlist: add and remove products with the heart on each card, change quantities in the side panel
- The wishlist persists between browser sessions (`localStorage`)
- Header with logo and a favorites button whose badge shows the number of products on the wishlist
- Side panel (drawer) that overlays the page, with totals per item and overall
- Gamma and Karwei themes: colors, font, corners and logo follow gamma.nl and karwei.nl

## Getting started

Requires Node.js 20 or later and Yarn 1.

```bash
yarn install
```

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command       | What it does         |
| ------------- | -------------------- |
| `yarn dev`    | Start the dev server |
| `yarn build`  | Production build     |
| `yarn start`  | Serve the build      |
| `yarn lint`   | ESLint               |
| `yarn format` | Format with Prettier |

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, [HeroUI v3](https://heroui.com) (built on React Aria), Zustand for the wishlist and next-themes for the theme switch.

## Project structure

```
src/
  app/
    layout.tsx          Fonts, theme provider, header, toast region
    page.tsx            Product listing page: hero, category tabs and product panels
    globals.css         Tailwind, HeroUI, theme variants and utilities
    themes/
      shared.css        HeroUI styling used by every theme
      gamma.css         Gamma tokens
      karwei.css        Karwei tokens and differences
  components/
    layout/             Container, header, hero, logo, theme switch
    products/           Category tabs, product grid and card (image, price, stock)
    wishlist/           Heart button, drawer, drawer item
  data/                 Product JSON, types and category labels
  lib/                  Price formatting
  stores/               Wishlist store (Zustand)
public/
  images/               Hero and product photos
docs/
  decisions.md          Decisions with context and alternatives
  prompts.md            Prompts used with Claude Code
```

## Server and client components

Everything renders on the server unless it needs browser state or interaction. The page is prerendered as static HTML.

| Component                                           | Runs on | Why                                                                 |
| --------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| `layout`, `page`, `Header`, `Hero`, `Logo`          | Server  | Static content, no interaction                                      |
| `ProductTabs`                                       | Server  | Renders every panel on the server, HeroUI `Tabs` only switch them   |
| `Products`, `ProductCard`, `CardImage`, `CardPrice` | Server  | Product data is known at build time                                 |
| `WishlistButton`                                    | Client  | Reads and toggles the wishlist, the only interactive part of a card |
| `WishlistDrawer`, `DrawerItem`                      | Client  | Drawer state, quantities and the stored wishlist                    |
| `ThemeSwitch`                                       | Client  | Reads and sets the stored theme                                     |

- Product data is only read in Server Components. `Header` passes it to the drawer as a prop, so swapping the JSON for an API only changes server code.
- The category tabs filter on the server: each panel is rendered at build time, the browser only switches which one is visible. The selected category is not in the URL, so the page stays static.
- Photos use `next/image` with a `sizes` per grid breakpoint, so the browser picks the right width and gets WebP. The hero photo is preloaded because it is the largest element above the fold on desktop.
- The wishlist loads from `localStorage` after hydration (`skipHydration`), so the first client render matches the server HTML.
- next-themes sets `data-theme` with a script before the first paint. Both logos are in the HTML and CSS shows the active one, so switching themes causes no flash or layout shift.

## Accessibility

- Semantic HTML: `header`, `main`, `section`, a heading order of `h1`, `h2`, `h3`, lists for products and wishlist items, `del` for the old price
- Keyboard: every control is reachable with Tab and has a visible focus ring; the drawer traps focus and closes with Escape; the category tabs switch with the arrow keys (HeroUI / React Aria)
- ARIA where HTML falls short: labels on icon buttons, `aria-pressed` on the heart, `tablist` and `tabpanel` roles on the category tabs, a toast that announces "Toegevoegd aan verlanglijst" to screen readers
- Product and hero photos have an empty `alt`: the product name is right next to the photo, and the hero photo is decorative
- Products show in one column below 360px, which also covers 400% zoom
- Prices on sale read as "Nu € 99,00, Was € 149,00"
- Theme animations respect `prefers-reduced-motion`
- Text contrast meets WCAG AA, the Gamma promo orange is darkened for that

## Performance

Lighthouse on the production build (`yarn build && yarn start`):

| Device  | Performance | Accessibility | LCP   | CLS |
| ------- | ----------- | ------------- | ----- | --- |
| Mobile  | 94 to 95    | 100           | 3.0 s | 0   |
| Desktop | 100         | 100           | 0.6 s | 0   |

The mobile LCP is Lighthouse's simulated throttling. Measured with real throttling in Chrome, the LCP (the hero heading) is 1.9 s, the same moment as the first paint.

## Documentation

The reasoning behind the main choices is in [`docs/decisions.md`](docs/decisions.md), and the prompts used to build this with Claude Code are in [`docs/prompts.md`](docs/prompts.md).

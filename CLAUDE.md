@AGENTS.md

# Intergamma products assessment

Product listing page with a wishlist side panel, with a Gamma and a Karwei theme.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, HeroUI v3, yarn.

## Commands

- `yarn dev`: start the dev server
- `yarn lint`: ESLint
- `yarn format`: Prettier
- `yarn build`: production build

## Conventions

- Components are arrow functions (`const X = () => {}`), enforced by ESLint.
- Use HeroUI components before building your own.
- Theme styling goes in `src/app/themes/`, not in the components: `shared.css` for HeroUI styling used by every theme, `gamma.css` and `karwei.css` for each brand's tokens and differences.
- Accessibility: semantic HTML, keyboard support and WCAG AA contrast.

## Documentation

Log prompts in `docs/prompts.md` and decisions in `docs/decisions.md`. The design is `docs/design.pdf`.

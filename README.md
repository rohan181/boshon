# Boshon

Next.js storefront homepage with a scroll-driven hero, category films, selected products, and storefront search.

## Local development

Run `npm ci` then `npm run dev`. Open http://localhost:3000.

## Deploy to Netlify

1. Import the GitHub repository in Netlify.
2. Select the `main` branch. Build settings are included in `netlify.toml`.
3. Deploy. Netlify automatically handles the Next.js runtime and image optimization.

No environment variables are needed for the current homepage. Product search and shopping links lead to boshon.shop. Featured prices are maintained in `app/selected-products.tsx`. Social profiles are demo placeholders awaiting real URLs.

Videos and images are served from `public/`. Product, category, navigation, and footer components live in `app/`.

# MDNGHT Scents website

A static, mobile-friendly fragrance storefront built with Vite. No Framer subscription required.

## Preview locally

```bash
npm install
npm run dev
```

## Required edits before publishing

1. In `main.js`, set `FACEBOOK_PAGE_USERNAME` to your actual public Facebook Page username (the portion after `facebook.com/` or `m.me/`).
2. Replace each `price:null` with your actual PHP selling price, e.g. `price:529`. Prices are deliberately **not invented**.
3. Replace the CSS-generated bottle illustrations with real product photography when ready. They are visual placeholders, not actual product photos.
4. Test the Messenger order flow. The checkout copies the order summary and opens Messenger; the customer must paste/send it. Messenger deep-link prefilled messages are not guaranteed.
5. Check all fragrance descriptions and stock/size details before launch.

## Publish for free using Cloudflare Pages

1. Create a GitHub repository and upload these files (unzip first).
2. Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git.
3. Select the repository. Build command: `npm run build`. Output directory: `dist`.
4. Deploy and test the `pages.dev` URL.
5. Cloudflare Pages > your project > Custom domains > Add domain. Follow the DNS instructions shown for your Namecheap domain. DNS settings depend on whether you use the apex domain or `www`; do not delete email MX records.

Free tiers and product features can change; verify current Cloudflare account terms before launch.

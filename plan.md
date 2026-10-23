# BundlePlug recreation plan

## Scope
Recreate the inspected BundlePlug storefront with the same visual hierarchy, copy, routes, and interaction flow: homepage, products route, network filters, sorting, search, inline purchase forms, order tracking section, footer support links, and floating WhatsApp action.

## Implementation
Use a dependency-light static web app served by a small Node HTTP server. `index.html`, `styles.css`, and `app.js` provide the UI and client-side routing. The homepage uses hash anchors (`#hero`, `#buy-data`, `#track`, `#about`) and `/products?network=...` renders the product listing. Purchase forms are front-end only and show validation feedback without charging or submitting an order.

## Design
- **Design movement:** contemporary Ghanaian fintech storefront with utility-first editorial polish.
- **Core principles:** fast scanning, high-contrast hierarchy, trust through delivery/security cues, and clear one-action-at-a-time purchase flow.
- **Color philosophy:** deep navy/teal grounds the service and hero; bright cyan and mint-green accents signal connectivity and action; warm blush cards separate products.
- **Layout paradigm:** wide asymmetric hero with image right and copy left, then stacked content bands and responsive product cards.
- **Signature elements:** cyan pill labels, rounded teal CTA buttons, blush product cards, and status/delivery microcopy.
- **Interaction philosophy:** reveal purchase fields only after Buy Now, keep filters and sort directly beside the list, and use anchored sections to minimize navigation friction.
- **Animation:** subtle hover lift and color transitions only; no distracting motion.
- **Typography system:** Poppins for headings and Inter for body copy, matching the reference site.
- **Brand essence:** quick, affordable Ghanaian data access for everyday connectivity; fast, reassuring, practical.
- **Brand voice:** direct and confidence-building, e.g. “Get Connected In Seconds” and “No waiting. No hassle.”
- **Wordmark & logo:** circular lightning mark paired with a bold BundlePlug wordmark.
- **Signature brand color:** electric cyan `#10bfd2`.

## Structure
- `index.html`: app shell and metadata.
- `styles.css`: responsive visual system and page layouts.
- `app.js`: route rendering, filters, sorting, search, anchors, and purchase interactions.
- `server.js`: static HTTP server for Preview.
- `public/manus-routes.json`: declared page routes.

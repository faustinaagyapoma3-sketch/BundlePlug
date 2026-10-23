# BundlePlug static website

This is a GitHub-ready recovery of the BundlePlug data-bundle storefront. It uses plain HTML, CSS, and JavaScript, so GitHub Pages can serve it without a build step.

## GitHub Pages

Upload the repository contents, including `index.html`, `styles.css`, `app.js`, and the `products/` folder. In the repository, open **Settings → Pages**, choose **Deploy from a branch**, select the main branch and the root folder, then save. The homepage will be served from the Pages URL, and the bundle listing will be available at `/products/`.

The purchase forms are front-end test interactions only. They validate the entered Ghana phone number and show the next-step message, but they do not charge a customer or send an order to a backend. The Track Order section likewise shows test feedback until a real order API is connected.

## Local test

If Node.js is available, run `npm start` and open `http://localhost:3000/`. The optional server exists only for local testing; GitHub Pages does not need it.

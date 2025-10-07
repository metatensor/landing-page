metatensor.org
==============

This repository contains the landing pages for the metatensor organization. The
design is minimalistic - there are just a few static HTML pages that use
bootstrap for styling. Use `index.html` as a template for styling.

To build locally, you need to run

```bash
npm install
npm run build
```

the website will be generated in `dist/`. Pages will be automatically deployed
on commit based on the `.github/workflows/pages.yml` action.

Please put all static content in `static/`, e.g. images in `static/img`, and
reference them from the html source.

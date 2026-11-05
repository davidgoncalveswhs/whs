# WHS WebView

The website companion to the WHS iPhone app for Watertown High School, served with GitHub Pages
at https://davidgoncalveswhs.github.io/whs/.

## What's here

- `docs/` is the whole website. GitHub Pages serves this folder as-is.
  - `index.html` is the page, `app.js` and `js/*.js` are the app code (they load in order and share one
    global scope), `sw.js` is the offline helper, and `privacy.html` is the student privacy policy.
  - `ck-public.js` is filled in with the CloudKit web token during deploy. Never commit a token.
- `tests/web/` holds the website checks. They run in headless Chromium with CloudKit stubbed.
- `.github/workflows/pages.yml` runs the checks on every push and pull request, and deploys only
  when they pass.

## Running the checks locally

Needs Node 20 and Python 3.

```sh
npm install --no-save playwright@1.48.2
npx playwright install chromium
node tests/web/run.mjs
```

## Security notes

- Student data lives in CloudKit. Access is controlled by the CloudKit security roles, not by this
  code; the web token in `ck-public.js` is meant to be public.
- The page's Content-Security-Policy blocks inline scripts, so keep all code in `.js` files.
- Escape every value with `escapeHtml` before putting it into HTML.

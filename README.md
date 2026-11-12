# Tatva Webs — website starter

A multi-page, static website designed for GitHub Pages. No build tools or paid AI credits are required.

## Pages
- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `work.html` — Portfolio / concept projects
- `pricing.html` — Editable package descriptions
- `process.html` — Working process
- `faq.html` — FAQs
- `contact.html` — Contact form (mailto fallback)

## Before publishing
1. Open `script.js`.
2. Replace `TATVA_CONFIG.email` with your real business email.
3. Add your WhatsApp number with country code and digits only, e.g. `919876543210`.
4. Add your Instagram and LinkedIn URLs if desired.
5. Replace concept portfolio content with genuine work when available.
6. Review all text and package descriptions.

The contact form uses a `mailto:` link. It does not store submissions or send them to a server. For a hosted form inbox, connect a form service before launch.

## Test locally
Open `index.html` in a browser. For best local testing, use VS Code Live Server.

## Publish with GitHub Pages
1. Create a GitHub repository, for example `tatva-webs`.
2. Upload the contents of this folder (not the outer ZIP).
3. In the repository, open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Choose `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site. Your URL will appear in the Pages settings.

For a custom domain, configure it in GitHub Pages and update DNS with your domain provider.

## Design notes
- The original supplied Tatva Webs logo is in `assets/tatva-webs-logo.png`.
- The website uses Google Fonts via CSS import. If Google Fonts are unavailable, it falls back to system sans-serif fonts.
- Animations respect `prefers-reduced-motion`.
- All pages share `styles.css` and `script.js`.

## Reference-inspired update
The site now includes a larger orange ring cursor with a glowing centre dot, cursor-following ambient spotlight, brighter glass edges, richer hover lighting, and a vertical numbered process timeline. The custom cursor and pointer spotlight automatically switch off on touch/mobile devices.

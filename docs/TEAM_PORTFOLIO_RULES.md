# WebNextOnline team portfolio requirements

Approved 26 November 2026.

## Team directory

Keep the original card design: portrait, name, role and one action.
Published portfolio: View Portfolio links to the dedicated page.
Otherwise: View Profile opens the existing member profile.
Do not add extra profile/portfolio action rows or social placeholder grids.
Keep the animated carousel free of buttons.

## Polaroid cards

Preserve the existing photographs, drag, shuffle, tidy, flip and original social row.
Add exactly one View Portfolio button on the back only for members with a published portfolio.
Do not add a View Profile button or disabled portfolio placeholders.
Do not add new social buttons or invented social links.

## Publishing the next portfolio

1. Create the member page using the existing portfolio layout and shared motion styles.
2. Use sourced logo files, not recreated text approximations. Keep the person's own details.
3. Verify portrait, contact details, mobile layout, anchors and animation preferences.
4. Add name, aliases and URL to assets/team-album/portfolio-registry.js.
   This registry supplies both directory and polaroid portfolio buttons.
5. Add the canonical page URL to sitemap.xml. Do not add hash routes, redirects or query profiles.
6. Bump the registry script version in index.html when changing its entries.
7. Publish to main; wait for the Pages workflow to succeed and check the live card and button.

## Performance and SEO

Preserve the current design and effects; avoid adding large libraries for small interactions.
Lazy-load below-the-fold images and cap canvas work; honor reduced motion.
Keep title, description, canonical, organization metadata and robots sitemap reference accurate.
Use versioned asset URLs to refresh changed scripts. Browser cache and the GitHub Pages CDN
cannot be globally purged by editing website files; do not claim a cache purge was performed.
Do not promise rankings or invent performance scores. Measure before claiming speed gains.

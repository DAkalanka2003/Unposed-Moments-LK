UNPOSED MOMENTS — Website Files (Plain HTML)
===============================================

This is now a plain HTML / CSS / JS site — no PHP, no server needed.

────────────────────────────────────────
HOW TO RUN IT
────────────────────────────────────────
Just double-click index.html — it opens straight in your browser.
That's it. To view the other pages, just click the nav links
(Weddings / Pre-Shoots / Events / Graduations) inside the site.

To put it online later, upload the whole folder's contents to any
web hosting (or GitHub Pages, Netlify, etc.) — plain HTML works
everywhere, no special server setup required.

────────────────────────────────────────
FOLDER STRUCTURE
────────────────────────────────────────
index.html            Home page
wedding.html           Wedding gallery page
pre-shoot.html         Pre-Shoot gallery page
events.html            Events gallery page
graduation.html        Graduation gallery page

assets/css/style.css   All styling
assets/js/main.js      All interactions/animations

assets/images/hero/         Homepage slider photos
assets/images/about/        About section photos
assets/images/wedding/      Wedding cover + album covers
assets/images/pre-shoot/    Pre-Shoot cover + album covers
assets/images/events/       Events cover + album covers
assets/images/graduation/   Graduation cover + album covers
assets/images/instagram/    "Follow the studio" strip photos
assets/images/branding/     Logo + favicon (from your uploaded logo)

────────────────────────────────────────
IMPORTANT — since there's no PHP anymore
────────────────────────────────────────
The site is now 5 separate HTML files instead of pages built from
shared templates. That means the header/navigation and footer are
repeated in each of the 5 files. If you want to change something in
the header or footer (e.g. phone number, nav links), you'll need to
update it in all 5 files:
    index.html, wedding.html, pre-shoot.html, events.html, graduation.html

(Ctrl+H / Find & Replace across files in any code editor like
VS Code makes this quick — search the old text, replace in all files.)

────────────────────────────────────────
REPLACING PLACEHOLDER PHOTOS
────────────────────────────────────────
All photos are currently placeholders that say "Replace Photo" so you
can see exactly where each image goes and roughly what size to use.

To swap a photo:
1. Add your real photo into the matching folder above, using the
   SAME filename (e.g. assets/images/wedding/album-1.jpg) — the site
   will pick it up automatically with no code changes needed.
   (Or use a new filename and update the matching <img src="..."> in
   the .html file.)
2. For album links (wedding.html, pre-shoot.html, events.html,
   graduation.html), also update the href="..." on each album card
   to the real Facebook album / Google Photos link.

The big cover photo at the top of each category page is the first
<img> inside the "page-cover" section of that page's .html file.

────────────────────────────────────────
CONTACT DETAILS
────────────────────────────────────────
Edit the footer and the "Contact" section (search for id="contact")
in each HTML file to change:
- Facebook page link
- Email address
- Phone number
- Studio location / map (search for "google.com/maps" in index.html)

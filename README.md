# the curvy indians - DaCandidAffairsMgmt

A responsive static portfolio website with pastel sections, a pointer spotlight, typing headings, before-and-after comparison, a filterable creator lookbook, brand carousel, vintage gallery curtains, enlarged photo viewer, and optional instrumental audio.

## Website files

- `index.html`: content and page structure
- `style.css`: layout, responsive styling, and animations
- `script.js`: interactions and playback controls
- `assets/`: photographs, logos, and instrumental loop

No build step or package installation is required. All site asset paths are relative, so the site works in a repository subdirectory as well as on a custom domain.

## Preview locally

Run `python3 -m http.server 4173` in this directory and open http://localhost:4173.

## Publish with GitHub Pages

In repository Settings → Pages, choose “Deploy from a branch”, select `main` and `/ (root)`, then save. GitHub account and repository plan requirements may apply.

For other static hosts, upload this directory and use the root as the publish directory. No build command is required.

## Editing

Edit headings, descriptions, Instagram links, and image lists in `index.html`. The three custom wordmarks are `logo-jk-sports.svg`, `logo-mahaya.svg`, and `logo-style-studio.svg`.

Music starts only when a visitor presses the Music button. Reduced-motion preferences disable decorative animation.

Photos and brand assets remain the property of their respective owners. No open-source license is granted to the supplied media.

ADS PHOTOGRAPHY - WEBSITE PHOTOS
================================

Each folder here is one spot on the website. Add, replace or delete a photo
in a folder and that spot changes:

  - while `npm run dev` is running: refresh the page
  - on the live site: commit and push, and the site redeploys

Accepted files: .jpg .jpeg .png .webp .avif
Photos are resized and compressed automatically, so you can drop in full-size
exports. Around 2000px on the long edge is plenty.


ORDER AND NAMES
---------------
Photos are shown in file-name order. Start names with a number to set it:
1-..., 2-..., 3-...

The file name becomes the photo's description for Google and screen readers,
so describe the picture:

  3-bride-in-a-lavender-saree.jpg  ->  "Bride in a lavender saree, wedding photography in Coimbatore"

Camera names like IMG_2034.jpg still work, with a generic description.


FOLDERS
-------
home/hero/            Home page, top. The first 3 photos are used:
                      1 = large photo on the left (tall/portrait works best)
                      2 = top right, 3 = bottom right (shown square)

home/services/        Home page, "What we photograph". One photo per card,
                      matched by the start of the file name:
                        weddings-...   maternity-...   product-...   headshots-...

home/selected-work/   Home page, "Selected work". All photos are shown.

portfolio/weddings/   /portfolio/weddings and /portfolio
portfolio/maternity/  /portfolio/maternity and /portfolio
portfolio/family/     /portfolio/maternity (Family filter) and /portfolio
portfolio/product/    /portfolio and /corporate (first 2 photos)

about/studio/         About page, studio photo (the first file)
about/team/           About page, team portraits in order:
                      1 = founder & lead photographer, 2 = photographer,
                      3 = editor & album designer

An empty folder shows grey "photo to come" frames until you add photos.


STAND-IN STOCK PHOTOS - REPLACE BEFORE LAUNCH
---------------------------------------------
These folders were filled with free Unsplash photos (Unsplash License: free
for commercial use, no attribution required) so no slot shows an empty frame.
They are NOT the studio's own work or team. Replace each one with a real ADS
Photography photo before the site goes live: delete the file and drop yours in.

  about/studio/1-photography-studio-with-a-lantern-softbox.jpg     Neon Wang
  about/team/1-founder-and-lead-photographer.jpg                   Aravind Kumar
  about/team/2-photographer.jpg                                    Talie Ashrafi
  about/team/3-editor-and-album-designer.jpg                       Sanju Pandita
  home/services/product-dropper-bottle-on-a-studio-table.jpg       Content Pixie
  portfolio/family/1-family-portrait-together.jpg                  Rohit Dey
  portfolio/family/2-newborn-held-in-a-parents-hand.jpg            Kelly Sikkema
  portfolio/family/3-siblings-smiling-outdoors.jpg                 Chi Lok TSANG
  portfolio/maternity/2-expecting-couple-on-a-garden-path.jpg      NaHarai Perez Aguilar
  portfolio/maternity/3-expecting-mother-in-a-green-dress.jpg      Camylla Battani
  portfolio/product/1-red-silk-saree-with-zari-and-pearls.jpg      Urvi Kotasthane
  portfolio/product/2-stainless-steel-pot-on-a-black-backdrop.jpg  Kedibone Isaac Makhumisane
  portfolio/product/3-spices-in-spoons-flat-lay.jpg                Calum Lewis

(Photographer names are from unsplash.com.)

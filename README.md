# AD ZOOM STUDIO — Visual Portfolio & Studio CMS

Award-grade portfolio website and administrative content management system for **AD Zoom Studio**, an elite Photography & Cinematography studio in India specializing in luxury royal weddings, destination pre-weddings, and cinematic films.

---

## ✦ Brand Identity & Design Tokens
- **Ink Black (`#0E0E0E`)**: Primary dark editorial background & deep contrast.
- **Off White (`#F6F3EE`)**: Primary light background for editorial rhythm.
- **Beige (`#E8DFD2`) & Sand (`#D9CBB8`)**: Tactile card backgrounds, warm borders, and section alternating blocks.
- **Warm Grey (`#8A8178`)**: Secondary and tertiary typography.
- **Accent Orange (`#F2602B`)**: Direct extraction from the AD Zoom Studio monogram. Used sparingly (active pips, delicate link underlines, cursor indicator, singular CTAs).
- **Typography**: Refined serif (*Cormorant Garamond*) for headlines & titles + Modern geometric sans (*Plus Jakarta Sans*) for UI.
- **Anti "AI Look" Principles**: Pure asymmetric editorial grids, generous whitespace, 1px rules, CSS film grain (~4% opacity), purposeful cubic-bezier transitions (`cubic-bezier(0.76, 0, 0.24, 1)`), zero glassmorphism, zero purple neon gradients.

---

## ✦ Features & Architecture

### Public Experience
1. **First-Load Preloader**:
   - Plays once per session (stored in `sessionStorage`).
   - Animated SVG camera outline stroke + AD monogram fade-up.
   - Smooth 0 → 100 counter and curtain wipe.
   - Automatically honors `prefers-reduced-motion`.
2. **Scroll & Motion (GSAP + ScrollTrigger + Lenis)**:
   - Smooth inertia scrolling (Lenis) automatically disabled on touch devices to ensure native iOS/Android flick gesture mechanics.
   - Scroll velocity-responsive infinite marquee ribbon.
   - Horizontal pinned scroll on desktop for "Featured Stories" with native snap carousel fallback on mobile.
   - Sticky services discipline list on desktop with real-time preview image swaps on hover.
   - Stat counter animations triggered on viewport entry.
3. **Hover & Desktop Polish**:
   - Interactive custom cursor (ring expands with "VIEW", "PLAY", or "EXPLORE" context over media).
   - Magnetic button physics with rolling duplicate text animation.
   - Subtle image desaturate-to-color and clip-path reveals.
4. **Mobile Native App Feel**:
   - Sticky top bar with monogram.
   - Fixed 5-tab bottom bar (`Home`, `Gallery`, `Films`, `Gear`, `Contact`) with active orange pip.
   - Safe-area inset support for iPhone home bars (`env(safe-area-inset-bottom)`).
   - Full-screen swipeable photo lightbox with zoom and keyboard navigation.
   - Floating WhatsApp concierge button positioned safely above the bottom tab bar.
   - PWA ready (`manifest.webmanifest`, theme-color `#0E0E0E`).
5. **Full Page Catalog**:
   - **Home**: Hero (fullscreen video/image loop, masked headline reveal, showreel modal), Studio statement, Marquee, Featured stories, Sticky services, Latest films, Gear teaser, Editorial testimonials, Instagram strip, CTA band.
   - **About Us**: Studio genesis, director portrait, 5-step methodology (`01 Consultation` → `02 Pre-Production` → `03 The Shoot` → `04 Colour & Score` → `05 Archival Delivery`).
   - **Our Services**: Packages with key deliverables, optional price tags, and direct inquiry links.
   - **Photo Gallery**: Category filter tabs, desktop masonry / 2-column mobile, keyboard/touch lightbox.
   - **Video Gallery**: Cinema showcase with lite-facade modal playback.
   - **Film Detail (`/films/:id`)**: Individual wedding film story, couple name, location, 4K embed, and still frames gallery.
   - **Equipment & Optics (`/gear`)**: Cinema cameras, prime lenses, gimbals, drones, and lighting breakdown.
   - **YouTube Channel**: Direct video library with auto-extracted IDs and thumbnails.
   - **Instagram Journal**: Daily reels and wedding frames.
   - **Contact Us**: Validated inquiry form (`react-hook-form` + `zod`), direct WhatsApp concierge, phone call, Google Maps embed, and business hours.
   - **Custom Pages (`/p/:slug`)**: Dynamic admin-created guides and articles.

---

## ✦ Studio Admin CMS (`/admin`)

The client can manage 100% of the website content without touching code:
- **Instant Demo Access**: Click "Instant Demo Studio Login" or enter:
  - **Email**: `director@adzoomstudio.com`
  - **Password**: `studio2026`
- **Modules**:
  - **Photos**: Multi-upload with drag & drop, client-side auto compression to WebP, category assignment, caption, alt text, and featured toggle.
  - **Categories**: Add, rename, or delete gallery filter tabs.
  - **Films & Cinema**: Add YouTube/Vimeo/MP4 videos, couple names, wedding dates, duration, and high-res still frames.
  - **Services**: Edit package names, descriptions, deliverables, and toggle public price display.
  - **Equipment**: Update cameras, lenses, gimbals, and drones with model specs.
  - **Socials**: Curate YouTube and Instagram reels/posts.
  - **Testimonials**: Add and manage editorial client quotes.
  - **Content & Architecture**: Change hero headlines, studio numbers, director text, contact info, and toggle individual homepage sections.
  - **Custom Pages**: Create new pages with custom URLs (e.g., `/p/investment-guide`) and add them to the navigation.
  - **Inquiries Inbox**: View submissions, filter unread/read/replied, and export to CSV.

---

## ✦ Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Steps
1. Open terminal in the project directory:
   ```bash
   cd "d:\Techora\AD zoom"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ Connecting Supabase (Production Database)

The application includes an offline-first storage engine that works instantly without Supabase. To connect your live Supabase cloud project:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard and run the entire SQL script from:
   `supabase/schema.sql`
   *(This creates the tables, Row Level Security policies, and public access rules).*
3. Create the following public storage buckets in **Storage**:
   - `photos`
   - `videos`
   - `equipment`
   - `site`
4. Copy your **Project URL** and **Anon Key** from `Project Settings > API` and paste them into `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. Re-run `npm run build` or redeploy. The app will automatically sync with Supabase Postgres and Auth!

---

## ✦ Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: (your Supabase URL)
   - `VITE_SUPABASE_ANON_KEY`: (your Supabase Anon Key)
6. Click **Deploy**.

### Deploying to Netlify
1. Sign in to [Netlify](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Select your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Under **Environment variables**, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Click **Deploy Site**.

### Connecting a Custom Domain (e.g. adzoomstudio.com)
1. On Vercel or Netlify, go to **Project Settings > Domains**.
2. Enter your domain: `adzoomstudio.com` (and `www.adzoomstudio.com`).
3. Add the provided `CNAME` and `A` records in your domain registrar (GoDaddy, Namecheap, Google Domains/Squarespace, or Cloudflare).
4. SSL certificates are generated automatically within a few minutes.

---

## ✦ Backups & Maintenance
- **Database Backup**: In Supabase Dashboard, go to **Database > Backups** to download daily snapshots or run an automated export.
- **Inquiries Export**: In `/admin > Inquiries`, click **"Export Inquiries CSV"** at any time to download all client bookings to Excel.
- **Image Compression**: All uploaded photographs are compressed client-side before storage to maintain extreme page load speeds and save storage costs.


# Project Plan: Maui Wedding Website (Master Document)

**Project:** A single-page, mobile-first wedding website rich with photos.
**Theme:** Maui/Tropical
**Primary Colors:**
* **White (Background):** #FFF8DC (Cornsilk)
* **Green (Accent/Text):** #418C52
* **Purple (Accent/Headers):** #513167
**Tech Stack:** React (with Vite) & Tailwind CSS

---

## 1. Project Initialization

This project will be set up using **Vite** for a fast and modern development environment.

### 1.1. Initial Setup Commands

```bash
# 1. Create the React project using Vite
npm create vite@latest our-wedding-website --template react

# 2. Navigate into the project directory
cd our-wedding-website

# 3. Install project dependencies
npm install

# 4. Install Tailwind CSS and its peer dependencies
npm install -D tailwindcss postcss autoprefixer

# 5. Initialize Tailwind CSS
npx tailwindcss init -p
```

### 1.2. Tailwind CSS Configuration
Configure tailwind.config.js to include our custom theme colors and fonts. This centralizes the design system.

JavaScript

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cornsilk': '#FFF8DC', // Main background
        'tropical-green': '#418C52', // Accent Green
        'plum-purple': '#513167', // Accent Purple
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'], // For headings
        'sans': ['Montserrat', 'sans-serif'], // For body text
      }
    },
  },
  plugins: [],
}
Action Item: Add the font import links to index.html in the <head> section.

HTML

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">

## 2. File & Folder Structure
A modular structure will keep the code organized and easy to maintain. This structure includes components for displaying photos.

our-wedding-website/
├── public/
│   ├── couple-photo.jpg         // Main welcome banner image
│   ├── gallery/                 // Folder for all gallery photos
│   │   ├── photo-1.jpg
│   │   └── photo-2.jpg
│   └── favicon.ico              // Site icon
├── src/
│   ├── assets/                  // SVGs, background patterns, etc.
│   │   └── parallax-beach.jpg   // Example image for a parallax divider
│   ├── components/              // All modular React components
│   │   ├── Navbar.jsx
│   │   ├── WelcomeBanner.jsx
│   │   ├── Countdown.jsx
│   │   ├── OurStory.jsx
│   │   ├── EventDetails.jsx     // "When/Where" section
│   │   ├── Activities.jsx
│   │   ├── PhotoGallery.jsx     // NEW: For the photo slideshow
│   │   ├── ParallaxDivider.jsx  // NEW: For visual breaks
│   │   └── Footer.jsx
│   ├── App.jsx                  // Main component to assemble the page
│   ├── index.css                // Tailwind directives and global styles
│   └── main.jsx                 // Entry point of the React app
├── .gitignore
├── index.html
├── package.json
└── tailwind.config.js

## 3. Component Breakdown
Each section of the website will be its own component. The design should be mobile-first: style for small screens first, then use Tailwind's responsive prefixes (md:, lg:) to adjust for larger screens.

Navbar.jsx
Purpose: Provides smooth-scrolling navigation. It should be sticky at the top.

UI/Styling: Use a "hamburger" menu for mobile that expands, and a horizontal bar for desktop. A semi-transparent background with a blur effect (bg-white/70 backdrop-blur-md) is a nice touch.

WelcomeBanner.jsx
Purpose: The first visual impression.

UI/Styling: A full-height hero section (h-screen) with a high-quality photo of the couple as the background (bg-cover). Apply a semi-transparent overlay to ensure the welcome text is readable. This component will also render the Countdown.jsx component.

Countdown.jsx
Purpose: To build excitement by showing the time remaining.

UI/Styling: Four distinct blocks for Days, Hours, Minutes, and Seconds. Use the tropical-green for the numbers to make them pop.

OurStory.jsx
Purpose: To share the couple's story in a personal and engaging way.

UI/Styling: A vertical timeline is a great visualization.

Photo Integration: For each milestone (e.g., "How We Met," "The Proposal"), include a small, dedicated photo next to the text. On mobile, the picture can sit above the text; on desktop, it can sit beside it. This makes the story much more personal.

EventDetails.jsx (When/Where)
Purpose: Provide all crucial information about the wedding event(s).

UI/Styling: Clear sections for "When" and "Where". Include an embedded Google Map and "Add to Calendar" / "Get Directions" buttons.

Activities.jsx
Purpose: To inform guests about other planned activities (e.g., welcome dinner).

UI/Styling: Use a card-based layout where each card represents one activity.

PhotoGallery.jsx (NEW COMPONENT 📸)
Purpose: To showcase a large collection of photos in an organized, user-friendly way.

Placement: This section will go between Activities and the Footer.

UI/Styling: Display a responsive grid of photo thumbnails (2-3 columns on mobile, 4-5 on desktop). When a thumbnail is clicked, it should open a full-screen, swipe-able slideshow (a "lightbox").

Recommendation: To simplify development, use a library like yet-another-react-lightbox to handle the slideshow functionality.

ParallaxDivider.jsx (NEW COMPONENT ✨)
Purpose: To create beautiful visual breaks between content sections using full-width photos.

UI/Styling: This component will be a simple div with a fixed background image (bg-fixed). When placed between sections, it creates a parallax scrolling effect where the background image moves slower than the foreground content, adding a sense of depth.

Example Code:

JavaScript

const ParallaxDivider = ({ imageSrc }) => (
  <div 
    className="h-64 md:h-80 bg-cover bg-center bg-fixed" 
    style={{ backgroundImage: `url(${imageSrc})` }}
  />
);
Footer.jsx
Purpose: The closing section of the page.

UI/Styling: Simple and clean. Use plum-purple for the background with cornsilk text. Include a "back to top" link.

## 4. Assembling the App
The App.jsx file will import and arrange all the components. Each section should have a unique id to enable the Navbar's smooth-scrolling functionality.

JavaScript

// src/App.jsx
import Navbar from './components/Navbar';
import WelcomeBanner from './components/WelcomeBanner';
import OurStory from './components/OurStory';
import EventDetails from './components/EventDetails';
import Activities from './components/Activities';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import ParallaxDivider from './components/ParallaxDivider';

// Import your images
import couplePhoto from '/couple-photo.jpg';
import parallaxBeach from './assets/parallax-beach.jpg';

function App() {
  return (
    <div className="bg-cornsilk text-gray-800 font-sans">
      <Navbar />
      <main>
        <section id="home">
          <WelcomeBanner imageSrc={couplePhoto} welcomeText="Kainoa & Leilani" />
        </section>
        
        <section id="story" className="py-20 md:py-24 px-8">
          <OurStory />
        </section>

        <ParallaxDivider imageSrc={parallaxBeach} />

        <section id="details" className="py-20 md:py-24 px-8">
          <EventDetails />
        </section>
        
        <section id="activities" className="py-20 md:py-24 px-8 bg-tropical-green/10">
          <Activities />
        </section>
        
        <section id="gallery" className="py-20 md:py-24 px-8">
          <PhotoGallery />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

## 5. Final Touches & Deployment
Animations: Use a library like framer-motion to add subtle "fade-in-on-scroll" animations to each section for a polished, premium feel.

Image Optimization: Ensure all images (especially for the gallery) are compressed for the web to improve loading times.

Deployment: Since this is a static frontend application, it can be easily deployed for free on platforms like Vercel or Netlify. Connect the GitHub repository for continuous deployment.

---

## 6. Execution checklist & missing technical considerations (developer-focused)
The above covers the high-level plan. Below are concrete, often-missed items and recommended decisions that a developer will need to execute successfully.

6.1 Project assumptions
- Single-page app (SPA) with client-side routing or anchor-based sections. Confirm whether you'd like separate route-per-section (for shareable links) or a single long-scrolling page.
- No backend initially. Decide where RSVP/contact data will live (third-party form, serverless function, or offline via email link).

6.2 Tooling & dev workflow
- Add ESLint + Prettier and a basic config to keep formatting consistent.
- Add Husky + lint-staged for pre-commit checks (run ESLint, Prettier).
- Add a simple npm script set: dev, build, preview, lint, format, analyze.

6.3 TypeScript: optional
- Recommend TypeScript for better DX and fewer runtime errors. If chosen, scaffold with `--template react-ts` and update README.

6.4 Environment variables
- Use `.env` for runtime configuration (e.g., GOOGLE_MAPS_API_KEY, VERCEL_URL). Don't commit secrets.

6.5 Accessibility (A11y)
- Ensure semantic HTML (nav, main, header, footer, buttons, landmarks).
- Keyboard navigation: all interactive elements focusable and reachable.
- Use aria-* attributes where necessary (e.g., aria-expanded on the mobile menu).
- Color contrast: verify contrast ratios for text vs background; adjust if needed to meet WCAG AA.
- Add skip-to-content link for keyboard users.
- Test with Lighthouse and axe-core; fix violations before launch.

6.6 Images & performance
- Create multiple image sizes and use srcset and sizes for responsive images.
- Use modern formats (WebP/AVIF) where possible with fallback to JPEG/PNG.
- Lazy-load offscreen images (loading="lazy" or IntersectionObserver for older browsers).
- Generate optimized thumbnails for the gallery.
- Consider an image CDN (Cloudinary, Imgix) or Vercel/Netlify built-in optimizers.
- Use width/height or CSS aspect-ratio to avoid layout shift (CLS).

6.7 Lightbox / gallery
- Recommended libraries:
  - yet-another-react-lightbox (modern, feature-rich)
  - react-image-lightbox (simple)
  - custom minimal lightbox if you prefer no deps
- Ensure lightbox supports keyboard nav, swipe gestures, and escape-to-close.



6.9 Analytics & privacy
- If adding analytics (e.g., GA4), include an easy way to opt out (cookie banner) to be privacy-conscious.
- For EU guests consider a consent flow. Keep third-party scripts deferred.

6.10 Forms & RSVP
- Options without a backend:
  - Use Google Forms (easy, quick) and embed the form or link out.
  - Use Formspree / FormKeep / Netlify Forms to receive emails.
  - Use a serverless function (Vercel/Netlify lambda) to send emails via an SMTP provider or SendGrid.
- Always provide an offline fallback (mailto:) in case third-party form fails.
- Validate on client; sanitize input before submitting.

6.11 Maps & directions
- Google Maps embed requires an API key for advanced use; an iframe embed can work without JS key for basic display.
- Provide static fallback image + link to Google Maps directions.

6.12 Progressive Web App (optional)
- Add a web manifest and service worker if you want offline caching (considered optional for a wedding site).

6.13 CI/CD & deployment
- Recommend Vercel for simplest Vite deployment; Netlify is also excellent.
- Add a GitHub Actions workflow for CI: npm install, npm run build, run tests/lint.
- Configure preview deployments per PR to allow content review.

6.14 Security
- Serve over HTTPS (platforms like Vercel/Netlify provide automatically).
- Sanitize any user input and avoid leaking API keys in client code.

6.15 Testing & QA
- Add basic unit tests for critical components (Jest + React Testing Library) — optional but helpful.
- Run Lighthouse and address accessibility/performance issues.
- Cross-browser test (Chrome, Safari, iOS Safari) — images and fixed backgrounds can behave differently on mobile.

6.16 Tailwind specifics
- Ensure `content` paths in tailwind.config.js include all template files.
- Use the JIT engine (default) and purge unused styles via content.
- Add theme tokens to tailwind theme.extend to centralize colors and font sizes.

6.17 Fonts & loading strategy
- Preconnect to Google Fonts domains and consider `rel=preload` for critical fonts.
- Consider using font-display: swap to avoid invisible text (FOIT).

6.18 Performance budget & bundle analysis
- Add `vite-plugin-inspect` or `rollup-plugin-visualizer` for bundle analysis.
- Set a performance budget (e.g., main JS < 200KB gzipped) and optimize if exceeded.

6.19 Logging & error reporting
- Optional: integrate Sentry or similar for runtime errors (probably overkill for a wedding site but useful if adding forms).

6.20 Content workflow
- Create `src/content/site.json` or markdown files for editable content (names, dates, addresses, schedule) so non-devs can edit easily.
- Provide a README with instructions for updating copy and photos.

6.21 Git & release process
- Use feature branches and PRs. Protect main branch and enable required status checks.
- Tag releases (v0.1, v0.2) for major milestones.

6.22 Miscellaneous
- Favicon + touch icons for iOS.
- Social card image generation and/or dynamic OG image if desired.
- Photo licensing: confirm you have rights to publish all images.

---

## 7. Minimum Viable Implementation (what to build first)
Prioritize a small set of deliverables to get a working site quickly:
1. Scaffold: Vite + React + Tailwind + Tailwind config + fonts.
2. Layout: Navbar, WelcomeBanner (hero with placeholder image + countdown), Footer.
3. Sections: OurStory, EventDetails (with embedded map iframe), Activities, PhotoGallery (thumbnail grid, lightbox basic).
4. Basic build & deploy pipeline: Vercel/Netlify config + GitHub Actions CI that lints and builds.
5. Content file: src/content/site.json with placeholders so you can swap in real copy and photos later.

---

## 8. Delivery checklist before launch
- [ ] Content populated (text + photos)
- [ ] Images optimized and responsive
- [ ] Accessibility audit passed (critical issues fixed)
- [ ] Meta tags + OG images added
- [ ] Forms/RSPV working and tested
- [ ] Deployment configured and domain (if any) set up
- [ ] Cross-browser smoke test done
- [ ] Final QA and stakeholder sign-off


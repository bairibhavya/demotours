# Voyage Trails — Tours & Travels (React + Vite)

A responsive, photo-first travel website and **local demonstration admin dashboard**, designed from the supplied Voyage Trails visual reference. This is a source-code project, not a static HTML/Python-server site.

## Run in VS Code (Windows PowerShell)

1. Extract the ZIP, and open the `VoyageTrails-React` folder (the folder containing `package.json`) in VS Code.
2. Run:

```powershell
npm install
npm run dev
```

3. Open the Vite URL shown in the terminal, typically `http://localhost:5173/`.
4. Visit `/admin` for the admin **demo** dashboard. No login is required in the offline demonstration.

## Navigation

| Page | URL | What works |
| --- | --- | --- |
| Home | `/` | Hero search with **live autocomplete**, date preference, traveller count, destinations, package cards |
| Packages | `/packages` | **Live letter-by-letter filtering**, trip type, minimum/maximum price, price slider, sorting, mobile filters |
| Destination listing | `/destinations` | **Live prefix search**, regions, linked tour packages |
| Tour details | `/packages/kerala-backwaters` | Gallery, overview, day-by-day itinerary, inclusions/exclusions, enquiry links |
| About | `/about` | Company presentation and gallery |
| Traveller stories | `/reviews` | Explicit sample quotes |
| Contact | `/contact` | Validated enquiry form saved to browser demo storage |
| Trip request | `/book/kerala-backwaters` | Validated request and example estimate; **no payment** |
| Admin | `/admin` | Local demo dashboard, package Add/Edit/Delete, enquiry/booking status, CSV exports, destinations, settings |

### Search and price behavior

- Start typing **`k`** (lowercase or uppercase). **Kerala** and **Kashmir** immediately appear; no Enter press is needed.
- Word-prefix matches work too: `back` matches `Kerala Backwaters`.
- Package results change as you type (not only when clicking Search).
- The range controls filter the illustrative INR package price **per person**, with a min, max, and draggable cap. Type and sort filters combine with search.
- The home search button opens the filtered package list. The preferred date is carried as a preference only, not confirmed tour availability.

## Architecture

- React 18 + Vite 6
- React Router 6
- Lucide icon components
- Framer Motion scroll-reveal animations
- Vanilla CSS with responsive breakpoints
- Browser `localStorage` for **demo-only** admin/enquiry persistence
- Remote Unsplash photographs with **locally bundled scenic fallback crops** from the supplied design reference

## IMPORTANT: Not a live booking platform

This project is a polished working **demo**, not a production backend. All tour prices, star ratings, reviews, contact details and bookings are illustrative. Customer form submissions and admin changes are stored **only in the local browser**; they do not sync between users, reach an agency, verify package inventory, reserve tickets, send WhatsApp messages, or accept payments. The admin is not authenticated. **Do not use this admin with real customer data.**

Before offering it as a production travel website:

1. Replace all example packages, numbers, reviews, addresses, rates and contact information with verified client content; remove illustrative testimonials unless genuine and permissioned.
2. Configure a secure backend (e.g., Supabase with tested RLS, per-user roles and server-side input validation) for enquiries, packages, booking states, and audit logs.
3. Integrate genuine availability, payment processing and confirmation workflows if selling tours online; provide cancellation/refund and travel terms.
4. Obtain or verify rights for all destination photos; current online Unsplash images and locally cropped reference fallbacks are visual **placeholders**.
5. Add privacy/consent and deletion/retention policies; avoid storing real customer PII in browsers.
6. Run a full Vite production build and device/browser QA. Those **were not available in the creation environment** because npm registry resolution failed.

## How to customise

- Update `src/data.js` for destinations, prices, images, itinerary examples, review/demo data.
- Update the site branding, contact information and footer in `src/components/Layout.jsx` and `.env.local` from `.env.example`.
- Main visual styles live in `src/styles.css`; the admin design is `src/pages/admin.css`.
- Admin local-demo CRUD logic is in `src/pages/Admin.jsx`.
- If you edit seed package data after saving local changes, select **Admin → Settings → Reset demo data** to load the new seed records.

## Tests

```powershell
npm test
npm run build
npm run preview
```

`npm test` checks real search utility logic (including lowercase `k`), price cap data, unique package IDs, and price formatting without dependencies. `npm run build` needs `npm install` once.

## Deploy to Vercel

- Import the GitHub repository as a Vite project.
- Build command: `npm run build`.
- Output directory: `dist`.
- `vercel.json` includes a SPA route fallback for `/packages/...` and `/admin`.
- Hosting alone **does not turn the local demo into a secure booking platform**.

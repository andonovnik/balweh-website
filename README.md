# BALWEH Website

Official website for Balweh Gebäudereinigung und Galabau - Professional building cleaning and landscaping services.

## Tech Stack

- **Next.js 16.1.6** (App Router with static export)
- **React 19** with TypeScript
- **Tailwind CSS v4** (inline theming)
- **PHP 8.3.30** (Backend API for contact form)

## Features

- **DSGVO Compliant** - Full privacy policy and legal compliance
- **Contact Form** - Secure form with CSRF protection and rate limiting
- **Monitoring** - Health check endpoint for contact form infrastructure
- **Responsive Design** - Mobile-first with smooth animations
- **SEO Optimized** - Metadata, sitemap, robots.txt
- **Static Export** - FTP-deployable HTML/CSS/JS

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Useful Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run lint     # ESLint checking
npm run build    # Production build (generates /out folder)
npm run start    # Starts Next.js server (not used with static export)
```

For static-export preview (matches FTP hosting output):

```bash
npx serve@latest out -l 3000
```

## Project Structure

```
app/
├── components/
│   ├── ContactForm.tsx    # Contact form with validation
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── layout.tsx             # Root layout with metadata
├── page.tsx               # Homepage
├── not-found.tsx          # Custom 404 page
├── globals.css            # Tailwind and custom styles
├── kontakt/               # Contact page
├── ueber-uns/             # About page
├── datenschutz/           # Privacy policy (DSGVO)
├── impressum/             # Legal notice
├── gebaeudereinigung/     # Building cleaning service page
└── garten-landschaftsbau/ # Landscaping service page

public/
├── .htaccess              # URL rewriting & custom 404 handler
├── api/
│   ├── contact.php        # Form submission handler
│   ├── csrf-token.php     # CSRF token generator
│   ├── monitoring-health.php  # Health check endpoint
│   ├── log-cleanup.php    # Retention cleanup job endpoint
│   └── .htaccess          # Protect secret files
└── images/                # Static assets
```

## Deployment

This project uses **static export** for FTP deployment to Hostinger.

### Build for Production

```bash
npm run build
```

This generates the `out/` folder with static files.

### FTP Upload

1. Upload contents of `out/` to `public_html/`
2. Create `.monitoring-health.key` file on server:
   ```
   Location: public_html/api/.monitoring-health.key
   Content: [Your monitoring key from MONITORING_HEALTH_KEY.txt]
   ```
3. Verify `.htaccess` files are uploaded (root and `/api/`)

## Configuration

### Brand Colors

Defined in `app/globals.css`:

```css
--brand-primary: #073646 /* Dark teal */ --brand-secondary: #63a86a /* Green */
  --brand-header-button: #5a7b70 /* Teal-gray */;
```

### Contact Form Settings

- **Rate Limiting**: 3 submissions per hour per IP
- **Data Retention**: Logs deleted after 30 days
- **CSRF Protection**: 256-bit tokens with 1-hour expiry
- **Email Recipient**: info@balweh.de

### Monitoring

Health check endpoint: `/api/monitoring-health.php`

**Usage:**

```bash
curl -H "X-Monitor-Key: YOUR_KEY" https://balweh.de/api/monitoring-health.php
```

**Response:**

```json
{
  "status": "ok",
  "checks": {
    "temp_dir_writable": true,
    "rate_limit_file_present": true,
    "log_file_present": true
  },
  "metrics": {
    "rate_limit_entries_total": 3,
    "log_size_bytes": 1024
  }
}
```

### Retention Cleanup Job (Cron)

To guarantee retention windows even during low traffic, schedule cleanup via cron.

**Option A (preferred, CLI PHP):**

```bash
php /home/<USER>/public_html/api/log-cleanup.php
```

**Option B (HTTP fallback):**

```bash
curl -fsS "https://balweh.de/api/log-cleanup.php?key=YOUR_CLEANUP_KEY" >/dev/null
```

**Recommended frequency:** hourly or daily.

**Key configuration (HTTP mode):**

- Set env var: `CLEANUP_JOB_KEY`
- Or create file: `public_html/api/.log-cleanup.key`

The cleanup job enforces:

- Rate-limit file retention: 1 hour
- Submission log retention: 30 days

## SEO & GEO Setup

### SEO Configuration

SEO metadata and helpers are centralized in `app/lib/seo.ts`:

- **`createPageMetadata()`** - Generates page-level metadata (title, description, canonical, Open Graph)
- **`createBreadcrumbSchema()`** - JSON-LD breadcrumb navigation for search engines
- **`createServiceSchema()`** - Service-specific schema for Gebäudereinigung and Garten-Landschaftsbau pages
- **`createContactPageSchema()`** - Contact page schema with organization details
- **`websiteSchema`** - Root organization, website, and local business schema

All pages import these helpers instead of duplicating metadata. Reusable components:

- **`BreadcrumbNav.tsx`** - Breadcrumb navigation component
- **`JsonLd.tsx`** - JSON-LD script tag wrapper

### GEO (Geographic/Local Business)

**Business Location:**

- Address: Baumberger Str. 54, 51373 Leverkusen, Nordrhein-Westfalen, Germany
- Phone: +49 155 67200971
- Email: info@balweh.de

**Service Area:**

- Primary: Nordrhein-Westfalen (NRW)
- Configured in `createServiceSchema()` areaServed field

**Geographic Schema:**

The `websiteSchema` includes LocalBusiness markup with:

- Full postal address details
- Operating hours: Monday–Friday, 08:00–18:00
- Service offerings: Gebäudereinigung (Building Cleaning) and Garten- und Landschaftsbau (Landscaping)
- Social profiles (Instagram, TikTok)

**Update GEO Data:**
Edit these fields in `app/lib/seo.ts`:

```typescript
// Update postal address
const POSTAL_ADDRESS = { ... }

// Update service area
const NRW_AREA = { "@type": "AdministrativeArea", name: "..." }

// Update contact info
export const CONTACT_PHONE = "..."
export const CONTACT_EMAIL = "..."
```

## Security Features

- **CSRF Tokens** - HttpOnly, SameSite=Lax cookies
- **Rate Limiting** - IP-based with 3 submissions/hour
- **Input Validation** - Client and server-side
- **Email Header Injection Prevention** - Sanitized inputs
- **Key-based Monitoring Auth** - Protected health endpoint
- **Data Minimization** - IP not included in emails

## DSGVO Compliance

- Privacy policy at `/datenschutz`
- Legal basis: Art. 6(1)(b) contract initiation
- Data retention: 30 days for logs, 1 hour for rate limiting
- IP addresses used only for rate limiting and security logs
- No personal data exposed in monitoring endpoints

## Development Notes

- Static export configured in `next.config.ts`
- Trailing slash normalization in Header for active link detection
- PHP backend required for contact form functionality
- Monitoring key stored in git-ignored file for security

## License

Proprietary - Balweh Gebäudereinigung und Galabau

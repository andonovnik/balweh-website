# BALWEH Website

Official website for Balweh Gebäudereinigung und Galabau e.K. - Professional building cleaning and landscaping services.

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
npm run start    # Preview production build
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
├── globals.css            # Tailwind and custom styles
├── kontakt/               # Contact page
├── ueber-uns/             # About page
├── datenschutz/           # Privacy policy (DSGVO)
├── impressum/             # Legal notice
├── gebaeudereinigung/     # Building cleaning service page
└── garten-landschaftsbau/ # Landscaping service page

public/
├── api/
│   ├── contact.php        # Form submission handler
│   ├── csrf-token.php     # CSRF token generator
│   ├── monitoring-health.php  # Health check endpoint
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
"X-Monitor-Key: YOUR_KEY" https://balweh.de/api/monitoring-health.php
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

Proprietary - Balweh Gebäudereinigung und Galabau e.K.

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

## Project Structure

```
app/
├── components/
│   ├── ContactForm.tsx        # Contact form with validation
│   ├── Header.tsx             # Navigation header
│   └── Footer.tsx             # Site footer
├── layout.tsx                 # Root layout with metadata
├── page.tsx                   # Homepage
├── not-found.tsx              # Custom 404 page
├── globals.css                # Tailwind and custom styles
├── kontakt/                   # Contact page
├── ueber-uns/                 # About page
├── datenschutz/               # Privacy policy (DSGVO)
├── impressum/                 # Legal notice
├── gebaeudereinigung/         # Building cleaning service page
└── garten-landschaftsbau/     # Landscaping service page

public/
├── .htaccess                  # URL rewriting & custom 404 handler
├── api/
│   ├── contact.php            # Form submission handler
│   ├── csrf-token.php         # CSRF token generator
│   ├── monitoring-health.php  # Health check endpoint
│   ├── log-cleanup.php        # Retention cleanup job endpoint
│   └── .htaccess              # Protect secret files
└── images/                    # Static assets
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
--brand-primary: #073646 /* Dark teal */ 
--brand-secondary: #63a86a /* Green */
--brand-secondary-hover: #2f5d35 /* Green hover */;
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
curl -H "X-Monitor-Key: MONITORING_KEY" https://balweh.de/api/monitoring-health.php
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-03-13T00:09:26+00:00",
  "warnings": [],
  "checks": {
    "rate_limit_file_present": false,
    "rate_limit_file_readable": false,
    "log_file_present": false,
    "log_file_readable": false,
    "cleanup_marker_present": true,
    "cleanup_marker_readable": true,
    "cleanup_marker_stale": false,
    "cleanup_recent": true,
    "cron_log_present": true,
    "cron_log_readable": true,
    "cron_log_last_modified": 1773360002,
    "cron_log_age_seconds": 564
  },
  "metrics": {
    "rate_limit_entries_total": 0,
    "rate_limit_unique_ips": 0,
    "rate_limit_max_requests_per_ip": 0,
    "rate_limit_entries_active": 0,
    "rate_limit_unique_ips_active": 0,
    "rate_limit_max_requests_per_ip_active": 0,
    "log_size_bytes": 0,
    "log_line_count": 0,
    "log_last_modified_unix": null,
    "log_last_modified": null,
    "log_age_seconds": null,
    "cleanup_marker_unix": 1773360002,
    "cleanup_marker": "2026-03-13 00:00:02",
    "cleanup_marker_age_seconds": 564,
    "last_cleanup_run_unix": 1773360002,
    "last_cleanup_run": "2026-03-13 00:00:02",
    "cron_log_present": true,
    "cron_log_readable": true,
    "cron_log_last_modified_unix": 1773360002,
    "cron_log_last_modified": "2026-03-13 00:00:02",
    "cron_log_age_seconds": 564,
    "runtime_php_version": "8.3.30",
    "runtime_sapi": "litespeed",
    "retention_log_days": 30,
    "retention_rate_limit_seconds": 3600
  }
}
```

### Retention Cleanup Job (Cron)

To guarantee retention windows even during low traffic, schedule cleanup via cron.

**Recommended frequency:** hourly or daily.

The cleanup job enforces:

- Rate-limit file retention: 1 hour
- Submission log retention: 30 days

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
- Monitoring and Cleanup Job Keys are stored in git-ignored file for security

## License

Proprietary - Balweh Gebäudereinigung und Galabau

# Caching Implementation Guide

## Overview

This document describes the caching strategies and EU-compliant cookie consent implementation for the Balweh website.

## What Was Implemented

### 1. **Browser Caching (Service Worker)**
A Service Worker handles intelligent caching of static and dynamic assets:

- **Static Assets (Images, CSS, Fonts, JS)**: Cached aggressively with cache-first strategy. These files are served from cache first, then updated in the background.
- **HTML Pages**: Uses network-first strategy, ensuring users always get the latest content while offline support is available through cached versions.
- **Automatic Updates**: Old caches are automatically cleaned up when the Service Worker activates.

**File**: `public/sw.js`

### 2. **HTTP Cache Headers**
HTTP headers in `next.config.ts` instruct browsers and CDNs how to cache content:

- **General pages**: 1 hour cache with 24-hour stale-while-revalidate
- **Static assets** (images, fonts, CSS, JS): 1 year cache (immutable)
- **Security headers**: Prevents MIME-type sniffing, clickjacking, and XSS attacks

### 3. **EU-Compliant Cache Consent Popup**
A modal dialog requests user consent before enabling Service Worker caching:

- **File**: `app/components/CacheConsent.tsx`
- **Storage**: User preference saved in `localStorage` as `cache_consent`
- **Languages**: German text (customize in the component for other languages)
- **Compliance**: Adheres to GDPR and ePrivacy Directive requirements

The popup:
- Shows only once (checks localStorage)
- Allows users to accept or reject caching
- Links to privacy policy
- Non-intrusive design at bottom of page

### 4. **Cache Management Utility**
Helper functions for programmatic cache management:

**File**: `app/lib/cacheUtils.ts`

Available functions:
```typescript
// Check consent status
cacheUtils.hasConsentForCache(): boolean
cacheUtils.getCacheConsentStatus(): 'accepted' | 'rejected' | 'unknown'

// Manage consent
cacheUtils.setCacheConsent(accepted: boolean): void

// Clear cache
cacheUtils.clearAllCache(): Promise<void>

// Get cache metrics
cacheUtils.getCacheSize(): Promise<number>
cacheUtils.requestPersistentStorage(): Promise<boolean>
```

## Performance Benefits

1. **Faster Page Loads**
   - Static assets are cached locally (~50-80% faster on repeat visits)
   - Service Worker enables offline functionality
   - Reduces server requests and bandwidth usage

2. **SEO Improvements**
   - Cache headers improve crawlability
   - Security headers boost ranking signals
   - Better Core Web Vitals scores

3. **Reduced Bandwidth**
   - Cached assets don't require downloading
   - Stale-while-revalidate keeps freshness while reducing requests

## EU Compliance

### GDPR & ePrivacy Directive Compliance

The implementation respects EU regulations:

1. **Explicit Consent**: Users must accept before caching is enabled
2. **Easy Rejection**: Users can reject caching with one click
3. **Persistent Consent**: User choice is remembered
4. **Privacy Policy Link**: Links to Datenschutz (Privacy Policy) page
5. **Clear Information**: Explains what is being cached (non-personal data)

### Notes
- The cached data contains **no personal information** - only static resources (images, CSS, JS)
- If users reject, the Service Worker won't be registered
- Users can clear cache anytime via browser settings or through a management interface

## Usage Examples

### 1. Allow Users to Manage Cache Consent

```tsx
import { cacheUtils } from '@/lib/cacheUtils';

export default function SettingsPage() {
  const handleClearCache = async () => {
    await cacheUtils.clearAllCache();
    alert('Cache cleared!');
  };

  const status = cacheUtils.getCacheConsentStatus();

  return (
    <div>
      <p>Cache consent status: {status}</p>
      <button onClick={handleClearCache}>Clear All Cache</button>
    </div>
  );
}
```

### 2. Request Persistent Storage

```tsx
import { cacheUtils } from '@/lib/cacheUtils';

export default function App() {
  useEffect(() => {
    if (cacheUtils.hasConsentForCache()) {
      cacheUtils.requestPersistentStorage();
    }
  }, []);
}
```

### 3. Check Cache Size

```tsx
const size = await cacheUtils.getCacheSize();
console.log(`Cache size: ${(size / 1024 / 1024).toFixed(2)} MB`);
```

## Deployment Considerations

### Vercel
Cache headers work automatically. No additional configuration needed.

### Netlify
Configure in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600, stale-while-revalidate=86400"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Custom Server
Configure cache headers in your web server (Nginx, Apache, etc.)

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Cache API | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |
| Storage API | ✅ | ✅ | ⚠️ | ✅ |

## Customization

### Change Cache Names/Versions
Edit `public/sw.js`:
```javascript
const CACHE_NAME = 'balweh-cache-v1'; // Change version to bust cache
```

### Adjust Cache Duration
Edit `next.config.ts` headers configuration to change cache times.

### Customize Consent Popup Text
Edit `app/components/CacheConsent.tsx` for different languages or styling.

### Add New Cache Strategies
Extend `public/sw.js` with additional fetch event listeners for different content types.

## Testing

### Test Service Worker
1. Open DevTools → Application → Service Workers
2. Should see "sw.js" registered when cache consent is accepted
3. Go offline and refresh - pages should still load

### Test Consent Popup
1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Consent popup should appear

### Test Cache Headers
Use browser DevTools or curl:
```bash
curl -i https://www.balweh.de
# Look for Cache-Control header in response
```

## Monitoring

### Check Service Worker Status
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log(registrations);
});
```

### Monitor Cache Size
```javascript
if (navigator.storage && navigator.storage.estimate) {
  navigator.storage.estimate().then(estimate => {
    console.log(`Used: ${estimate.usage}, Quota: ${estimate.quota}`);
  });
}
```

## Troubleshooting

### Service Worker Not Registering
- Check if user accepted cache consent
- Check browser console for errors
- Ensure `/public/sw.js` exists
- Check browser privacy settings

### Cache Not Working
- Clear browser cache and reload
- Update `CACHE_NAME` in `sw.js` to force refresh
- Check DevTools Network tab - should show "from ServiceWorker"

### Memory Issues
- Implement cache size limits in `sw.js`
- Use `caches.delete()` to remove old caches
- Monitor with `navigator.storage.estimate()`

## Future Improvements

1. **Admin Dashboard**: Display cache statistics
2. **Selective Cache Clearing**: Allow users to clear specific asset types
3. **Background Sync**: Sync data in background when online
4. **Push Notifications**: Notify users of cache updates
5. **Analytics**: Track cache effectiveness

## References

- [Service Workers MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Storage API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [GDPR Cookie Compliance](https://gdpr-info.eu/)
- [Next.js Headers Configuration](https://nextjs.org/docs/app/api-reference/next-config-js/headers)

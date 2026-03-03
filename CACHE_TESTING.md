# Cache Testing Guide

## How to Test if Caching Works Properly

### 1. **Check Service Worker Registration**

Open your browser DevTools (F12) and go to:

**Chrome/Edge:**
- Application tab → Service Workers
- You should see `sw.js` with status "activated and running"

**Firefox:**
- Application tab → Service Workers
- Look for your domain with `sw.js` registered

**Console command:**
```javascript
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('Service Workers registered:', regs.length);
  regs.forEach(reg => console.log('SW scope:', reg.scope));
});
```

### 2. **Check Cache Storage**

**Chrome/Edge:**
- DevTools → Application tab → Cache Storage
- Expand "Cache Storage" 
- You should see `balweh-cache-v1` with cached files

**Firefox:**
- DevTools → Storage tab → Cache Storage
- Look for `balweh-cache-v1`

**Console command:**
```javascript
caches.keys().then(names => {
  console.log('Cache names:', names);
  names.forEach(name => {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        console.log(`Cache "${name}" has ${keys.length} items:`, keys.map(k => k.url));
      });
    });
  });
});
```

### 3. **Check localStorage Consent**

**Console command:**
```javascript
console.log('Cache consent:', localStorage.getItem('cache_consent'));
// Should return: "true", "false", or null
```

### 4. **Test HTTP Cache Headers** (After deploying to Hostinger)

**Using curl (Git Bash/WSL):**
```bash
curl -I https://www.balweh.de/
# Look for: Cache-Control header in response
```

**Using browser DevTools:**
1. Open Network tab (F12)
2. Hard refresh (Ctrl+Shift+R)
3. Click any resource (image, CSS, JS)
4. Check "Headers" tab
5. Look for `Cache-Control` in Response Headers

### 5. **Test Service Worker Caching**

**Step-by-step test:**

1. **First visit:**
   - Open DevTools Network tab
   - Visit the site
   - You should see consent popup
   - Click "Akzeptieren"
   - Refresh (F5)
   
2. **Second visit:**
   - In Network tab, look at the "Size" column
   - Cached resources should show "from ServiceWorker" or "(ServiceWorker)"
   
3. **Offline test:**
   - DevTools → Network tab
   - Check "Offline" checkbox
   - Refresh page
   - Site should still load (from cache)

### 6. **Test Cache Clearing**

**Before clearing:**
```javascript
// Run in console:
caches.keys().then(names => console.log('Before clear:', names));
```

**Click "Cache löschen" button, then:**
```javascript
// Run in console after page reloads:
caches.keys().then(names => console.log('After clear:', names));
// Should return empty array []
```

### 7. **Test Different Scenarios**

#### Scenario A: First-time visitor
- Clear all browser data
- Visit site
- ✅ Should see consent popup
- ✅ No Service Worker registered yet
- ✅ Resources load from network

#### Scenario B: Accept consent
- Click "Akzeptieren"
- Check console: `navigator.serviceWorker.controller`
- ✅ Should register Service Worker
- ✅ Next refresh loads from cache

#### Scenario C: Reject consent
- Clear browser data
- Visit site  
- Click "Ablehnen"
- ✅ Service Worker should NOT register
- ✅ Resources always load from network

#### Scenario D: Clear cache
- Open settings (⚙️ icon bottom-right)
- Click "Cache löschen"
- ✅ Page reloads
- ✅ Consent popup shows again
- ✅ Cache Storage is empty

### 8. **Common Issues & Solutions**

#### Issue: "Cache löschen" doesn't work
**Causes:**
- Browser HTTP cache is different from Service Worker cache
- Some resources cached by browser, not Service Worker

**Solution:**
- Use `Ctrl+Shift+R` (hard refresh) to bypass browser cache
- Or: DevTools → Network tab → ☑️ Disable cache

#### Issue: Service Worker not registering
**Causes:**
- HTTPS required (doesn't apply to localhost)
- JavaScript errors preventing registration
- Browser doesn't support Service Workers

**Check:**
```javascript
if ('serviceWorker' in navigator) {
  console.log('✅ Service Workers supported');
} else {
  console.log('❌ Service Workers NOT supported');
}
```

#### Issue: Consent popup doesn't show
**Causes:**
- `localStorage.cache_consent` already set
- JavaScript error

**Solution:**
```javascript
// Clear consent in console:
localStorage.removeItem('cache_consent');
// Then refresh page
```

#### Issue: Old cache persists
**Causes:**
- Service Worker still active from old version
- Multiple tabs open

**Solution:**
1. Close ALL tabs with your site
2. DevTools → Application → Service Workers → Click "Unregister"
3. DevTools → Application → Clear storage → Click "Clear site data"
4. Reopen site in fresh tab

### 9. **Development vs Production Caching**

**Development (`npm run dev`):**
- Next.js dev server has its own caching
- Service Worker works but may behave differently
- Hot reload can interfere with SW registration

**Production (`npm run build` + deploy):**
- Static files exported to `out/`
- Service Worker works as designed
- `.htaccess` cache headers apply (Hostinger)

**Recommendation:** Test final caching behavior on production/staging server, not dev server.

### 10. **Browser Compatibility**

Test in multiple browsers:

| Browser | Service Worker | Cache API | localStorage |
|---------|----------------|-----------|--------------|
| Chrome 90+ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ |
| Firefox 88+ | ✅ | ✅ | ✅ |
| Safari 15+ | ✅ | ✅ | ✅ |
| Opera 76+ | ✅ | ✅ | ✅ |

### 11. **Performance Verification**

**Before caching (first visit):**
- DevTools → Network → Check total size
- Note load time

**After caching (second visit):**
- Refresh page
- Check Network tab
- ✅ Total size should be smaller (many resources from cache)
- ✅ Load time should be faster

**Lighthouse test:**
1. DevTools → Lighthouse tab
2. Click "Generate report"
3. Check "Performance" score
4. Look for caching-related suggestions

### 12. **Production Deployment Checklist**

After uploading to Hostinger:

- [ ] `.htaccess` file is in root directory
- [ ] `sw.js` is accessible at `https://www.balweh.de/sw.js`
- [ ] Test cache headers with curl or DevTools
- [ ] Test Service Worker registration
- [ ] Test consent popup on fresh visit
- [ ] Test cache clearing functionality
- [ ] Test offline functionality

### 13. **Debugging Commands (Copy-Paste Ready)**

**Complete cache diagnostic:**
```javascript
(async () => {
  console.log('=== CACHE DIAGNOSTIC ===');
  
  // Check Service Worker
  if ('serviceWorker' in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations();
    console.log('✅ Service Workers:', regs.length);
    regs.forEach((reg, i) => {
      console.log(`  [${i}] Scope:`, reg.scope);
      console.log(`  [${i}] Active:`, !!reg.active);
    });
  } else {
    console.log('❌ Service Workers not supported');
  }
  
  // Check Cache Storage
  if ('caches' in window) {
    const names = await caches.keys();
    console.log('✅ Cache Storage:', names.length, 'caches');
    for (const name of names) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      console.log(`  Cache "${name}":`, keys.length, 'items');
      keys.forEach(k => console.log(`    - ${k.url}`));
    }
  } else {
    console.log('❌ Cache API not supported');
  }
  
  // Check localStorage
  const consent = localStorage.getItem('cache_consent');
  console.log('Consent status:', consent || 'not set');
  
  console.log('=== END DIAGNOSTIC ===');
})();
```

**Force clear everything:**
```javascript
(async () => {
  // Clear all caches
  const names = await caches.keys();
  await Promise.all(names.map(n => caches.delete(n)));
  
  // Unregister all service workers
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(regs.map(r => r.unregister()));
  
  // Clear localStorage
  localStorage.removeItem('cache_consent');
  
  console.log('✅ Everything cleared! Refresh the page.');
})();
```

---

## Quick Reference

**Accept caching:** Click "Akzeptieren" in popup  
**Reject caching:** Click "Ablehnen" in popup  
**Manage caching:** Click ⚙️ icon (bottom-right)  
**Clear cache:** Settings → "Cache löschen"  
**Dev console:** Press F12  
**Hard refresh:** Ctrl+Shift+R (bypasses browser cache)  

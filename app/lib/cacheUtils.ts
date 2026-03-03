/**
 * Cache Management Utility
 * Provides functions to manage browser cache and Service Worker cache
 */

export const cacheUtils = {
  /**
   * Check if cache consent has been given
   */
  hasConsentForCache: (): boolean => {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem('cache_consent');
    return consent === 'true';
  },

  /**
   * Get current cache consent status
   */
  getCacheConsentStatus: (): 'accepted' | 'rejected' | 'unknown' => {
    if (typeof window === 'undefined') return 'unknown';
    const consent = localStorage.getItem('cache_consent');
    if (consent === 'true') return 'accepted';
    if (consent === 'false') return 'rejected';
    return 'unknown';
  },

  /**
   * Set cache consent preference
   */
  setCacheConsent: (accepted: boolean): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cache_consent', accepted ? 'true' : 'false');
    
    if (accepted && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    } else if (!accepted && 'serviceWorker' in navigator) {
      // Unregister Service Worker if consent is rejected
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  },

  /**
   * Clear all browser cache
   */
  clearAllCache: async (): Promise<void> => {
    if (typeof window === 'undefined') return;

    // Clear Service Worker cache
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }

    // Clear localStorage
    localStorage.removeItem('cache_consent');

    // Unregister Service Worker
    if ('serviceWorker' in navigator) {
      const registrations =
        await navigator.serviceWorker.getRegistrations();
      registrations.forEach((registration) => {
        registration.unregister();
      });
    }
  },

  /**
   * Get cache size information
   */
  getCacheSize: async (): Promise<number> => {
    if (typeof window === 'undefined' || !('storage' in navigator)) {
      return 0;
    }

    try {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    } catch {
      return 0;
    }
  },

  /**
   * Request persistent storage permission
   */
  requestPersistentStorage: async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('storage' in navigator)) {
      return false;
    }

    try {
      const isPersistent = await navigator.storage.persist();
      return isPersistent;
    } catch {
      return false;
    }
  },
};

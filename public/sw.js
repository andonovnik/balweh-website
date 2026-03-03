// Service Worker for caching static assets
const CACHE_NAME = "balweh-cache-v1";
const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];

// Track cache consent status (defaults to false for safety)
let cacheConsentGiven = false;

// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_CONSENT_UPDATE") {
    cacheConsentGiven = event.data.consent === true;
    console.log("Service Worker: Cache consent updated to", cacheConsentGiven);

    // If consent is revoked, clear all caches immediately
    if (!cacheConsentGiven) {
      event.waitUntil(
        caches
          .keys()
          .then((cacheNames) => {
            return Promise.all(
              cacheNames.map((cacheName) => caches.delete(cacheName)),
            );
          })
          .then(() => {
            console.log(
              "Service Worker: All caches cleared due to consent revocation",
            );
          }),
      );
    }
  }
});

// Install Service Worker and cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.log("Cache addAll error:", error);
        // Continue even if some assets fail to cache
      });
    }),
  );
  self.skipWaiting();
});

// Activate Service Worker and clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Don't cache anything if consent is not given
  if (!cacheConsentGiven) {
    // Just pass through to network without caching
    event.respondWith(fetch(request));
    return;
  }

  // Cache-first strategy for static assets (images, fonts, css, js)
  if (
    request.destination === "image" ||
    request.destination === "font" ||
    request.destination === "style" ||
    request.destination === "script"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (
              !response ||
              response.status !== 200 ||
              response.type === "error"
            ) {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            // Return offline fallback if needed
            return new Response("Offline");
          });
      }),
    );
  }

  // Network-first strategy for HTML pages and API calls
  if (request.destination === "document" || request.destination === "") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || new Response("Offline");
          });
        }),
    );
  }
});

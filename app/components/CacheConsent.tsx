"use client";

import { useEffect, useState } from "react";

export default function CacheConsent() {
  const [showConsent, setShowConsent] = useState(false);

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered");
          // Send consent status to the Service Worker
          if (registration.active) {
            registration.active.postMessage({
              type: "CACHE_CONSENT_UPDATE",
              consent: true,
            });
          }
          // Also listen for when it becomes active
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker?.addEventListener("statechange", () => {
              if (newWorker.state === "activated") {
                newWorker.postMessage({
                  type: "CACHE_CONSENT_UPDATE",
                  consent: true,
                });
              }
            });
          });
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }

  function notifyServiceWorkerConsentRevoked() {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CACHE_CONSENT_UPDATE",
        consent: false,
      });
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const consentGiven = localStorage.getItem("cache_consent");
      if (!consentGiven) {
        setShowConsent(true);
      } else if (consentGiven === "true") {
        registerServiceWorker();
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cache_consent", "true");
    setShowConsent(false);
    registerServiceWorker();
  };

  const handleReject = async () => {
    localStorage.setItem("cache_consent", "false");
    setShowConsent(false);

    // Notify Service Worker to stop caching
    notifyServiceWorkerConsentRevoked();

    // Clear any existing cache
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName)),
      );
    }

    // Unregister any active service workers
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map((registration) => registration.unregister()),
      );
    }
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">
              Speicherung von Inhalten
            </h3>
            <p className="text-sm text-gray-300 mb-4 md:mb-0">
              Wir verwenden Browser-Caching, um Ihre Website-Erfahrung zu
              verbessern und Seiten schneller zu laden. Dies speichert{" "}
              <strong>keine persönlichen Daten</strong>, sondern nur Ressourcen
              wie Bilder, Stylesheets und Skripte lokal auf Ihrem Gerät.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border border-gray-500"
            >
              Ablehnen
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border border-gray-500"
            >
              Akzeptieren
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Weitere Informationen finden Sie in unserer{" "}
          <a href="/datenschutz" className="underline hover:text-gray-200">
            Datenschutzrichtlinie
          </a>
          .
        </p>
      </div>
    </div>
  );
}

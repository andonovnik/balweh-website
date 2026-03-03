"use client";

import { useEffect, useState } from "react";

export default function CachePreferences() {
  const [showPreferences, setShowPreferences] = useState(false);
  const [cacheConsent, setCacheConsent] = useState<
    "accepted" | "rejected" | "unknown"
  >("unknown");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const consent = localStorage.getItem("cache_consent");
      if (consent === "true") {
        setCacheConsent("accepted");
      } else if (consent === "false") {
        setCacheConsent("rejected");
      } else {
        setCacheConsent("unknown");
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Re-check consent status whenever modal opens
  useEffect(() => {
    if (showPreferences) {
      const timeoutId = window.setTimeout(() => {
        const consent = localStorage.getItem("cache_consent");
        if (consent === "true") {
          setCacheConsent("accepted");
        } else if (consent === "false") {
          setCacheConsent("rejected");
        } else {
          setCacheConsent("unknown");
        }
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, [showPreferences]);

  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered from preferences");
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
  };

  const notifyServiceWorkerConsentRevoked = () => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CACHE_CONSENT_UPDATE",
        consent: false,
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem("cache_consent", "true");
    setCacheConsent("accepted");
    registerServiceWorker();
  };

  const handleReject = async () => {
    localStorage.setItem("cache_consent", "false");
    setCacheConsent("rejected");

    // Notify Service Worker to stop caching
    notifyServiceWorkerConsentRevoked();

    // Clear Service Worker cache
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName)),
      );
    }

    // Unregister Service Worker
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map((registration) => registration.unregister()),
      );
    }
  };

  const handleClearCache = async () => {
    try {
      let cleared = false;

      // Clear Service Worker cache
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        console.log("Clearing caches:", cacheNames);
        await Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName)),
        );
        if (cacheNames.length > 0) cleared = true;
      }

      // Unregister Service Worker
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        console.log("Unregistering service workers:", registrations.length);
        await Promise.all(
          registrations.map((registration) => registration.unregister()),
        );
        if (registrations.length > 0) cleared = true;
      }

      // Clear the consent so popup shows again
      localStorage.removeItem("cache_consent");

      if (cleared) {
        alert(
          "Cache wurde vollständig gelöscht. Die Seite wird neu geladen...",
        );
        // Force reload from server, bypassing cache
        window.location.reload();
      } else {
        alert("Kein Cache gefunden zum Löschen.");
      }
    } catch (error) {
      console.error("Error clearing cache:", error);
      alert("Fehler beim Löschen des Caches: " + error);
    }
  };

  return (
    <>
      {/* Floating button to open preferences */}
      <button
        onClick={() => setShowPreferences(!showPreferences)}
        className="fixed bottom-4 right-4 z-40 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-lg transition-colors"
        title="Cache-Einstellungen"
        aria-label="Cache-Einstellungen"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 text-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cache-Einstellungen</h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-4">
                Mit Browser-Caching werden Inhalte lokal gespeichert, um Seiten
                schneller zu laden.
                <strong> Keine persönlichen Daten werden gespeichert.</strong>
              </p>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-200">
                  Status:{" "}
                  <span
                    className={
                      cacheConsent === "accepted"
                        ? "text-green-400"
                        : cacheConsent === "rejected"
                          ? "text-red-400"
                          : "text-gray-300"
                    }
                  >
                    {cacheConsent === "accepted"
                      ? "Akzeptiert"
                      : cacheConsent === "rejected"
                        ? "Abgelehnt"
                        : "Nicht ausgewählt"}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {cacheConsent !== "accepted" && (
                <button
                  onClick={handleAccept}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm font-medium transition-colors border border-gray-500"
                >
                  Cache akzeptieren
                </button>
              )}

              {cacheConsent !== "rejected" && (
                <button
                  onClick={handleReject}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm font-medium transition-colors border border-gray-500"
                >
                  Cache ablehnen
                </button>
              )}

              {cacheConsent === "accepted" && (
                <button
                  onClick={handleClearCache}
                  className="w-full px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Cache löschen
                </button>
              )}
            </div>

            <p className="text-xs text-gray-400">
              Weitere Informationen finden Sie in unserer{" "}
              <a href="/datenschutz" className="underline hover:text-gray-200">
                Datenschutzrichtlinie
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}

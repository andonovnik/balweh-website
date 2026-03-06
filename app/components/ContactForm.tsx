"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "gebaeudereinigung",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState<string>("");

  // Validation helper for email - stricter than HTML5
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation helper for phone
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9\s\+\-\(\)]{5,30}$/;
    return phoneRegex.test(phone);
  };

  // Client-side form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name ist erforderlich";
    } else if (formData.name.length > 100) {
      errors.name = "Name ist zu lang (max. 100 Zeichen)";
    }

    if (!formData.email.trim()) {
      errors.email = "E-Mail ist erforderlich";
    } else if (!validateEmail(formData.email)) {
      errors.email =
        "Bitte geben Sie eine gültige E-Mail-Adresse ein (z.B. name@beispiel.de)";
    } else if (formData.email.length > 255) {
      errors.email = "E-Mail ist zu lang (max. 255 Zeichen)";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Telefonnummer ist erforderlich";
    } else if (!validatePhone(formData.phone)) {
      errors.phone =
        "Telefonnummer ungültig (mindestens 5 Zeichen, nur Ziffern und +, -, (), Leerzeichen)";
    } else if (formData.phone.length > 30) {
      errors.phone = "Telefonnummer ist zu lang (max. 30 Zeichen)";
    }

    if (!formData.service) {
      errors.service = "Bitte wählen Sie eine Dienstleistung";
    }

    if (!formData.message.trim()) {
      errors.message = "Nachricht ist erforderlich";
    } else if (formData.message.length > 5000) {
      errors.message = "Nachricht ist zu lang (max. 5000 Zeichen)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fetch CSRF token on component mount and ensure valid session
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf-token.php", {
          credentials: "include",
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setCsrfToken(data.csrf_token);
        }
      } catch (error) {
        // CSRF token fetch failed, will be retried on form submission
      }
    };

    fetchCsrfToken();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field when user starts typing
    if (formErrors[e.target.name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form on client side first
    if (!validateForm()) {
      setStatus("error");
      setMessage("Bitte füllen Sie alle Felder korrekt aus.");
      return;
    }

    setStatus("loading");

    // Ensure CSRF token is available, fetch it if empty
    let tokenToUse = csrfToken;
    if (!tokenToUse) {
      try {
        const response = await fetch("/api/csrf-token.php", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await response.json();
        tokenToUse = data.csrf_token;
        setCsrfToken(tokenToUse);
      } catch (error) {
        setStatus("error");
        setMessage(
          "Es gab einen Fehler beim Versenden Ihrer Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
        );
        return;
      }
    }

    try {
      const body = new URLSearchParams(formData);

      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRF-Token": tokenToUse,
        },
        credentials: "include",
        body: body,
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Vielen Dank! Ihre Anfrage wurde erfolgreich versendet. Wir werden uns schnellstmöglich bei Ihnen melden.",
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "gebaeudereinigung",
          message: "",
        });
        setFormErrors({});
      } else if (response.status === 403) {
        // Token expired, try refreshing it once
        try {
          const tokenResponse = await fetch("/api/csrf-token.php", {
            credentials: "include",
            cache: "no-store",
          });
          const tokenData = await tokenResponse.json();
          const newToken = tokenData.csrf_token;
          setCsrfToken(newToken);

          // Retry the submission with new token
          const retryBody = new URLSearchParams(formData);
          const retryResponse = await fetch("/api/contact.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-CSRF-Token": newToken,
            },
            credentials: "include",
            body: retryBody,
          });

          const retryData = await retryResponse.json();
          if (retryResponse.ok) {
            setStatus("success");
            setMessage(
              "Vielen Dank! Ihre Anfrage wurde erfolgreich versendet. Wir werden uns schnellstmöglich bei Ihnen melden.",
            );
            setFormData({
              name: "",
              email: "",
              phone: "",
              service: "gebaeudereinigung",
              message: "",
            });
            setFormErrors({});
          } else {
            setStatus("error");
            setMessage(
              retryData.error ||
                "Es gab einen Fehler beim Versenden Ihrer Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
            );
          }
        } catch {
          setStatus("error");
          setMessage(
            "Es gab einen Fehler beim Versenden Ihrer Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
          );
        }
      } else {
        setStatus("error");
        setMessage(
          responseData.error ||
            "Es gab einen Fehler beim Versenden Ihrer Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("error");
      setMessage(
        "Es gab einen Fehler beim Versenden Ihrer Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
      );
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
            Schreiben Sie uns eine Nachricht
          </h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Füllen Sie das Formular aus und wir werden uns schnellstmöglich bei
            Ihnen melden. Alle Felder sind erforderlich.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-900"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`mt-2 w-full rounded-lg border px-4 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                formErrors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-300 focus:border-brand-primary focus:ring-brand-primary"
              }`}
              placeholder="Ihr Name"
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-900"
            >
              E-Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-2 w-full rounded-lg border px-4 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                formErrors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-300 focus:border-brand-primary focus:ring-brand-primary"
              }`}
              placeholder="name@beispiel.de"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-zinc-900"
            >
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`mt-2 w-full rounded-lg border px-4 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                formErrors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-300 focus:border-brand-primary focus:ring-brand-primary"
              }`}
              placeholder="+49 123 456789"
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="service"
              className="block text-sm font-medium text-zinc-900"
            >
              Dienstleistung *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`mt-2 w-full rounded-lg border px-4 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                formErrors.service
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-300 focus:border-brand-primary focus:ring-brand-primary"
              }`}
            >
              <option value="gebaeudereinigung">Gebäudereinigung</option>
              <option value="galabau">Garten- &amp; Landschaftsbau</option>
              <option value="beide">Beide Dienstleistungen</option>
            </select>
            {formErrors.service && (
              <p className="mt-1 text-sm text-red-600">{formErrors.service}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-900"
            >
              Nachricht *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className={`mt-2 w-full rounded-lg border px-4 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                formErrors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-300 focus:border-brand-primary focus:ring-brand-primary"
              }`}
              placeholder="Beschreiben Sie Ihr Anliegen..."
            />
            {formErrors.message && (
              <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
            )}
          </div>

          {message && (
            <div
              className={`rounded-lg p-4 text-sm ${
                status === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-brand-primary py-3 font-medium text-white transition-colors hover:bg-opacity-90 disabled:opacity-50"
          >
            {status === "loading" ? "Wird versendet..." : "Anfrage versenden"}
          </button>

          <p className="text-xs leading-6 text-zinc-600">
            Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur
            Bearbeitung Ihrer Anfrage zu. Weitere Informationen finden Sie in
            unserer{" "}
            <Link
              href="/datenschutz"
              className="font-medium text-blue-600 hover:underline"
            >
              Datenschutzerklaerung
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}

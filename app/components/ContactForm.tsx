"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "gebaeudereinigung",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

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
      } else {
        setStatus("error");
        setMessage(
          "Es gab einen Fehler beim Versenden Ihrer Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
        );
      }
    } catch {
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
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-0"
              placeholder="Ihr Name"
            />
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
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-0"
              placeholder="name@beispiel.de"
            />
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
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-0"
              placeholder="+49 123 456789"
            />
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
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-0"
            >
              <option value="gebaeudereinigung">Gebäudereinigung</option>
              <option value="galabau">Garten- & Landschaftsbau</option>
              <option value="beide">Beide Dienstleistungen</option>
            </select>
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
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-0"
              placeholder="Beschreiben Sie Ihr Anliegen..."
            />
          </div>

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

          {status === "success" && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
              {message}
            </div>
          )}

          {status === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

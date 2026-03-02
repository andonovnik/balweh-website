import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Balweh GmbH. Alle Rechte vorbehalten.
        </p>
        <nav className="flex items-center gap-4">
          <Link href="/impressum" className="hover:text-zinc-900">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-zinc-900">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}

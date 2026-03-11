import Link from "next/link";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbNavProps = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1 || !item.href;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isCurrentPage ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-primary hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isCurrentPage ? "font-medium text-zinc-700" : undefined}
                  aria-current={isCurrentPage ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
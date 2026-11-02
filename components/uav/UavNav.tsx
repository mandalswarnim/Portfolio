"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/uav", label: "Overview" },
  { href: "/uav/armory", label: "Armory" },
  { href: "/uav/mission", label: "Mission" },
  { href: "/uav/diagnostics", label: "Diagnostics" },
  { href: "/uav/lab", label: "Model Lab" },
];

export default function UavNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-charcoal/10 bg-background">
      <nav className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-6 py-2.5">
        {links.map((l) => {
          const active = l.href === "/uav" ? pathname === "/uav" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                active ? "bg-charcoal text-white" : "text-muted hover:bg-charcoal/5 hover:text-charcoal"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

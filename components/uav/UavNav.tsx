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
    <div className="border-b border-divider bg-background">
      <nav className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6">
        {links.map((l) => {
          const active = l.href === "/uav" ? pathname === "/uav" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap border-b-2 py-3 text-sm transition-colors ${
                active
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
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

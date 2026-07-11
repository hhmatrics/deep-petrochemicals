"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { MAIN_NAV, type NavItem } from "@/data/nav";

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  const linkCls = `text-sm font-medium transition-colors ${
    active ? "text-brand-600" : "text-ink-700 hover:text-brand-600"
  }`;

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkCls}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1 ${linkCls}`}
      >
        {item.label}
        <ChevronDown className="transition-transform group-hover:rotate-180" />
      </Link>
      {/* Dropdown: shows on hover and keyboard focus-within */}
      <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="w-72 overflow-hidden rounded-xl border border-ink-200 bg-paper p-2 shadow-lg shadow-ink-900/5">
          {item.children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-50"
            >
              <span className="block text-sm font-semibold text-ink-900">
                {c.label}
              </span>
              {c.desc ? (
                <span className="mt-0.5 block text-xs leading-snug text-ink-500">
                  {c.desc}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Close the mobile menu when any link inside it is activated (event delegation
  // — avoids a route-change effect that would trip react-hooks/set-state-in-effect).
  const closeOnLink = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? "border-b border-ink-200 shadow-sm" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {MAIN_NAV.map((item) => (
              <DesktopItem key={item.href} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/request-a-quote" size="md">
            Request a Quote
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink-800 hover:bg-ink-100 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen ? (
        <nav
          aria-label="Mobile"
          className="border-t border-ink-200 bg-paper lg:hidden"
          onClick={closeOnLink}
        >
          <ul className="container-page flex flex-col py-3">
            {MAIN_NAV.map((item) => (
              <li key={item.href} className="border-b border-ink-100 last:border-0">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-ink-800"
                      aria-expanded={!!openGroups[item.href]}
                      onClick={() =>
                        setOpenGroups((g) => ({ ...g, [item.href]: !g[item.href] }))
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`transition-transform ${openGroups[item.href] ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openGroups[item.href] ? (
                      <ul className="pb-2 pl-4">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="block py-2 text-sm text-ink-600 hover:text-brand-600"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium text-ink-800 hover:text-brand-600"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="container-page pb-4">
            <Button href="/request-a-quote" size="lg" className="w-full">
              Request a Quote
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

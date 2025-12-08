"use client";
import Link from "next/link";
import { useState } from "react";

type NavLink = { href: string; label: string };

export default function HeaderNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-semibold">
          News
        </Link>
        <button
          aria-label="Toggle Menu"
          className="sm:hidden rounded p-2 focus:outline-none focus:ring"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <nav className="hidden sm:flex gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      {open && (
        <nav className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 px-4 py-2">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="py-1">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}


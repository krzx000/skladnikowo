"use client";
import { SunMoon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlipLink } from "../components/FlipLink";
import { Icon } from "../components/Icon";

const NavItem = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        replace
        className={`text-primary text-sm ${
          isActive ? "font-bold" : "font-medium"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        <FlipLink>{label}</FlipLink>
      </Link>
    </li>
  );
};

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[100000]">
      <nav
        className="flex flex-col items-center w-full border-b bg-orange/5 border-orange/20 backdrop-blur-xl"
        aria-label="Nawigacja główna"
      >
        <div className="flex items-center justify-between w-full max-w-5xl py-4">
          {/* Logo */}
          <Link href="/" aria-label="Strona główna Składnikowo">
            <Image
              src="/logo.svg"
              alt="Logo Składnikowo"
              width={220}
              height={40}
              priority
            />
          </Link>

          {/* Menu nawigacyjne */}
          <ul className="flex items-center gap-8" role="list">
            <NavItem href="/" label="Analiza" />
            <NavItem href="/jak-to-dziala" label="Jak to działa" />
            <NavItem href="/faq" label="FAQ" />
            <NavItem href="/kontakt" label="Kontakt" />
          </ul>

          {/* Przycisk motywu */}
          <Icon
            type="button"
            className="p-2 transition-colors rounded-full bg-orange/25 hover:bg-orange/35"
            onClick={() => console.log("Toggle theme")}
          >
            <SunMoon
              className="text-secondary/75"
              strokeWidth={1.75}
              aria-label="Przełącz motyw"
            />
          </Icon>
        </div>
      </nav>
    </header>
  );
};

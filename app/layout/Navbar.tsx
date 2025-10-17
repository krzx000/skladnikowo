"use client";
import { SunMoon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlipLink } from "../components/FlipLink";

const NavItem = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  return (
    <Link href={href} replace>
      <div
        className={`justify-center text-primary text-sm leading-tight ${
          pathname === href ? "font-bold" : "font-medium"
        }`}
      >
        <FlipLink>{label}</FlipLink>
      </div>
    </Link>
  );
};

export const Navbar = () => {
  return (
    <header className="fixed w-full">
      <nav className="inline-flex flex-col items-center self-stretch justify-center w-full border-b bg-orange/5 border-orange/20 backdrop-blur-sm">
        <div className="inline-flex items-center justify-between w-full max-w-5xl py-4">
          <div className="flex items-center justify-start gap-3">
            <Link href={"/"}>
              <Image src={"/logo.svg"} alt="Logo" width={220} height={40} />
            </Link>
          </div>
          <div className="flex items-center justify-start gap-8">
            <ul className="flex items-center justify-start gap-8">
              <li>
                <NavItem href="/analiza" label="Analiza" />
              </li>
              <li>
                <NavItem href="/dzialanie" label="Jak to działa" />
              </li>
              <li>
                <NavItem href="/faq" label="FAQ" />
              </li>
              <li>
                <NavItem href="/kontakt" label="Kontakt" />
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <button className="p-2 transition-all rounded-full cursor-pointer bg-orange/25 hover:bg-orange/35 hover:scale-105 active:scale-95">
              <SunMoon className="text-secondary/75" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

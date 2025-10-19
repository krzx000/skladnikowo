"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, SunMoon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "../components/Icon";

const NavItem = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        replace
        className={`text-primary text-md md:text-sm transition hover:text-primary/85 ${
          isActive ? "font-bold" : "font-medium"
        }`}
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[100000]">
      <nav
        className="flex flex-col items-center w-full border-b bg-white/85 border-orange/25 backdrop-blur-2xl"
        aria-label="Nawigacja główna"
      >
        <div className="flex items-center justify-between w-full max-w-5xl px-4 py-3">
          {/* Logo */}
          <Link href="/" aria-label="Strona główna Składnikowo">
            <Image
              src="/logo.svg"
              alt="Logo Składnikowo"
              width={300}
              height={40}
              priority
              className="w-[200px] h-auto sm:w-[250px] md:w-[300px]"
            />
          </Link>

          {/* Menu nawigacyjne - Desktop */}
          <ul
            className="items-center hidden gap-6 md:flex lg:gap-8"
            role="list"
          >
            <NavItem href="/" label="Analiza" />
            <NavItem href="/jak-to-dziala" label="Jak to działa" />
            <NavItem href="/faq" label="FAQ" />
            <NavItem href="/kontakt" label="Kontakt" />
          </ul>

          {/* Przyciski po prawej */}
          <div className="flex items-center gap-2">
            {/* Przycisk motywu */}
            <Icon
              type="button"
              className="p-1.5 sm:p-2 transition-colors rounded-full bg-orange/25 hover:bg-orange/35 max-md:hidden"
              onClick={() => console.log("Toggle theme")}
              ariaLabel="Przełącz motyw"
            >
              <SunMoon
                className="w-5 h-5 text-secondary/75 sm:w-6 sm:h-6"
                strokeWidth={1.75}
              />
            </Icon>

            {/* Przycisk hamburger - Mobile */}
            <Icon
              type="button"
              className="p-1.5 transition-colors rounded-full md:hidden bg-orange/25 hover:bg-orange/35"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              ariaLabel={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {isMobileMenuOpen ? (
                <X className="text-secondary/75" strokeWidth={1.75} />
              ) : (
                <Menu className="text-secondary/75" strokeWidth={1.75} />
              )}
            </Icon>
          </div>
        </div>

        {/* Menu mobilne */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="w-full overflow-hidden border-t md:hidden border-orange/20 bg-white/10"
            >
              <motion.ul
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center justify-center w-full max-w-5xl gap-4 px-4 py-4"
                role="list"
              >
                <NavItem href="/" label="Analiza" onClick={closeMobileMenu} />
                <NavItem
                  href="/jak-to-dziala"
                  label="Jak to działa"
                  onClick={closeMobileMenu}
                />
                <NavItem href="/faq" label="FAQ" onClick={closeMobileMenu} />
                <NavItem
                  href="/kontakt"
                  label="Kontakt"
                  onClick={closeMobileMenu}
                />
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

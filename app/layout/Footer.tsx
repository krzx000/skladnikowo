import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li key={href}>
    <Link
      href={href}
      className="text-sm font-medium transition-colors text-primary hover:text-secondary"
    >
      {children}
    </Link>
  </li>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center w-full px-4 py-6 border-t sm:px-6 sm:py-8 bg-orange/10 border-orange/20 backdrop-blur-sm">
      <div className="flex flex-col items-center w-full max-w-5xl gap-4 sm:gap-6">
        {/* Logo i nazwa */}
        <div className="flex flex-col items-center gap-2">
          <Link href="/" aria-label="Strona główna Składnikowo">
            <Image
              src="/logo-min.svg"
              alt="Logo Składnikowo"
              width={80}
              height={64}
              className="w-16 h-auto grayscale-100 sm:w-20"
            />
          </Link>
        </div>

        {/* Copyright i nawigacja */}
        <nav
          className="flex flex-col items-center self-stretch gap-4 md:flex-row md:justify-between"
          aria-label="Stopka"
        >
          <p className="text-xs text-center sm:text-sm text-secondary sm:text-left">
            © {currentYear} Składnikowo. Wszelkie prawa zastrzeżone.
          </p>
          <ul className="flex items-center gap-4">
            <FooterLink href="/polityka-prywatnosci">
              Polityka prywatności
            </FooterLink>
            <FooterLink href="/kontakt">Kontakt</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </ul>
        </nav>

        {/* Credits */}
        <address className="flex items-center gap-1 not-italic">
          <span className="text-xs text-secondary">Made with</span>
          <Heart fill="#F56565" color="#F56565" size={14} aria-hidden="true" />
          <span className="text-xs text-secondary">
            by{" "}
            <a
              href="https://krzx.top"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-primary"
            >
              krzx.top
            </a>
          </span>
        </address>
      </div>
    </footer>
  );
};

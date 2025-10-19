"use client";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";

export default function Home() {
  return (
    <div className="flex flex-col justify-center w-full gap-32">
      {/* Hero section */}
      <HeroSection />

      {/* How it works */}
      <HowItWorksSection />
    </div>
  );
}

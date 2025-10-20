"use client";
import { useState } from "react";
import { Picker } from "../components/Picker";
import { AnalyzeInput } from "../components/AnalyzeInput";
import { AnalyzeResult } from "../components/AnalyzeResult";
import { AnalysisResultData } from "@/lib/types";
import { Clock3, PawPrint, ShieldCheck } from "lucide-react";
import { Icon } from "../components/Icon";

const Feature = ({
  icon: IconComponent,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
}) => (
  <div className="flex items-center gap-4">
    <Icon className="bg-orange/20" ariaLabel={title}>
      <IconComponent className="text-secondary/75" strokeWidth={1.75} />
    </Icon>
    <div className="flex flex-col items-start">
      <h3 className="text-base font-bold text-primary">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  </div>
);

export const HeroSection = () => {
  const [selectedValue, setSelectedValue] = useState("humans");
  const [result, setResult] = useState<AnalysisResultData | null>(null);

  const features = [
    {
      icon: ShieldCheck,
      title: "Niezawodne i szybkie",
      description: "Dokładne wyniki w zaledwie kilka minut.",
    },
    {
      icon: Clock3,
      title: "Oszczędza Twój czas",
      description: "Wszystkie informacje w jednym miejscu.",
    },
    {
      icon: PawPrint,
      title: "Dla ludzi i zwierząt",
      description: "Pełna analiza bez ograniczeń.",
    },
  ];

  return (
    <section
      className="flex flex-col items-center gap-4"
      aria-labelledby="hero-heading"
    >
      {/* Nagłówek */}
      <div className="flex flex-col items-center w-full max-w-2xl">
        <h1
          id="hero-heading"
          className="text-6xl font-extrabold text-center text-primary"
        >
          Wiesz, co jesz.
        </h1>
      </div>

      {/* Opis */}
      <div className="flex flex-col items-center w-full max-w-2xl">
        <p className="text-lg text-center text-secondary">
          Uzyskaj{" "}
          <strong className="font-medium">szczegółową analizę AI</strong> o
          składnikach swojego jedzenia lub karmy dla pupila. Podejmuj świadome
          decyzje dla zdrowszego życia.
        </p>
      </div>

      {/* Formularz */}
      <div className="flex flex-col items-center w-full gap-4">
        <Picker
          onSelect={setSelectedValue}
          selectedValue={selectedValue}
          items={[
            { label: "Żywność dla ludzi", value: "humans" },
            { label: "Karma dla zwierząt", value: "animals" },
          ]}
        />

        <div className="w-full max-w-2xl">
          <AnalyzeInput onResultChange={setResult} />
        </div>

        {result && (
          <div className="w-full">
            <AnalyzeResult result={result} />
          </div>
        )}
        {/* Funkcje */}
        <div
          className="flex items-center justify-between w-full gap-4 mt-4 max-md:flex-wrap max-md:justify-center max-sm:justify-start"
          role="list"
        >
          {features.map((feature) => (
            <div key={feature.title} role="listitem">
              <Feature
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

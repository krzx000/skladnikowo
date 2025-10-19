"use client";
import { useState } from "react";
import { Picker } from "./components/Picker";
import { AnalyzeInput } from "./components/AnalyzeInput";
import { Icon } from "./components/Icon";
import { Clock3, PawPrint, ShieldCheck } from "lucide-react";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("humans");

  return (
    <div className="flex flex-col justify-center w-full gap-32">
      {/* Hero section */}
      <section className="inline-flex flex-col items-center justify-start gap-4">
        <div className="flex flex-col items-center justify-start w-full max-w-2xl">
          <div className="justify-center text-6xl font-extrabold text-center text-primary">
            Wiesz, co jesz.
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full max-w-2xl">
          <div className="justify-center text-center">
            <span className="text-lg font-normal leading-7 text-secondary">
              Uzyskaj{" "}
            </span>
            <span className="text-lg font-medium leading-7 text-secondary">
              szczegółową analizę AI
            </span>
            <span className="text-lg font-normal leading-7 text-secondary">
              {" "}
              o składnikach swojego jedzenia lub karmy dla pupila. Podejmuj
              świadome decyzje dla zdrowszego życia.
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-4">
          <div>
            <Picker
              onSelect={(value) => setSelectedValue(value)}
              selectedValue={selectedValue}
              items={[
                { label: "Żywność dla ludzi", value: "humans" },
                { label: "Karma dla zwierząt", value: "animals" },
              ]}
            />
          </div>
          <div className="w-full max-w-2xl">
            <AnalyzeInput />
          </div>
          <div className="inline-flex items-center justify-between w-full mt-4">
            <div className="flex items-center justify-start gap-4">
              <Icon className="bg-orange/25 hover:bg-orange/35">
                <ShieldCheck className="text-secondary/75" strokeWidth={1.75} />
              </Icon>
              <div className="inline-flex flex-col items-start justify-start">
                <div className="justify-center text-base font-bold leading-normal text-primary">
                  Niezawodne i szybkie
                </div>
                <div className="justify-center text-sm font-normal leading-tight text-secondary">
                  Dokładne wyniki w zaledwie kilka minut.
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <Icon className="bg-orange/25 hover:bg-orange/35">
                <Clock3 className="text-secondary/75" strokeWidth={1.75} />
              </Icon>
              <div className="inline-flex flex-col items-start justify-start">
                <div className="justify-center text-base font-bold leading-normal text-primary">
                  Oszczędza Twój czas
                </div>
                <div className="justify-center text-sm font-normal leading-tight text-secondary">
                  Wszystkie informacje w jednym miejscu.
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <Icon className="bg-orange/25 hover:bg-orange/35">
                <PawPrint className="text-secondary/75" strokeWidth={1.75} />
              </Icon>
              <div className="inline-flex flex-col items-start justify-start">
                <div className="justify-center text-base font-bold leading-normal text-primary">
                  Dla ludzi i zwierząt
                </div>
                <div className="justify-center text-sm font-normal leading-tight text-secondary">
                  Pełna analiza bez ograniczeń.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How it works */}
      <section className="inline-flex flex-col items-center justify-start gap-4">
        <div className="flex flex-col items-center justify-start w-full max-w-2xl">
          <div className="justify-center text-3xl font-extrabold text-center text-primary">
            Jak to działa?
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full max-w-2xl">
          <div className="justify-center text-center">
            <span className="text-lg font-normal leading-7 text-secondary">
              Nasz prosty, trzystopniowy proces sprawia, że zrozumienie składu
              Twojego jedzenia i karmy dla pupila staje się wyjątkowo łatwe.
            </span>
          </div>
        </div>
        <div className="justify-start w-full gap-4 flexitems-center">
          <div className="inline-flex items-center justify-between w-full gap-4 mt-4">
            <div className="inline-flex flex-col items-center self-stretch justify-start w-full gap-4 p-8 bg-white rounded-4xl">
              <Icon className="bg-orange/25 aspect-square">
                <span className="text-xl font-bold text-secondary/75">1</span>
              </Icon>
              <div className="flex flex-col items-start self-stretch justify-start gap-2">
                <div className="flex flex-col items-center self-stretch justify-start">
                  <div className="justify-center text-lg font-bold text-center text-primary">
                    Wybierz i wprowadź
                  </div>
                </div>
                <div className="flex flex-col items-center self-stretch justify-start">
                  <div className="self-stretch justify-center text-sm font-normal text-center text-secondary ">
                    Wybierz typ analizy i wpisz składniki z etykiety produktu.
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col items-center self-stretch justify-start w-full gap-4 p-8 bg-white rounded-4xl">
              <Icon className="bg-orange/25 aspect-square">
                <span className="text-xl font-bold text-secondary/75">2</span>
              </Icon>
              <div className="flex flex-col items-start self-stretch justify-start gap-2">
                <div className="flex flex-col items-center self-stretch justify-start">
                  <div className="justify-center text-lg font-bold text-center text-primary">
                    Otrzymaj analizę
                  </div>
                </div>
                <div className="flex flex-col items-center self-stretch justify-start">
                  <div className="self-stretch justify-center text-sm font-normal text-center text-secondary ">
                    Otrzymaj szczegółowy raport o wartości odżywczej,
                    korzyściach i potencjalnych ryzykach.
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col items-center self-stretch justify-start w-full gap-4 p-8 bg-white rounded-4xl">
              <Icon className="bg-orange/25 aspect-square">
                <span className="text-xl font-bold text-secondary/75">3</span>
              </Icon>
              <div className="flex flex-col items-start self-stretch justify-start gap-2">
                <div className="flex flex-col items-center self-stretch justify-start">
                  <div className="justify-center text-lg font-bold text-center text-primary">
                    Podejmuj świadome decyzje
                  </div>
                </div>
                <div className="flex flex-col items-center self-stretch justify-start">
                  <div className="self-stretch justify-center text-sm font-normal text-center text-secondary ">
                    Zadbaj o zdrowie swoje i swojego pupila dzięki analizie
                    opartej na danych.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

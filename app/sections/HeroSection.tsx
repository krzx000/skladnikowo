import { useState } from "react";
import { Picker } from "../components/Picker";
import { AnalyzeInput } from "../components/AnalyzeInput";
import { Clock3, PawPrint, ShieldCheck } from "lucide-react";
import { Icon } from "../components/Icon";

export const HeroSection = () => {
  const [selectedValue, setSelectedValue] = useState("humans");

  return (
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
        <div className="inline-flex items-center justify-between w-full gap-4 mt-4">
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
  );
};

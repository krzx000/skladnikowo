import { Icon } from "../components/Icon";

export const HowItWorksSection = () => {
  return (
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
                  Otrzymaj szczegółowy raport o wartości odżywczej, korzyściach
                  i potencjalnych ryzykach.
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
  );
};

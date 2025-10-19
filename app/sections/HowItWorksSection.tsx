import { Icon } from "../components/Icon";

const Step = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => (
  <article className="flex flex-col items-center self-stretch w-full gap-4 p-8 bg-white rounded-4xl">
    <Icon className="bg-orange/25 aspect-square" ariaLabel={`Krok ${number}`}>
      <span
        className="flex items-center justify-center w-6 h-6 text-xl font-semibold aspect-square text-secondary/75"
        aria-hidden="true"
      >
        {number}
      </span>
    </Icon>
    <div className="flex flex-col items-center self-stretch gap-2">
      <h3 className="text-lg font-bold text-center text-primary">{title}</h3>
      <p className="text-sm text-center text-secondary">{description}</p>
    </div>
  </article>
);

export const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Wybierz i wprowadź",
      description: "Wybierz typ analizy i wpisz składniki z etykiety produktu.",
    },
    {
      number: 2,
      title: "Otrzymaj analizę",
      description:
        "Otrzymaj szczegółowy raport o wartości odżywczej, korzyściach i potencjalnych ryzykach.",
    },
    {
      number: 3,
      title: "Podejmuj świadome decyzje",
      description:
        "Zadbaj o zdrowie swoje i swojego pupila dzięki analizie opartej na danych.",
    },
  ];

  return (
    <section
      className="flex flex-col items-center gap-4"
      aria-labelledby="how-it-works-heading"
    >
      {/* Nagłówek sekcji */}
      <div className="flex flex-col items-center w-full max-w-2xl">
        <h2
          id="how-it-works-heading"
          className="text-3xl font-extrabold text-center text-primary"
        >
          Jak to działa?
        </h2>
      </div>

      {/* Opis */}
      <div className="flex flex-col items-center w-full max-w-2xl">
        <p className="text-lg text-center text-secondary">
          Nasz prosty, trzystopniowy proces sprawia, że zrozumienie składu
          Twojego jedzenia i karmy dla pupila staje się wyjątkowo łatwe.
        </p>
      </div>

      {/* Kroki procesu */}
      <div className="flex items-stretch justify-between w-full gap-4 mt-4 max-md:flex-col">
        {steps.map((step) => (
          <Step
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
};

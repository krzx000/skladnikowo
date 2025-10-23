import { AnalysisResultData2 } from "@/lib/types";
import { Calendar, Cat, Dog, Rabbit, Star, Weight } from "lucide-react";
import { Icon as Iconify } from "@iconify/react";
import { Button } from "./Button";

// Helper function to capitalize first letter
const capitalizeFirst = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Helper Components
const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`p-6 md:p-8 self-stretch bg-white flex w-full rounded-[32px] md:rounded-5xl ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

const IconBadge = ({ icon, color }: { icon: string; color: string }) => {
  // Mapowanie kolorów na pełne klasy Tailwind (wymagane dla statycznej analizy)
  const colorClasses: Record<string, { bg: string; text: string }> = {
    lime: { bg: "bg-lime-500/20", text: "text-lime-500" },
    blue: { bg: "bg-blue-500/20", text: "text-blue-500" },
    yellow: { bg: "bg-yellow-500/20", text: "text-yellow-500" },
    indigo: { bg: "bg-indigo-500/20", text: "text-indigo-500" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-500" },
    green: { bg: "bg-green-500/20", text: "text-green-500" },
    red: { bg: "bg-red-500/20", text: "text-red-500" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-500" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-500" },
    pink: { bg: "bg-pink-500/20", text: "text-pink-500" },
  };

  const classes = colorClasses[color] || colorClasses.blue; // fallback do blue

  return (
    <div
      className={`w-12 h-12 ${classes.bg} rounded-full flex justify-center items-center`}
    >
      <Iconify icon={icon} className={`${classes.text} text-lg`} />
    </div>
  );
};

const RatingCard = ({
  icon,
  color,
  rate,
  title,
  description,
}: {
  icon: string;
  color: string;
  rate: number | null;
  title: string;
  description: string | null;
}) => {
  return (
    <Card className="flex flex-col justify-between items-start min-h-[140px]">
      <div className="self-stretch inline-flex justify-between items-start">
        <IconBadge icon={icon} color={color} />
        <div className="inline-flex flex-col justify-center items-end">
          <div className="text-center justify-center text-zinc-700 text-2xl md:text-3xl font-extrabold leading-none">
            {rate}/5
          </div>
          <div className="text-center justify-center text-zinc-700/75 text-sm md:text-base font-medium leading-none">
            Ocena
          </div>
        </div>
      </div>
      <div className="self-stretch pt-3 md:pt-4 flex flex-col justify-center items-start gap-1">
        <div className="self-stretch justify-center text-zinc-700 text-lg md:text-xl font-semibold leading-tight">
          {title}
        </div>
        <div className="self-stretch justify-center text-zinc-700/75 text-xs md:text-sm font-medium leading-tight">
          {description}
        </div>
      </div>
    </Card>
  );
};

const InfoBadge = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => {
  return (
    <div className="flex justify-start items-center gap-2 overflow-hidden">
      <Icon className="text-white" size={"1.25rem"} strokeWidth={2.5} />
      <div className="text-center justify-center text-white text-base font-semibold">
        {text}
      </div>
    </div>
  );
};

const StarRating = ({ score }: { score: number }) => {
  const stars = Math.round(score / 20);
  return (
    <div className="inline-flex justify-end items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="w-6 h-6 relative overflow-hidden">
          <Star
            fill={star <= stars ? "var(--color-yellow-300)" : "transparent"}
            className="text-yellow-300 w-6 h-6"
          />
        </div>
      ))}
    </div>
  );
};

const SectionHeader = ({
  icon,
  iconColor,
  bgColor,
  title,
}: {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div
        className={`flex justify-center items-center w-9 h-9 md:w-10 md:h-10 rounded-full ${bgColor}`}
      >
        <Iconify icon={icon} className={`w-5 h-5 md:w-6 md:h-6 ${iconColor}`} />
      </div>
      <h2 className={`text-xl md:text-2xl font-bold text-purple-900`}>
        {title}
      </h2>
    </div>
  );
};

const SuitableCard = ({
  suitable,
  icon,
  label,
  recommended = "Rekomendowane",
  notRecommended = "Niezalecane",
}: {
  suitable: boolean;
  icon: string;
  label: string;
  recommended?: string;
  notRecommended?: string;
}) => {
  const bgClass = suitable ? "bg-green-50" : "bg-red-50";
  const iconClass = suitable ? "text-green-600" : "text-red-500";
  const textClass = suitable ? "text-green-600" : "text-red-600";
  const statusTextClass = suitable ? "text-green-600" : "text-red-500";

  return (
    <div
      className={`flex flex-col justify-center items-center flex-1 gap-2 p-4 rounded-3xl ${bgClass}`}
    >
      <Iconify icon={icon} className={`w-8 h-8 ${iconClass}`} />
      <div className="flex flex-col justify-center items-center">
        <p className={`text-base font-bold ${textClass}`}>{label}</p>
        <p className={`text-sm font-medium ${statusTextClass}`}>
          {suitable ? recommended : notRecommended}
        </p>
      </div>
    </div>
  );
};

export const AnalysisResult = ({ result }: { result: AnalysisResultData2 }) => {
  // Species configuration
  const speciesConfig = {
    pies: { icon: Dog, label: "Dla psów" },
    kot: { icon: Cat, label: "Dla kotów" },
    inne: { icon: Rabbit, label: "Dla innych zwierząt" },
  };

  const currentSpecies =
    speciesConfig[result.species as keyof typeof speciesConfig];

  // Rating cards configuration
  const ratingCards = [
    [
      {
        icon: "mdi:meat",
        color: "lime",
        rate: result.rate.meat_quality.rate,
        title: "Jakość mięsa",
        description: result.rate.meat_quality.description,
      },
      {
        icon: "streamline:dna-solid",
        color: "blue",
        rate: result.rate.protein_content.rate,
        title: "Zawartość Białka",
        description: result.rate.protein_content.description,
      },
      {
        icon: "mingcute:drop-fill",
        color: "yellow",
        rate: result.rate.fat_content.rate,
        title: "Bilans Tłuszczów",
        description: result.rate.fat_content.description,
      },
    ],
    [
      {
        icon: "material-symbols:labs-rounded",
        color: "indigo",
        rate: result.rate.calcium_phosphorus_ratio.rate,
        title: "Stosunek Ca/P",
        description: result.rate.calcium_phosphorus_ratio.description,
      },
      {
        icon: "fluent:pill-24-filled",
        color: "cyan",
        rate: result.rate.vitamin_supplementation.rate,
        title: "Uzupełnienie Witamin",
        description: result.rate.vitamin_supplementation.description,
      },
      {
        icon: "pajamas:scale",
        color: "green",
        rate: result.rate.macro_balance.rate,
        title: "Bilans Makro",
        description: result.rate.macro_balance.description,
      },
    ],
  ];

  // Prepare and sort composition sections by total percentage (descending)
  const compositionSections = [
    {
      key: "meal_and_offal",
      data: result.composition.meal_and_offal,
      title: "Mięso i Podroby",
      icon: "mdi:meat",
      color: "text-red-500",
      bgColor: "bg-red-500/5",
    },
    {
      key: "fruits_and_vegetables",
      data: result.composition.fruits_and_vegetables,
      title: "Owoce i Warzywa",
      icon: "mdi:fruit-cherries",
      color: "text-green-600",
      bgColor: "bg-green-500/5",
    },
    {
      key: "grains",
      data: result.composition.grains,
      title: "Zboża",
      icon: "mdi:grain",
      color: "text-amber-600",
      bgColor: "bg-amber-400/10",
    },
    {
      key: "other_additives",
      data: result.composition.other_additives,
      title: "Inne dodatki",
      icon: "mdi:flask",
      color: "text-purple-600",
      bgColor: "bg-purple-500/5",
    },
  ]
    .filter((section) => section.data && section.data.length > 0)
    .map((section) => ({
      ...section,
      totalPercentage: section.data!.reduce(
        (sum, item) => sum + (item.percentage || 0),
        0
      ),
      sortedData: [...section.data!].sort(
        (a, b) => (b.percentage || 0) - (a.percentage || 0)
      ),
    }))
    .sort((a, b) => b.totalPercentage - a.totalPercentage);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Card className="bg-gradient-to-r flex flex-col md:flex-row w-full justify-between items-center from-orange via-orange-400 to-red-400 outline-1 outline-offset-[-1px] outline-white/25 gap-6 md:gap-0">
        <div className="self-stretch inline-flex flex-col justify-between items-start gap-4 md:gap-0 w-full md:w-auto">
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="text-left md:text-center justify-center text-white text-2xl md:text-3xl font-extrabold">
              {result.name || "Nazwa nieznana"}
            </div>
            <div className="text-left md:text-center justify-center text-white/95 text-lg md:text-xl font-medium">
              {result.producent || "Producent nieznany"}
            </div>
          </div>
          <div className="inline-flex flex-wrap justify-start items-start gap-2 md:gap-4">
            <InfoBadge icon={currentSpecies.icon} text={currentSpecies.label} />
            <InfoBadge icon={Weight} text={result.type} />
            <InfoBadge icon={Calendar} text={result.purpose} />
          </div>
        </div>
        <div className="self-stretch inline-flex flex-col justify-start items-start md:items-end gap-2 w-full md:w-auto">
          <div className="flex flex-col justify-center items-start md:items-end">
            <div className="text-left md:text-center justify-center text-white text-5xl md:text-6xl font-extrabold leading-tight md:leading-[64px]">
              {result.rate.score_0_100}
            </div>
            <div className="text-left md:text-center justify-center text-white/95 text-lg md:text-xl font-medium">
              Ogólna ocena
            </div>
          </div>
          <StarRating score={result.rate.score_0_100!} />
        </div>
      </Card>
      <div className="flex flex-col gap-4">
        {ratingCards.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col md:flex-row gap-4">
            {row.map((card) => (
              <RatingCard key={card.title} {...card} />
            ))}
          </div>
        ))}
      </div>

      {/* Podział składników i Profil odżywczy - obok siebie */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Podział składników */}
        <Card className="flex-col justify-start items-start flex-1 overflow-hidden gap-4 p-8 rounded-[48px]">
          <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-4">
            <div className="">
              <IconBadge
                icon={"streamline-plump:fork-knife-solid"}
                color={"orange"}
              />
            </div>
            <div className="flex flex-col justify-center items-end flex-grow-0 flex-shrink-0 relative">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-[#50304d]">
                Podział składników
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-4 pt-4">
            {compositionSections.map((section) => (
              <div
                key={section.key}
                className={`flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-3 p-4 rounded-3xl ${section.bgColor}`}
              >
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                  <Iconify
                    icon={section.icon}
                    className={`${section.color} text-xl`}
                  />
                  <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#50304d]">
                    {section.title} ({section.totalPercentage.toFixed(0)}%)
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-1">
                  {section.sortedData.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0"
                    >
                      <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#50304d]">
                        {capitalizeFirst(item.name)}
                      </p>
                      <div className="flex items-center gap-2">
                        {item.percentage !== null && (
                          <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-right text-[#50304d]">
                            {item.percentage}%
                          </p>
                        )}
                        {section.key === "grains" &&
                          result.composition.contains_grains && (
                            <div className="flex justify-center items-center px-2.5 py-1 rounded-full bg-amber-200">
                              <p className="text-xs font-medium text-amber-800">
                                Zawiera zboża
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Profil odżywczy */}
        <Card className="flex-col justify-start items-start flex-1 overflow-hidden gap-4 p-8 rounded-[48px]">
          <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-4">
            <div className="">
              <IconBadge icon={"tabler:chart-pie-filled"} color={"green"} />
            </div>
            <div className="flex flex-col justify-center items-end flex-grow-0 flex-shrink-0 relative">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-[#50304d]">
                Profil odżywczy
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4 pt-4">
            {/* Wilgotność */}
            {result.analytical_components.humidity && (
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
                <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#50304d]">
                    Wilgotność
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-center text-[#50304d]">
                    {result.analytical_components.humidity.value}
                    {result.analytical_components.humidity.unit}
                  </p>
                </div>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="flex-grow-0 flex-shrink-0 h-3 relative overflow-hidden rounded-[99999px] bg-gradient-to-r from-[#51a2ff] to-[#155dfc]"
                    style={{
                      width: `${result.analytical_components.humidity.value}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Białko Surowe */}
            {result.analytical_components.protein && (
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
                <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#50304d]">
                    Białko Surowe
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-center text-[#50304d]">
                    {result.analytical_components.protein.value}
                    {result.analytical_components.protein.unit}
                  </p>
                </div>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="flex-grow-0 flex-shrink-0 h-3 relative overflow-hidden rounded-[99999px] bg-gradient-to-r from-[#fff085] to-[#fdc700]"
                    style={{
                      width: `${Math.min(
                        result.analytical_components.protein.value || 0,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Węglowodany */}
            {result.analytical_components.carbohydrates && (
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
                <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#50304d]">
                    Węglowodany
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-right text-[#50304d]">
                    {result.analytical_components.carbohydrates.value}
                    {result.analytical_components.carbohydrates.unit}
                  </p>
                </div>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="flex-grow-0 flex-shrink-0 h-3 relative overflow-hidden rounded-[99999px] bg-gradient-to-r from-[#d8f999] to-[#9ae600]"
                    style={{
                      width: `${Math.min(
                        result.analytical_components.carbohydrates.value || 0,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Tłuszcz Surowy */}
            {result.analytical_components.fat && (
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
                <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#50304d]">
                    Tłuszcz Surowy
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-right text-[#50304d]">
                    {result.analytical_components.fat.value}
                    {result.analytical_components.fat.unit}
                  </p>
                </div>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="flex-grow-0 flex-shrink-0 h-3 relative overflow-hidden rounded-[99999px] bg-gradient-to-r from-[#ffa07a] to-[#ff6347]"
                    style={{
                      width: `${Math.min(
                        result.analytical_components.fat.value || 0,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Popiół Surowy */}
            {result.analytical_components.ash && (
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
                <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#50304d]">
                    Popiół Surowy
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-right text-[#50304d]">
                    {result.analytical_components.ash.value}
                    {result.analytical_components.ash.unit}
                  </p>
                </div>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="flex-grow-0 flex-shrink-0 h-3 relative overflow-hidden rounded-[99999px] bg-gradient-to-r from-[#c0c0c0] to-[#808080]"
                    style={{
                      width: `${Math.min(
                        result.analytical_components.ash.value || 0,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Włókno Surowe */}
            {result.analytical_components.fiber && (
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1">
                <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#50304d]">
                    Włókno Surowe
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-right text-[#50304d]">
                    {result.analytical_components.fiber.value}
                    {result.analytical_components.fiber.unit}
                  </p>
                </div>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="flex-grow-0 flex-shrink-0 h-3 relative overflow-hidden rounded-[99999px] bg-gradient-to-r from-[#8b7355] to-[#654321]"
                    style={{
                      width: `${Math.min(
                        result.analytical_components.fiber.value || 0,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Energia */}
          {result.analytical_components.energy?.kcal_per_100g && (
            <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1 p-4 rounded-3xl bg-slate-100 mt-4">
              <p className="flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#1d293d]">
                {result.analytical_components.energy.kcal_per_100g.value}
              </p>
              <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-center text-[#62748e]">
                kcal na 100g
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Witaminy i Minerały */}
      <Card className="flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-4 p-6 md:p-8 rounded-[32px] md:rounded-[48px]">
        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-3 md:gap-4">
          <div className="">
            <IconBadge icon={"fluent:pill-24-filled"} color={"cyan"} />
          </div>
          <div className="flex flex-col justify-center items-end flex-grow-0 flex-shrink-0 relative">
            <p className="flex-grow-0 flex-shrink-0 text-xl md:text-2xl font-bold text-left text-[#50304d]">
              Witaminy i Minerały
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 md:gap-8">
          {/* Witaminy */}
          {result.vitamins && result.vitamins.length > 0 && (
            <div className="flex flex-col justify-start items-start w-full md:flex-grow md:flex-shrink md:basis-0 relative gap-2.5">
              <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#50304d]">
                Witaminy
              </p>
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
                {[...result.vitamins]
                  .sort((a, b) => (b.value || 0) - (a.value || 0))
                  .map((vitamin, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-4 py-2 rounded-3xl bg-slate-100"
                    >
                      <p className="flex-grow-0 flex-shrink-0 text-base text-center text-[#50304d]">
                        {capitalizeFirst(vitamin.name)}
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-center text-[#50304d]">
                        {vitamin.value} {vitamin.unit}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Minerały */}
          {result.minerals && result.minerals.length > 0 && (
            <div className="flex flex-col justify-start items-start w-full md:flex-grow md:flex-shrink md:basis-0 relative gap-2.5">
              <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#50304d]">
                Minerały
              </p>
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
                {[...result.minerals]
                  .sort((a, b) => (b.value || 0) - (a.value || 0))
                  .map((mineral, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-4 py-2 rounded-3xl bg-orange-50"
                    >
                      <p className="flex-grow-0 flex-shrink-0 text-base text-center text-[#50304d]">
                        {capitalizeFirst(mineral.name)}
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-center text-[#50304d]">
                        {mineral.value} {mineral.unit}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Mikroelementy */}
          {result.microelements && result.microelements.length > 0 && (
            <div className="flex flex-col justify-start items-start w-full md:flex-grow md:flex-shrink md:basis-0 relative gap-2.5">
              <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#50304d]">
                Mikroelementy
              </p>
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
                {[...result.microelements]
                  .sort((a, b) => (b.value || 0) - (a.value || 0))
                  .map((microelement, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-4 py-2 rounded-3xl bg-green-50"
                    >
                      <p className="flex-grow-0 flex-shrink-0 text-base text-center text-[#50304d]">
                        {capitalizeFirst(microelement.name)}
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-center text-[#50304d]">
                        {microelement.value} {microelement.unit}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Alergeny and Odpowiednie dla - Side by Side */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Alergeny Section */}
        <Card className="flex-col gap-4 flex-1">
          <SectionHeader
            icon="material-symbols:shield-rounded"
            iconColor="text-lime-500"
            bgColor="bg-lime-500/20"
            title="Alergeny"
          />

          <div className="flex flex-col gap-4">
            {/* Wykryte Alergeny */}
            {result.allergens.detected &&
              result.allergens.detected.length > 0 && (
                <div className="flex flex-col gap-2 p-4 rounded-3xl bg-red-50">
                  <div className="flex items-center gap-2">
                    <Iconify
                      icon="jam:triangle-danger-f"
                      className="w-[18px] h-[18px] text-red-500"
                    />
                    <p className="text-lg font-bold text-purple-900">
                      Wykryto Alergeny
                    </p>
                  </div>
                  <div className="flex flex-col">
                    {result.allergens.detected.map((allergen, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <p className="text-base text-purple-900">
                          {capitalizeFirst(allergen)}
                        </p>
                        <div className="flex justify-center items-center px-3 py-1 rounded-full bg-red-200">
                          <p className="text-xs font-medium text-red-700">
                            Wykryto
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Potencjalne Alergeny */}
            {result.allergens.potential &&
              result.allergens.potential.length > 0 && (
                <div className="flex flex-col gap-2 p-4 rounded-3xl bg-yellow-50">
                  <div className="flex items-center gap-2">
                    <Iconify
                      icon="jam:triangle-danger-f"
                      className="w-[18px] h-[18px] text-amber-500"
                    />
                    <p className="text-lg font-bold text-purple-900">
                      Potencjalne Alergeny
                    </p>
                  </div>
                  <div className="flex flex-col">
                    {result.allergens.potential.map((allergen, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <p className="text-base text-purple-900">
                          {capitalizeFirst(allergen)}
                        </p>
                        <div className="flex justify-center items-center px-3 py-1 rounded-full bg-yellow-200">
                          <p className="text-xs font-medium text-amber-700">
                            Potencjalny
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Bezpieczne (brak alergenów + cechy pozytywne) */}
            {((result.allergens.detected &&
              result.allergens.detected.length === 0) ||
              !result.allergens.detected) &&
              ((result.allergens.potential &&
                result.allergens.potential.length === 0) ||
                !result.allergens.potential) && (
                <div className="flex flex-col gap-2 p-4 rounded-3xl bg-green-50">
                  <div className="flex items-center gap-2">
                    <Iconify
                      icon="mdi:check-circle-outline"
                      className="w-[18px] h-[18px] text-green-600"
                    />
                    <p className="text-lg font-bold text-purple-900">
                      Bezpieczne - Brak Alergenów
                    </p>
                  </div>
                </div>
              )}

            {/* Cechy bezpieczeństwa (zawsze pokazywane jeśli są prawdziwe) */}
            {(result.allergens.gluten_free ||
              result.allergens.lactose_free) && (
              <div className="flex flex-col gap-2 p-4 rounded-3xl bg-green-50">
                <div className="flex items-center gap-2">
                  <Iconify
                    icon="ep:success-filled"
                    className="w-[18px] h-[18px] text-green-600"
                  />
                  <p className="text-lg font-bold text-purple-900">
                    Cechy Produktu
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.allergens.lactose_free && (
                    <div className="flex justify-center items-center px-3 py-1 rounded-full bg-green-100">
                      <p className="text-xs font-medium text-green-600">
                        Brak laktozy
                      </p>
                    </div>
                  )}
                  {result.allergens.gluten_free && (
                    <div className="flex justify-center items-center px-3 py-1 rounded-full bg-green-100">
                      <p className="text-xs font-medium text-green-600">
                        Bezglutenowe
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Odpowiednie dla Section */}
        <Card className="flex-col gap-4 flex-1">
          <SectionHeader
            icon="mdi:heart"
            iconColor="text-pink-500"
            bgColor="bg-pink-500/20"
            title="Odpowiednie dla"
          />

          <div className="flex flex-col gap-4">
            {/* First Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {result.verdict.suitable_for.young !== null && (
                <SuitableCard
                  suitable={result.verdict.suitable_for.young}
                  icon="fa-solid:baby"
                  label={result.species === "pies" ? "Szczenięta" : "Kocięta"}
                />
              )}

              {result.verdict.suitable_for.adults !== null && (
                <SuitableCard
                  suitable={result.verdict.suitable_for.adults}
                  icon="f7:paw"
                  label={
                    result.species === "pies" ? "Dorosłe Psy" : "Dorosłe Koty"
                  }
                />
              )}
            </div>

            {/* Second Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {result.verdict.suitable_for.seniors !== null && (
                <SuitableCard
                  suitable={result.verdict.suitable_for.seniors}
                  icon="ic:baseline-cake"
                  label="Seniorzy"
                />
              )}

              {result.verdict.suitable_for.allergy_sufferers !== null && (
                <SuitableCard
                  suitable={result.verdict.suitable_for.allergy_sufferers}
                  icon="fa6-solid:hand-dots"
                  label="Alergicy"
                />
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Finalna Ocena */}
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-6 md:gap-8 p-6 md:p-8 rounded-[32px] md:rounded-[48px] bg-gradient-to-br from-[#f9c09a] via-[#ff8737] to-[#ff6b6b]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start flex-grow-0 flex-shrink-0 w-full gap-4 md:gap-0">
          <div className="flex flex-col justify-between items-start self-stretch flex-grow-0 flex-shrink-0">
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-2xl md:text-3xl font-bold text-left md:text-center text-white">
                Finalna ocena
              </p>
              <p className="flex-grow-0 flex-shrink-0 text-base md:text-xl font-medium text-left md:text-center text-white/95">
                Kompleksowa analiza oparta na sztucznej inteligencji
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start md:items-end self-stretch flex-grow-0 flex-shrink-0 gap-2">
            <div className="flex flex-col justify-center items-start md:items-end flex-grow-0 flex-shrink-0 relative">
              <p className="flex-grow-0 flex-shrink-0 text-5xl md:text-[64px] font-bold text-left md:text-center leading-none text-white">
                {result.rate.score_0_100 || "N/A"}/100
              </p>
              <p className="flex-grow-0 flex-shrink-0 text-lg md:text-xl font-medium text-left md:text-center text-white/95">
                {result.verdict.final_rating
                  ? capitalizeFirst(result.verdict.final_rating)
                  : "Brak oceny"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start flex-grow-0 flex-shrink-0 w-full gap-6 lg:gap-8">
          <div className="flex flex-col md:flex-row justify-start items-start flex-grow gap-6 md:gap-8 w-full">
            {/* Zalety */}
            <div className="flex flex-col justify-start items-start flex-grow relative gap-1 w-full">
              <p className="flex-grow-0 flex-shrink-0 text-lg md:text-xl font-bold text-left md:text-center text-white">
                Zalety
              </p>
              <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1">
                {result.verdict.advantages &&
                result.verdict.advantages.length > 0 ? (
                  result.verdict.advantages.map((advantage, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-base font-medium text-white/95"
                    >
                      <Iconify
                        icon="mdi:check-circle"
                        className="w-5 h-5 text-[#9ae600] flex-shrink-0 mt-0.5"
                      />
                      <span>{advantage}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-base font-medium text-white/75">
                    Brak danych
                  </p>
                )}
              </div>
            </div>

            {/* Wątpliwości */}
            <div className="flex flex-col justify-start items-start flex-grow relative gap-1 w-full">
              <p className="flex-grow-0 flex-shrink-0 text-lg md:text-xl font-bold text-left md:text-center text-white">
                Wątpliwości
              </p>
              <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1">
                {result.verdict.uncertainties &&
                result.verdict.uncertainties.length > 0 ? (
                  result.verdict.uncertainties.map((uncertainty, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-base font-medium text-white/95"
                    >
                      <Iconify
                        icon="mdi:alert-circle"
                        className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5"
                      />
                      <span>{uncertainty}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-base font-medium text-white/75">
                    Brak danych
                  </p>
                )}
              </div>
            </div>

            {/* Wady */}
            <div className="flex flex-col justify-start items-start flex-grow relative gap-1 w-full">
              <p className="flex-grow-0 flex-shrink-0 text-lg md:text-xl font-bold text-left md:text-center text-white">
                Wady
              </p>
              <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1">
                {result.verdict.disadvantages &&
                result.verdict.disadvantages.length > 0 ? (
                  result.verdict.disadvantages.map((disadvantage, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-base font-medium text-white/95"
                    >
                      <Iconify
                        icon="mdi:close-circle"
                        className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                      />
                      <span>{disadvantage}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-base font-medium text-white/75">
                    Brak danych
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendacja i przyciski */}
        {result.rate.comment && (
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-3 md:gap-2 p-4 rounded-2xl md:rounded-3xl bg-white/[0.15] backdrop-blur">
            <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative">
              <p className="self-stretch flex-grow-0 flex-shrink-0 text-xs md:text-sm text-center text-white">
                <span className="text-xs md:text-sm font-bold text-center text-white">
                  Rekomendacja:
                </span>
                <span className="text-xs md:text-sm font-medium text-center text-white">
                  {" "}
                  {result.rate.comment}
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-3 md:gap-4 w-full">
              <Button
                variant="white"
                className="rounded-[56px] w-full sm:w-auto"
              >
                Pobierz Analizę
              </Button>
              <Button
                variant="white-transparent"
                className="rounded-[56px] w-full sm:w-auto"
              >
                Udostępnij Analizę
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

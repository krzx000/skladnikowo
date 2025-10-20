import { AnalysisResultData } from "@/lib/types";
import {
  Beef,
  Droplets,
  Flame,
  Apple,
  Pill,
  TestTube,
  Award,
  ThumbsUp,
  ThumbsDown,
  Cat,
  Dog,
  Baby,
  Users,
  UserCheck,
  Sparkles,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import { Icon as IconComponent } from "./Icon";

// Komponent dla progress bar
const ProgressBar = ({ value, max = 100 }: { value: number; max?: number }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-orange transition-all duration-500 rounded-full "
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Komponent dla pojedynczej karty
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-orange/20 ${className}`}
  >
    {children}
  </div>
);

// Komponent dla tytułu sekcji
const SectionTitle = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 mb-5 pb-2">
    <IconComponent className="bg-orange/20">
      <Icon className="w-5 h-5 text-secondary/75" strokeWidth={1.75} />
    </IconComponent>

    <h3 className="text-lg font-bold text-primary tracking-tight">
      {children}
    </h3>
  </div>
);

// Komponent dla etykiety z wartością
const DataRow = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number | React.ReactNode;
  unit?: string;
}) => (
  <div className="flex justify-between items-center py-2.5 border-b border-orange/10 last:border-0 rounded px-2 -mx-2">
    <span className="text-sm text-secondary font-medium capitalize">
      {label}
    </span>
    <span className="text-sm font-bold text-primary flex items-center gap-1">
      {value}
      {unit && <span className="text-secondary ml-1 font-normal">{unit}</span>}
    </span>
  </div>
);

// Komponent dla badge'a
const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "default";
  className?: string;
}) => {
  const colors = {
    success:
      "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200 ",
    warning:
      "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200 ",
    error:
      "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200 ",
    default:
      "bg-gradient-to-r from-orange/5 to-orange/15 text-secondary/75 border-orange/20 ",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold capitalize border ${colors[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const AnalyzeResult = ({ result }: { result: AnalysisResultData }) => {
  // Obsługa błędów - brak danych
  if (!result) {
    return (
      <Card className="bg-red-50 border-red-200">
        <div className="flex items-center gap-3 text-red-600">
          <AlertCircle className="w-6 h-6" />
          <div>
            <h3 className="font-bold text-lg">Brak danych</h3>
            <p className="text-sm text-red-600/80">
              Nie udało się załadować wyników analizy.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Walidacja podstawowych danych
  if (!result.nazwa) {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="flex items-center gap-3 text-yellow-600">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <h3 className="font-bold text-lg">Niekompletne dane</h3>
            <p className="text-sm text-yellow-600/80">
              Wyniki analizy są niekompletne. Brakuje podstawowych informacji o
              produkcie.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Funkcja do mapowania oceny na kolor
  const getQualityColor = (
    quality: string | null
  ): "success" | "warning" | "error" | "default" => {
    if (!quality) return "default";
    const q = quality.toLowerCase();
    if (
      q.includes("bardzo dobra") ||
      q.includes("wybitna") ||
      q.includes("bardzo dobry")
    )
      return "success";
    if (q.includes("dobra") || q.includes("prawidłowy") || q.includes("dobry"))
      return "success";
    if (
      q.includes("średnia") ||
      q.includes("częściowe") ||
      q.includes("średni")
    )
      return "warning";
    return "error";
  };

  return (
    <div className="w-full space-y-6 mt-8 animate-in fade-in duration-500">
      {/* Nagłówek z oceną ogólną */}
      <Card className="bg-gradient-to-br from-orange/5 to-orange/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1 w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-3">
              {result.nazwa}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge>{result.gatunek}</Badge>
              <Badge>{result.rodzaj}</Badge>
              <Badge>{result.przeznaczenie}</Badge>
              {result.producent && <Badge>{result.producent}</Badge>}
            </div>
          </div>
          {result.ocena?.ocena_0_100 !== null &&
            result.ocena?.ocena_0_100 !== undefined && (
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-white to-orange/5 rounded-2xl border-2 border-orange/30 w-full sm:w-auto min-w-[140px]">
                <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-orange to-orange-600 bg-clip-text text-transparent mb-1">
                  {result.ocena.ocena_0_100}
                </div>
                <div className="text-xs font-semibold text-secondary uppercase tracking-wider">
                  / 100
                </div>
                {result.werdykt?.ocena_koncowa && (
                  <Badge
                    variant={getQualityColor(result.werdykt.ocena_koncowa)}
                    className="mt-3 text-sm"
                  >
                    {result.werdykt.ocena_koncowa}
                  </Badge>
                )}
              </div>
            )}
        </div>
      </Card>

      {/* Flex Wrap Layout */}
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {/* Skład - mięso i podroby */}
        {result.sklad?.mieso_i_podroby &&
          result.sklad.mieso_i_podroby.length > 0 && (
            <Card className="flex-1 min-w-[280px] basis-full sm:basis-[calc(66.666%-0.5rem)]">
              <SectionTitle icon={Beef}>Mięso i podroby</SectionTitle>
              <div className="space-y-3">
                {[...result.sklad.mieso_i_podroby]
                  .sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0))
                  .map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-primary capitalize">
                          {item.name}
                        </span>
                        {item.percentage !== null && (
                          <span className="text-sm font-semibold text-orange">
                            {item.percentage}%
                          </span>
                        )}
                      </div>
                      {item.percentage !== null && (
                        <ProgressBar value={item.percentage} />
                      )}
                    </div>
                  ))}
              </div>
            </Card>
          )}

        {/* Składniki analityczne */}
        <Card className="flex-1 min-w-[280px]">
          <SectionTitle icon={TestTube}>Składniki analityczne</SectionTitle>
          <div className="space-y-1">
            {result.skladniki_analityczne &&
            result.skladniki_analityczne.length > 0 ? (
              [...result.skladniki_analityczne]
                .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
                .map((item, idx) => (
                  <DataRow
                    key={idx}
                    label={item.name}
                    value={
                      item.value ?? (
                        <span className="flex items-center gap-1 text-secondary/75">
                          <AlertCircle className="w-3 h-3" />
                          Brak danych
                        </span>
                      )
                    }
                    unit={item.value !== null ? "%" : undefined}
                  />
                ))
            ) : (
              <div className="text-sm text-secondary/75 text-center py-4">
                <AlertCircle className="w-4 h-4 mx-auto mb-2" />
                Brak danych o składnikach analitycznych
              </div>
            )}
          </div>
        </Card>

        {/* Warzywa i owoce */}
        {result.sklad?.warzywa_owoce &&
          result.sklad.warzywa_owoce.length > 0 && (
            <Card>
              <SectionTitle icon={Apple}>Warzywa i owoce</SectionTitle>
              <div className="space-y-2">
                {[...result.sklad.warzywa_owoce]
                  .sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0))
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-primary ">{item.name}</span>
                      {item.percentage !== null && (
                        <span className="font-semibold text-orange">
                          {item.percentage}%
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </Card>
          )}

        {/* Inne dodatki w składzie */}
        {result.sklad?.inne_dodatki && result.sklad.inne_dodatki.length > 0 && (
          <Card className="flex-1 min-w-[280px]">
            <SectionTitle icon={Pill}>Inne dodatki</SectionTitle>
            <div className="space-y-2">
              {[...result.sklad.inne_dodatki]
                .sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0))
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-primary capitalize">{item.name}</span>
                    {item.percentage !== null && (
                      <span className="font-semibold text-orange">
                        {item.percentage}%
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* Informacje o składzie */}
        {result.sklad &&
          (result.sklad.zboza !== null ||
            result.sklad.cukier !== null ||
            result.sklad.gmo !== null ||
            result.sklad.monobialkowa !== null) && (
            <Card className="flex-1 min-w-[280px]">
              <SectionTitle icon={TestTube}>Informacje o składzie</SectionTitle>
              <div className="space-y-1">
                {result.sklad.zboza !== null && (
                  <DataRow
                    label="Zboża"
                    value={
                      result.sklad.zboza ? (
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <XCircle className="w-4 h-4" />
                          Zawiera
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          Nie zawiera
                        </span>
                      )
                    }
                  />
                )}
                {result.sklad.cukier !== null && (
                  <DataRow
                    label="Cukier"
                    value={
                      result.sklad.cukier ? (
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <XCircle className="w-4 h-4" />
                          Zawiera
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          Nie zawiera
                        </span>
                      )
                    }
                  />
                )}
                {result.sklad.gmo !== null && (
                  <DataRow
                    label="GMO"
                    value={
                      result.sklad.gmo ? (
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <XCircle className="w-4 h-4" />
                          Zawiera
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          Nie zawiera
                        </span>
                      )
                    }
                  />
                )}
                {result.sklad.monobialkowa !== null && (
                  <DataRow
                    label="Karma monobiałkowa"
                    value={
                      result.sklad.monobialkowa ? (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          Tak
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-secondary font-semibold">
                          Nie
                        </span>
                      )
                    }
                  />
                )}
              </div>
            </Card>
          )}

        {/* Minerały */}
        <Card className="flex-1 min-w-[280px]">
          <SectionTitle icon={Droplets}>Minerały</SectionTitle>
          <div className="space-y-1">
            {result.mineralne && result.mineralne.length > 0 ? (
              [...result.mineralne]
                .sort((a, b) => {
                  // Brak danych na końcu
                  if (a.value === null && b.value !== null) return 1;
                  if (a.value !== null && b.value === null) return -1;
                  if (a.value === null && b.value === null) return 0;
                  // Sortowanie malejąco
                  return (b.value ?? 0) - (a.value ?? 0);
                })
                .map((item, idx) => (
                  <DataRow
                    key={idx}
                    label={item.name}
                    value={
                      item.value ?? (
                        <span className="flex items-center gap-1 text-secondary/75">
                          <AlertCircle className="w-3 h-3" />
                          Brak danych
                        </span>
                      )
                    }
                    unit={item.value !== null ? "%" : undefined}
                  />
                ))
            ) : (
              <div className="text-sm text-secondary/75 text-center py-4">
                <AlertCircle className="w-4 h-4 mx-auto mb-2" />
                Brak danych o minerałach
              </div>
            )}
          </div>
        </Card>

        {/* Energia */}
        <Card className="flex-1 min-w-[280px] bg-gradient-to-br from-orange/5 to-white">
          <SectionTitle icon={Flame}>Energia</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Kalorie */}
            <div className="p-4 bg-gradient-to-br from-orange/10 to-orange/5 rounded-xl border border-orange/20">
              <div className="flex flex-col items-center text-center gap-2">
                <IconComponent className="bg-orange/30">
                  <Flame className="w-5 h-5 text-secondary/65" />
                </IconComponent>
                <div>
                  <p className="text-xs text-secondary font-medium mb-1">
                    Kalorie
                  </p>
                  {result.energia?.kcal_na_100g !== null &&
                  result.energia?.kcal_na_100g !== undefined ? (
                    <p className="text-2xl font-bold text-orange">
                      {result.energia.kcal_na_100g}
                      <span className="text-sm text-secondary ml-1 font-normal">
                        kcal/100g
                      </span>
                    </p>
                  ) : (
                    <span className="flex items-center justify-center gap-1 text-secondary/75 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Brak danych
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Energia (kJ) */}
            <div className="p-4 bg-gradient-to-br from-red-50 to-red-25 rounded-xl border border-red-200/20">
              <div className="flex flex-col items-center text-center gap-2">
                <IconComponent className="bg-red-500/20">
                  <Flame className="w-5 h-5 text-red-600" />
                </IconComponent>
                <div>
                  <p className="text-xs text-secondary font-medium mb-1">
                    Energia
                  </p>
                  {result.energia?.kJ_na_100g !== null &&
                  result.energia?.kJ_na_100g !== undefined ? (
                    <p className="text-2xl font-bold text-red-600">
                      {result.energia.kJ_na_100g}
                      <span className="text-sm text-secondary ml-1 font-normal">
                        kJ/100g
                      </span>
                    </p>
                  ) : (
                    <span className="flex items-center justify-center gap-1 text-secondary/75 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Brak danych
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Dodatki dietetyczne */}
        {result.dodatki_dietetyczne &&
          (result.dodatki_dietetyczne.tauryna_mg_kg !== null ||
            (result.dodatki_dietetyczne.witaminy &&
              result.dodatki_dietetyczne.witaminy.length > 0) ||
            (result.dodatki_dietetyczne.oleje &&
              result.dodatki_dietetyczne.oleje.length > 0) ||
            (result.dodatki_dietetyczne.mikroelementy &&
              result.dodatki_dietetyczne.mikroelementy.length > 0) ||
            (result.dodatki_dietetyczne.inne_dodatki_funkcjonalne &&
              result.dodatki_dietetyczne.inne_dodatki_funkcjonalne.length >
                0)) && (
            <Card className="flex-1 min-w-[280px] basis-full bg-gradient-to-br from-orange/5 to-white">
              <SectionTitle icon={Pill}>Dodatki dietetyczne</SectionTitle>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lewa kolumna - Tauryna i Witaminy */}
                <div className="space-y-4">
                  {/* Tauryna - wyróżniona */}
                  {result.dodatki_dietetyczne.tauryna_mg_kg !== null && (
                    <div className="p-4 bg-gradient-to-br from-orange/10 to-orange/5 rounded-xl border border-orange/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="bg-orange/20">
                            <Pill className="w-4 h-4 text-secondary/75" />
                          </IconComponent>
                          <span className="text-sm font-bold text-primary">
                            Tauryna
                          </span>
                        </div>
                        <span className="text-lg font-bold text-orange">
                          {result.dodatki_dietetyczne.tauryna_mg_kg}
                          <span className="text-sm text-secondary ml-1 font-normal">
                            mg/kg
                          </span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Witaminy */}
                  {result.dodatki_dietetyczne.witaminy &&
                    result.dodatki_dietetyczne.witaminy.length > 0 && (
                      <div className="p-4 bg-white rounded-xl border border-orange/20">
                        <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                          <IconComponent className="bg-green-500/20">
                            <Sparkles className="w-4 h-4 text-green-600" />
                          </IconComponent>
                          Witaminy
                        </h4>
                        <div className="space-y-2">
                          {result.dodatki_dietetyczne.witaminy.map(
                            (vitamin, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center py-1.5 text-sm"
                              >
                                <span className="text-secondary font-medium capitalize">
                                  {vitamin.name}
                                </span>
                                {vitamin.value !== null ? (
                                  <span className="font-semibold text-primary">
                                    {vitamin.value}
                                    <span className="text-xs text-secondary ml-1">
                                      IU
                                    </span>
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-secondary/75 text-xs">
                                    <AlertCircle className="w-3 h-3" />
                                    Brak danych
                                  </span>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>

                {/* Prawa kolumna - Oleje, Mikroelementy, Dodatki funkcjonalne */}
                <div className="space-y-4">
                  {/* Oleje */}
                  {result.dodatki_dietetyczne.oleje &&
                    result.dodatki_dietetyczne.oleje.length > 0 && (
                      <div className="p-4 bg-white rounded-xl border border-orange/20">
                        <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                          <IconComponent className="bg-yellow-500/20">
                            <Droplets className="w-4 h-4 text-yellow-600" />
                          </IconComponent>
                          Oleje
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.dodatki_dietetyczne.oleje.map((oil, idx) => (
                            <Badge
                              key={idx}
                              variant="default"
                              className="text-xs"
                            >
                              {oil.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Mikroelementy */}
                  {result.dodatki_dietetyczne.mikroelementy &&
                    result.dodatki_dietetyczne.mikroelementy.length > 0 && (
                      <div className="p-4 bg-white rounded-xl border border-orange/20">
                        <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                          <IconComponent className="bg-blue-500/20">
                            <TestTube className="w-4 h-4 text-blue-600" />
                          </IconComponent>
                          Mikroelementy
                        </h4>
                        <div className="space-y-2">
                          {result.dodatki_dietetyczne.mikroelementy.map(
                            (elem, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span className="text-orange mt-0.5">•</span>
                                <span className="text-primary flex-1">
                                  {elem.name}
                                  {elem.value !== null && (
                                    <span className="text-secondary/75 ml-1">
                                      ({elem.value})
                                    </span>
                                  )}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Inne dodatki funkcjonalne */}
                  {result.dodatki_dietetyczne.inne_dodatki_funkcjonalne &&
                    result.dodatki_dietetyczne.inne_dodatki_funkcjonalne
                      .length > 0 && (
                      <div className="p-4 bg-white rounded-xl border border-orange/20">
                        <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                          <IconComponent className="bg-purple-500/20">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                          </IconComponent>
                          Dodatki funkcjonalne
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.dodatki_dietetyczne.inne_dodatki_funkcjonalne.map(
                            (item, idx) => (
                              <Badge
                                key={idx}
                                variant="default"
                                className="text-xs"
                              >
                                {item.name}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </Card>
          )}

        {/* Ocena jakości */}
        {result.ocena &&
          (result.ocena.jakosc_miesa ||
            result.ocena.zawartosc_bialka ||
            result.ocena.zawartosc_tluszczu ||
            result.ocena.stosunek_Ca_P ||
            result.ocena.uzupelnienie_witamin ||
            result.ocena.bilans_makro) && (
            <Card className="flex-1 min-w-[280px] basis-full">
              <SectionTitle icon={Award}>Ocena jakości</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {result.ocena.jakosc_miesa && (
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <IconComponent
                      className={
                        getQualityColor(result.ocena.jakosc_miesa) === "success"
                          ? "bg-green-500/20"
                          : getQualityColor(result.ocena.jakosc_miesa) ===
                            "warning"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                      }
                    >
                      {getQualityColor(result.ocena.jakosc_miesa) ===
                      "success" ? (
                        <CheckCircle
                          className="w-5 h-5 text-green-500/100"
                          strokeWidth={1.75}
                        />
                      ) : getQualityColor(result.ocena.jakosc_miesa) ===
                        "warning" ? (
                        <AlertTriangle
                          className="w-5 h-5 text-yellow-500/100"
                          strokeWidth={1.75}
                        />
                      ) : (
                        <XCircle
                          className="w-5 h-5 text-red-500/100"
                          strokeWidth={1.75}
                        />
                      )}
                    </IconComponent>
                    <div className="text-center">
                      <p className="text-xs text-secondary mb-0.5">
                        Jakość mięsa
                      </p>
                      <p className="text-sm font-semibold text-primary capitalize">
                        {result.ocena.jakosc_miesa}
                      </p>
                    </div>
                  </div>
                )}
                {result.ocena.zawartosc_bialka && (
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <IconComponent
                      className={
                        getQualityColor(result.ocena.zawartosc_bialka) ===
                        "success"
                          ? "bg-green-500/20"
                          : getQualityColor(result.ocena.zawartosc_bialka) ===
                            "warning"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                      }
                    >
                      {getQualityColor(result.ocena.zawartosc_bialka) ===
                      "success" ? (
                        <CheckCircle
                          className="w-5 h-5 text-green-500/100"
                          strokeWidth={1.75}
                        />
                      ) : getQualityColor(result.ocena.zawartosc_bialka) ===
                        "warning" ? (
                        <AlertTriangle
                          className="w-5 h-5 text-yellow-500/100"
                          strokeWidth={1.75}
                        />
                      ) : (
                        <XCircle
                          className="w-5 h-5 text-red-500/100"
                          strokeWidth={1.75}
                        />
                      )}
                    </IconComponent>
                    <div className="text-center">
                      <p className="text-xs text-secondary mb-0.5">
                        Zawartość białka
                      </p>
                      <p className="text-sm font-semibold text-primary capitalize">
                        {result.ocena.zawartosc_bialka}
                      </p>
                    </div>
                  </div>
                )}
                {result.ocena.zawartosc_tluszczu && (
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <IconComponent
                      className={
                        getQualityColor(result.ocena.zawartosc_tluszczu) ===
                        "success"
                          ? "bg-green-500/20"
                          : getQualityColor(result.ocena.zawartosc_tluszczu) ===
                            "warning"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                      }
                    >
                      {getQualityColor(result.ocena.zawartosc_tluszczu) ===
                      "success" ? (
                        <CheckCircle
                          className="w-5 h-5 text-green-500/100"
                          strokeWidth={1.75}
                        />
                      ) : getQualityColor(result.ocena.zawartosc_tluszczu) ===
                        "warning" ? (
                        <AlertTriangle
                          className="w-5 h-5 text-yellow-500/100"
                          strokeWidth={1.75}
                        />
                      ) : (
                        <XCircle
                          className="w-5 h-5 text-red-500/100"
                          strokeWidth={1.75}
                        />
                      )}
                    </IconComponent>
                    <div className="text-center">
                      <p className="text-xs text-secondary mb-0.5">
                        Zawartość tłuszczu
                      </p>
                      <p className="text-sm font-semibold text-primary capitalize">
                        {result.ocena.zawartosc_tluszczu}
                      </p>
                    </div>
                  </div>
                )}
                {result.ocena.stosunek_Ca_P && (
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <IconComponent
                      className={
                        getQualityColor(result.ocena.stosunek_Ca_P) ===
                        "success"
                          ? "bg-green-500/20"
                          : getQualityColor(result.ocena.stosunek_Ca_P) ===
                            "warning"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                      }
                    >
                      {getQualityColor(result.ocena.stosunek_Ca_P) ===
                      "success" ? (
                        <CheckCircle
                          className="w-5 h-5 text-green-500/100"
                          strokeWidth={1.75}
                        />
                      ) : getQualityColor(result.ocena.stosunek_Ca_P) ===
                        "warning" ? (
                        <AlertTriangle
                          className="w-5 h-5 text-yellow-500/100"
                          strokeWidth={1.75}
                        />
                      ) : (
                        <XCircle
                          className="w-5 h-5 text-red-500/100"
                          strokeWidth={1.75}
                        />
                      )}
                    </IconComponent>
                    <div className="text-center">
                      <p className="text-xs text-secondary mb-0.5">
                        Stosunek Ca/P
                      </p>
                      <p className="text-sm font-semibold text-primary capitalize">
                        {result.ocena.stosunek_Ca_P}
                      </p>
                    </div>
                  </div>
                )}
                {result.ocena.uzupelnienie_witamin && (
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <IconComponent
                      className={
                        getQualityColor(result.ocena.uzupelnienie_witamin) ===
                        "success"
                          ? "bg-green-500/20"
                          : getQualityColor(
                              result.ocena.uzupelnienie_witamin
                            ) === "warning"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                      }
                    >
                      {getQualityColor(result.ocena.uzupelnienie_witamin) ===
                      "success" ? (
                        <CheckCircle
                          className="w-5 h-5 text-green-500/100"
                          strokeWidth={1.75}
                        />
                      ) : getQualityColor(result.ocena.uzupelnienie_witamin) ===
                        "warning" ? (
                        <AlertTriangle
                          className="w-5 h-5 text-yellow-500/100"
                          strokeWidth={1.75}
                        />
                      ) : (
                        <XCircle
                          className="w-5 h-5 text-red-500/100"
                          strokeWidth={1.75}
                        />
                      )}
                    </IconComponent>
                    <div className="text-center">
                      <p className="text-xs text-secondary mb-0.5">
                        Uzupełnienie witamin
                      </p>
                      <p className="text-sm font-semibold text-primary capitalize">
                        {result.ocena.uzupelnienie_witamin}
                      </p>
                    </div>
                  </div>
                )}
                {result.ocena.bilans_makro && (
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <IconComponent
                      className={
                        getQualityColor(result.ocena.bilans_makro) === "success"
                          ? "bg-green-500/20"
                          : getQualityColor(result.ocena.bilans_makro) ===
                            "warning"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                      }
                    >
                      {getQualityColor(result.ocena.bilans_makro) ===
                      "success" ? (
                        <CheckCircle
                          className="w-5 h-5 text-green-500/100"
                          strokeWidth={1.75}
                        />
                      ) : getQualityColor(result.ocena.bilans_makro) ===
                        "warning" ? (
                        <AlertTriangle
                          className="w-5 h-5 text-yellow-500/100"
                          strokeWidth={1.75}
                        />
                      ) : (
                        <XCircle
                          className="w-5 h-5 text-red-500/100"
                          strokeWidth={1.75}
                        />
                      )}
                    </IconComponent>
                    <div className="text-center">
                      <p className="text-xs text-secondary mb-0.5">
                        Bilans makro
                      </p>
                      <p className="text-sm font-semibold text-primary capitalize">
                        {result.ocena.bilans_makro}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

        {/* Odpowiednia dla */}
        {result.werdykt?.odpowiednia_dla &&
          (result.werdykt.odpowiednia_dla.kociat ||
            result.werdykt.odpowiednia_dla.doroslych ||
            result.werdykt.odpowiednia_dla.seniorow ||
            result.werdykt.odpowiednia_dla.alergikow ||
            result.werdykt.odpowiednia_dla.wybrednych) && (
            <Card className="flex-1 min-w-[280px] basis-full">
              <SectionTitle icon={UserCheck}>Odpowiednia dla</SectionTitle>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {result.werdykt.odpowiednia_dla.kociat !== null &&
                  result.werdykt.odpowiednia_dla.kociat && (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <Baby className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        Kociąt
                      </span>
                    </div>
                  )}
                {result.werdykt.odpowiednia_dla.doroslych !== null &&
                  result.werdykt.odpowiednia_dla.doroslych && (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <Cat className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        Dorosłych
                      </span>
                    </div>
                  )}
                {result.werdykt.odpowiednia_dla.seniorow !== null &&
                  result.werdykt.odpowiednia_dla.seniorow && (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <Users className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        Seniorów
                      </span>
                    </div>
                  )}
                {result.werdykt.odpowiednia_dla.alergikow !== null &&
                  result.werdykt.odpowiednia_dla.alergikow && (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        Alergików
                      </span>
                    </div>
                  )}
                {result.werdykt.odpowiednia_dla.wybrednych !== null &&
                  result.werdykt.odpowiednia_dla.wybrednych && (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <Dog className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        Wybrednych
                      </span>
                    </div>
                  )}
              </div>
            </Card>
          )}

        {/* Zalety */}
        {result.werdykt?.zalety && result.werdykt.zalety.length > 0 && (
          <Card className="flex-1 min-w-[280px] basis-full sm:basis-[calc(12.5%-0.5rem)] border-green-100 bg-gradient-to-br from-green-50/30 to-white">
            <SectionTitle icon={ThumbsUp}>Zalety</SectionTitle>
            <ul className="space-y-3">
              {result.werdykt.zalety.map((zaleta, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-primary p-2 rounded-lg transition-colors"
                >
                  <span className="text-green-500 text-lg font-bold mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span className="leading-relaxed">{zaleta}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Wady */}
        {result.werdykt?.wady && result.werdykt.wady.length > 0 && (
          <Card className="flex-1 min-w-[280px] border-red-100 bg-gradient-to-br from-red-50/30 to-white">
            <SectionTitle icon={ThumbsDown}>Wady</SectionTitle>
            <ul className="space-y-3">
              {result.werdykt.wady.map((wada, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-primaryp-2 rounded-lg transition-colors"
                >
                  <span className="text-red-500 text-lg font-bold mt-0.5 flex-shrink-0">
                    ✗
                  </span>
                  <span className="leading-relaxed">{wada}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

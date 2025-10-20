export interface AnalysisResultData {
  // Podstawowe dane
  nazwa: string;
  producent: string | null;
  gatunek: "kot" | "pies" | "inne";
  rodzaj: "mokra" | "sucha" | "przysmak";
  przeznaczenie:
    | "kocię"
    | "dorosły"
    | "senior"
    | "uniwersalna"
    | "szczenię"
    | "inne";

  // Skład
  sklad: {
    mieso_i_podroby: { name: string; percentage: number | null }[] | null; // np. [{ name: "wołowina", percentage: 60 }, { name: "wątroba", percentage: 10 }]
    warzywa_owoce: { name: string; percentage: number | null }[] | null; // np. [{ name: "marchew", percentage: 30 }, { name: "jabłko", percentage: 20 }]
    inne_dodatki: { name: string; percentage: number | null }[] | null; // np. [{ name: "drożdże piwne", percentage: 5 }, { name: "olej z łososia", percentage: 10 }]
    zboza: boolean | null;
    cukier: boolean | null;
    gmo: boolean | null;
    monobialkowa: boolean | null;
  };

  // Składniki analityczne
  skladniki_analityczne: {
    name: string;
    value: number | null;
  }[];

  // Minerały i mikroelementy
  mineralne: {
    name: string;
    value: number | null;
  }[]; // np. [{ name: "wapń", value: 1.2 }, { name: "fosfor", value: 1.0 }, { name: "magnez", value: null }]

  // Dodatki funkcjonalne i witaminy
  dodatki_dietetyczne: {
    tauryna_mg_kg: number | null;
    witaminy: {
      name: string;
      value: number | null;
    }[];
    mikroelementy:
      | {
          name: string;
          value: number | null;
        }[]
      | null; // np. [{ name: "cynk", value: 25 }, { name: "mangan", value: 1.4 }]
    oleje:
      | {
          name: string;
          value: number | null;
        }[]
      | null; // np. [{ name: "olej z łososia", value: null }]
    inne_dodatki_funkcjonalne:
      | {
          name: string;
          value: number | null;
        }[]
      | null; // np. [{ name: "Yucca Mojave", value: null }, { name: "prebiotyki", value: null }]
  };

  // Energia
  energia: {
    kcal_na_100g: number | null;
    kJ_na_100g: number | null;
  };

  // Ocena jakości (subiektywna na podstawie analizy)
  ocena: {
    jakosc_miesa: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    zawartosc_bialka: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    zawartosc_tluszczu: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    stosunek_Ca_P: "prawidłowy" | "zaburzony" | "brak danych" | null;
    uzupelnienie_witamin: "pełne" | "częściowe" | "brak danych" | null;
    bilans_makro: "dobry" | "średni" | "zły" | null;
    komentarz: string | null;
    ogolna_ocena:
      | "wybitna"
      | "bardzo dobra"
      | "dobra"
      | "średnia"
      | "słaba"
      | null;
    ocena_0_100: number | null;
  };

  // Werdykt końcowy
  werdykt: {
    odpowiednia_dla: {
      kociat: boolean | null;
      doroslych: boolean | null;
      seniorow: boolean | null;
      alergikow: boolean | null;
      wybrednych: boolean | null;
    };
    zalety: string[];
    wady: string[];
    ocena_koncowa:
      | "wybitna"
      | "bardzo dobra"
      | "dobra"
      | "średnia"
      | "słaba"
      | "niezalecana"
      | null;
  };

  // Dodatkowe dane
  meta: {
    kraj_produkcji: string | null;
    typ_bialka: string | null; // np. "drób", "ryba", "wołowina", "mieszane"
    zrodlo_danych: string | null; // np. "oficjalny opis", "Aukcja Allegro", "opakowanie"
    data_analizy: string; // ISO format
  };
}

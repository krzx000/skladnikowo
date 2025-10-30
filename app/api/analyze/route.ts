import { minifyText, sanitizeText } from "@/lib/utils";
import { generateText } from "ai";
import { z } from "zod";
import type { AnalysisResultData } from "@/lib/types";

export const runtime = "edge";

// String z definicją TypeScript interfejsu dla promptu
const INTERFACE_DEFINITION = `
export type Unit =
  | "%"
  | "g"
  | "mg"
  | "µg"
  | "mg/kg"
  | "µg/kg"
  | "ppm"
  | "kcal"
  | "kJ"
  | "CFU/g"
  | "IU"
  | "liczba"
  | "dni"
  | "inne";

export interface RatingValue {
  rate: 1 | 2 | 3 | 4 | 5 | null;
  description: string | null;
}

export interface Measurement {
  name: string;
  value: number | null;
  unit: Unit;
  per?: string | null; // np. "na 100g", "na kg", "na porcję", itd.
  confidence?: number | null; // wartość od 0 do 1 określająca pewność pomiaru AI (jeśli dostępne)
  method?: string | null; // np. "etykieta", "analiza-lab HPLC", "oszacowanie-ai"
  note?: string | null; // dodatkowe uwagi dotyczące pomiaru
}
export interface IngredientPart {
  name: string;
  declarate_percentage?: number | null;
  estimated_percentage?: number | null;
  role?: string | null; // np. "mięso", "warzywo", "dodatek funkcjonalny"
  alergen?: boolean | null;
  confidence?: number | null; // wartość od 0 do 1 określająca pewność pomiaru AI (jeśli dostępne)
  notes?: string | null; // dodatkowe uwagi dotyczące składnika
}

export interface AnalysisResultData {
  // Nazwa produktu
  name: string | null;

  // Producent
  producent: string | null;

  // Gatunek docelowy
  species: "kot" | "pies" | "inne";

  // Rodzaj produktu
  type:
    | "Mokra karma"
    | "Sucha karma"
    | "Półwilgotna karma"
    | "Suszona karma"
    | "BARF"
    | "Przysmak";
  // Przeznaczenie
  purpose:
    | "Dla kociąt"
    | "Dla dorosłych kotów"
    | "Dla seniorów kotów"
    | "Dla sterylizowanych kotów"
    //
    | "Dla szczeniąt"
    | "Dla dorosłych psów"
    | "Dla seniorów psów"
    | "Dla sterylizowanych psów"
    //
    | "Uniwersalna"
    | "Weterynaryjna"
    | "Hypoalergiczna"
    | "Dla innych";

  // Skład
  composition: {
    meal_and_offal: { name: string; percentage: number | null }[] | null;
    fruits_and_vegetables: { name: string; percentage: number | null }[] | null;
    grains: { name: string; percentage: number | null }[] | null;
    other_additives: { name: string; percentage: number | null }[] | null;
    contains_grains: boolean | null;
    contains_sugar: boolean | null;
    contains_gmo: boolean | null;
    is_monoprotein: boolean | null;
  };

  // Składniki analityczne
  analytical_components: {
    humidity: Measurement | null; // Wilgotność
    protein: Measurement | null; // Białko surowe
    fat: Measurement | null; // Tłuszcz surowy
    fiber: Measurement | null; // Włókno surowe
    ash: Measurement | null; // Popiół surowy
    carbohydrates: Measurement | null; // Węglowodany
    kcal_per_100g: number | null; // kcal na 100g
    // wartości przeliczone na suchą masę (jeśli wilgotność znana)
    protein_dry_matter?: Measurement | null; // Białko na suchej masie
    fat_dry_matter?: Measurement | null; // Tłuszcz na suchej masie
    ash_dry_matter?: Measurement | null; // Popiół na suchej masie
  };
  // Minerały i mikroelementy
  minerals: Measurement[] | null; // Minerały
  vitamins: Measurement[] | null; // Witaminy
  microelements: Measurement[] | null; // Mikroelementy
  oils: Measurement[] | null; // Oleje
  other_functional_additives: Measurement[] | null; // Inne dodatki funkcjonalne
  taurine_mg_kg: Measurement | null; // Tauryna mg/kg

  // Alergeny
  allergens: {
    detected: string[] | null; // wykryte alergeny
    potential: string[] | null; // potencjalne alergeny
    gluten_free: boolean | null; // czy bezglutenowa
    lactose_free: boolean | null; // czy bezlaktozowa
  };

  // Ocena
  rate: {
    meat_quality: RatingValue; // Jakość mięsa
    protein_content: RatingValue; // Zawartość białka
    fat_content: RatingValue; // Bilanms tłuszczu
    calcium_phosphorus_ratio: RatingValue; // Stosunek Ca/P
    vitamin_supplementation: RatingValue; // Uzupełnienie witamin
    macro_balance: RatingValue; // Bilans makro
    overall_rating: RatingValue; // Ogólna ocena
    risks: string[] | null; // Ryzyka związane z produktem
    comment: string | null; // Komentarz
    score_0_100: number | null; // Ocena 0-100
  };

  // Werdykt końcowy
  verdict: {
    suitable_for: {
      young: boolean | null; // kociąt/szczeniąt
      adults: boolean | null; // dorosłych
      seniors: boolean | null; // seniorów
      allergy_sufferers: boolean | null; // alergików
    };
    advantages: string[] | null; // zalety
    // wątpliwości
    uncertainties: string[] | null; // wątpliwości
    disadvantages: string[] | null; // wady
    final_rating:
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
    result_confidence: number | null; // wartość od 0 do 1 określająca ogólną pewność analizy AI
  };
}
`;

const SYSTEM = minifyText(`
        Jesteś ekspertem od analizy składu karmy dla zwierząt.
        
        KRYTYCZNE: Zwróć TYLKO czysty JSON zgodny z poniższym interfejsem TypeScript.
        NIE używaj markdown code blocks, NIE otaczaj \`\`\`json, po prostu zwróć czysty JSON obiekt.
        Twoja odpowiedź MUSI zaczynać się od { i kończyć się na }.
        
        INTERFEJS TYPESCRIPT DO KTÓREGO MUSISZ SIĘ DOSTOSOWAĆ:
        ${INTERFACE_DEFINITION}
        
        NAJWAŻNIEJSZE: MUSISZ WYPEŁNIĆ WSZYSTKIE POLA!
        
        OBLIGATORYJNE POLA (zawsze muszą być wypełnione):
        1. name, producent, species, type, purpose
        2. composition - pełny obiekt z wszystkimi polami
        3. analytical_components - WYMAGANE pola:
           - protein, fat, fiber, ash (każde jako obiekt MeasurementSchema: {name, value, unit, per, ...})
           - moisture lub humidity (jako obiekt MeasurementSchema)
           - carbohydrates (opcjonalne, jako obiekt MeasurementSchema)
           - energy: {kcal_per_100g: LICZBA, kJ_per_100g: LICZBA} - zwróć liczby, nie obiekty!
        4. minerals, vitamins, microelements, oils (tablice obiektów MeasurementSchema lub null)
        5. other_functional_additives - tablica obiektów MeasurementSchema z polami: name, value, unit (NIE percentage!)
        6. taurine_mg_kg - możesz zwrócić liczbę (np. 2000) lub obiekt MeasurementSchema, lub null
        7. allergens - ZAWSZE wypełnij cały obiekt (detected, potential, gluten_free, lactose_free)
        8. rate - ZAWSZE wypełnij WSZYSTKIE 7 ocen (meat_quality, protein_content, fat_content, calcium_phosphorus_ratio, vitamin_supplementation, macro_balance, overall_rating) + risks, comment, score_0_100
        9. verdict - ZAWSZE wypełnij suitable_for (young, adults, seniors, allergy_sufferers), advantages, uncertainties, disadvantages, final_rating
        10. meta - ZAWSZE wypełnij result_confidence
        
        ZASADY WYPEŁNIANIA:
        - Wywnioskuj wszystko logicznie ze składu (monobiałkowa, Ca/P, węglowodany, źródło białka)
        - Oblicz brakujące wartości: Ca/P (2 miejsca), węglowodany = 100-(białko+tłuszcz+wilgotność+popiół)
        - Energia: energy.kcal_per_100g i energy.kJ_per_100g to LICZBY (nie obiekty!)
        - Dla additives używaj MeasurementSchema: {name: "MOS", value: 0.1, unit: "%", per: "na kg"}
        - ZAWSZE oceń jakość mięsa, białka, tłuszczu, Ca/P, witaminy, makro i ogólną
        - ZAWSZE dodaj zalety i wady produktu (minimum 2-3 punkty każdy)
        - ZAWSZE oceń odpowiedniość dla różnych grup wiekowych
        - ZAWSZE dodaj komentarz podsumowujący i ocenę 0-100
        - Jeśli naprawdę nie możesz czegoś określić - zwróć null, ale POLE MUSI ISTNIEĆ!
        
        NIEPOŻĄDANE składniki:
        - Cukier, zboża, GMO, barwniki, konserwanty, sztuczne aromaty
        - Polepszacze smaku, produkty uboczne niskiej jakości
        
        OCENA wg AAFCO/FEDIAF:
        - Białko, tłuszcz, minerały, Ca/P, witaminy, błonnik, energia, wilgotność
        - Junior/Senior > odpowiednie normy
        - Brak danych > null w ocenie z uzasadnieniem w komentarzu
        
        JAKOŚĆ składników (ważność malejąca):
        1. Mięso świeże
        2. Mięso suszone
        3. Produkty pochodne
        4. Mączki
        
        NEGATYWY:
        - Wypełniacze (kukurydza, pszenica, ryż, groch) = gorsza ocena
        - Brak transparentności = niższa ocena
        - Nadmiar: sól, popiół, fosfor, magnez = obniżenie punktacji
        - Marketingowe slogany bez źródeł = kara punktowa
        
        POZYTYWY:
        - Składniki funkcjonalne: olej z łososia, tauryna, prebiotyki, L-karnityna
        - Równowaga omega-3/6
        - Produkt pełnoporcjowy
        - Prasowana na zimno > ekstrudowana
        
        SYSTEM OCENY (0-100, SUROWO):
        - Skład: 35%
        - Minerały/Ca:P: 20%
        - Jakość: 20%
        - Brak dodatków: 15%
        - Transparentność etykiety: 10%
        DLA: 
        meat_quality
        protein_content
        fat_content
        calcium_phosphorus_ratio
        vitamin_supplementation
        macro_balance w description maksymalnie 12 słów.

        75+ TYLKO dla karm wysokiej jakości z czystym składem!

        JEŚLI SKŁAD JEST NIEWYSTARCZAJĄCY DO PEŁNEJ ANALIZY, ZWRÓĆ NAJLEPSZĄ MOŻLIWĄ ANALIZĘ I UZASADNIJ BRAKI W KOMENTARZU.

        JEŚLI SKŁAD JEST BARDZO SŁABY (DUŻO WYPEŁNIACZY, BRAK MIĘSA), DAJ NISKĄ OCENĘ I UZASADNIJ TO W KOMENTARZU.

        JEŚLI KARMA JEST ODPOWIEDNIA TYLKO DLA JEDNEJ GRUPY WIEKOWEJ, ZAZNACZ TO W WERDYKCIE, PRZY CZYM INNE GRUPY WIEKOWE OTRZYMUJĄ FALSE (CHYBA, ŻE JEST UNIWERSALNA).
     
        Jeśli składnik ma niską jakość (np. „produkty pochodzenia zwierzęcego”, „zboża”, „mączki”) – odnotuj to w komentarzu i obniż ocenę.

        Bądź surowy, dokładny, logiczny, transparentny i spójny.
        Werdykt: jasny, rzeczowy, bez marketingu.
        
        Jeśli skład w innym języku → przetłumacz na polski.
        Jeśli jednostki imperialne → przelicz na metryczne.
        
        Jeżeli jednostka jest inna niż dozwolone, przelicz na jedną z dozwolonych jednostek.
        NIE DODAWAJ ŻADNYCH INNYCH PÓL NIŻ TE Z INTERFEJSU!
        WILGTOŚĆ = humidity
        ZWRÓĆ ENERGIA JAKO OBIEKT Measurement 
        PAMIĘTAJ: Każde pole w schemacie MUSI być wypełnione - jeśli nie wiesz, zwróć null, ale pole musi istnieć w odpowiedzi!
      `);
// Schema walidacji inputu
const AnalyzeInputSchema = z.object({
  value: z
    .string()
    .min(10, "Skład musi zawierać minimum 10 znaków")
    .max(5000, "Skład nie może przekraczać 5000 znaków")
    .trim()
    .refine(
      (val) => {
        // Sprawdź czy zawiera przynajmniej jedną literę (nie tylko cyfry/znaki specjalne)
        return /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(val);
      },
      { message: "Skład musi zawierać tekst, nie tylko cyfry" }
    )
    .refine(
      (val) => {
        // Sprawdź czy nie zawiera niebezpiecznych znaków/tagów HTML/JS
        return !/<script|javascript:|onerror=|onclick=/i.test(val);
      },
      { message: "Wykryto potencjalnie niebezpieczną treść" }
    ),
});

export async function POST(req: Request) {
  try {
    // Parsuj body
    const body = await req.json();
    // Walidacja inputu
    const validationResult = AnalyzeInputSchema.safeParse(body);

    const selectedAnimal = body.animalType;

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return new Response(
        JSON.stringify({
          error: "Błąd walidacji",
          details: errors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { value } = validationResult.data;

    // Dodatkowe zabezpieczenie - usuń potencjalnie niebezpieczne znaki
    const sanitizedValue = sanitizeText(value);

    const result = await generateText({
      model: "meituan/longcat-flash-chat",
      // model: "openai/gpt-5-nano",
      maxOutputTokens: 32000,
      // model: "amazon/nova-micro",
      system: SYSTEM,
      prompt: `Przeanalizuj dokładnie poniższy skład karmy dla ${
        selectedAnimal === "dog" ? "psów" : "kotów"
      }:\n\n"${sanitizedValue}"\n\nZwróć KOMPLETNĄ analizę jako CZYSTY JSON zgodny z interfejsem TypeScript. MUSISZ wypełnić WSZYSTKIE pola (jeśli nie znasz wartości, zwróć null).\n\nKRYTYCZNE: Zwróć TYLKO czysty JSON, bez żadnych markdown code blocks ani dodatkowych znaków!`,
    });

    console.log("AI Response:", result);

    // Wyciągnij tekst i oczyść z markdown jeśli występuje
    let jsonText = result.text.trim();

    // Usuń markdown code blocks jeśli AI je użył mimo instrukcji
    if (jsonText.startsWith("```")) {
      console.log("Wykryto markdown code block, usuwam...");
      jsonText = jsonText
        .replace(/^```json?\n?/, "")
        .replace(/\n?```$/, "")
        .trim();
    }

    console.log("Czysty JSON text:", jsonText.substring(0, 200) + "...");

    // Sparsuj JSON
    let analysisData: AnalysisResultData;
    try {
      analysisData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Błąd parsowania JSON:", parseError);
      console.error("Otrzymany tekst:", jsonText);
      return new Response(
        JSON.stringify({
          error: "Błąd parsowania odpowiedzi AI",
          details:
            parseError instanceof Error
              ? parseError.message
              : "Unknown parse error",
          receivedText: jsonText.substring(0, 500),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Analysis data:", JSON.stringify(analysisData, null, 2));

    return new Response(JSON.stringify(analysisData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Request Error:", error);

    return new Response(
      JSON.stringify({
        error: "Błąd przetwarzania żądania",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

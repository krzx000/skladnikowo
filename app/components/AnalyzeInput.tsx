"use client";
import { useRef, useEffect, useState } from "react";
import { Button } from "./Button";
import { Sparkles, LoaderCircle } from "lucide-react";
import { AnalysisResultData } from "@/lib/types";

export const AnalyzeInput = ({
  onResultChange,
}: {
  onResultChange: (result: AnalysisResultData | null) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Sprawdź czy jest włączony debug mode
  useEffect(() => {
    fetch("/api/debug")
      .then((res) => res.json())
      .then((data) => setIsDebugMode(data.debug))
      .catch(() => setIsDebugMode(false));
  }, []);

  // Wczytaj czas ostatniej analizy z localStorage przy montowaniu
  useEffect(() => {
    if (isDebugMode) return; // Pomiń w trybie debug

    const savedTime = localStorage.getItem("lastAnalysisTime");
    if (savedTime) {
      const lastTime = parseInt(savedTime, 10);
      const elapsed = Date.now() - lastTime;
      const remaining = Math.max(0, 120000 - elapsed);
      setRemainingTime(Math.ceil(remaining / 1000));
    }
  }, [isDebugMode]);

  // Sprawdź pozostały czas co sekundę
  useEffect(() => {
    if (isDebugMode || remainingTime <= 0) return; // Pomiń w trybie debug

    const interval = setInterval(() => {
      const savedTime = localStorage.getItem("lastAnalysisTime");
      if (!savedTime) {
        setRemainingTime(0);
        return;
      }

      const lastTime = parseInt(savedTime, 10);
      const elapsed = Date.now() - lastTime;
      const remaining = Math.max(0, 120000 - elapsed);
      const remainingSeconds = Math.ceil(remaining / 1000);

      setRemainingTime(remainingSeconds);

      if (remainingSeconds <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, isDebugMode]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Auto-resize textarea
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Sprawdź czy to multiline (więcej niż 1 linia lub wysokość przekracza lineHeight)
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setIsMultiline(false);
      return;
    }

    const lines = value.split("\n").length;
    const lineHeight =
      parseInt(window.getComputedStyle(textarea).lineHeight) * 1.75;

    setIsMultiline(textarea.scrollHeight > lineHeight || lines > 1);
  }, [value]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!value.trim()) return;

    // Sprawdź czy minęły 2 minuty od ostatniej analizy z localStorage (pomiń w debug mode)
    if (!isDebugMode) {
      const savedTime = localStorage.getItem("lastAnalysisTime");
      if (savedTime) {
        const lastTime = parseInt(savedTime, 10);
        const elapsed = Date.now() - lastTime;
        if (elapsed < 120000) {
          // Jeszcze nie minęły 2 minuty
          return;
        }
      }
    }

    setIsLoading(true);
    onResultChange(null);

    // Zapisz aktualny czas do localStorage (tylko jeśli nie debug mode)
    if (!isDebugMode) {
      const currentTime = Date.now();
      localStorage.setItem("lastAnalysisTime", currentTime.toString());
      setRemainingTime(120); // Ustaw timer na 120 sekund
    }

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });

    const text = await res.text(); // pobieramy cały tekst od razu
    try {
      const json: AnalysisResultData = JSON.parse(text);
      onResultChange(json);
      setValue(""); // Wyczyść input po otrzymaniu wyniku
    } catch (err) {
      console.error("Błąd parsowania JSON:", err);
      onResultChange(null);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-2 bg-white rounded-4xl"
      role="search"
      aria-label="Formularz analizy składników"
    >
      <div
        className={
          isMultiline
            ? "flex flex-col gap-1 items-end"
            : "flex flex-col md:flex-row items-end md:items-center gap-3 md:gap-4"
        }
      >
        <label htmlFor="ingredients-input" className="sr-only">
          Wpisz składniki produktu
        </label>
        <textarea
          id="ingredients-input"
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className={`pl-4 py-2 outline-none resize-none overflow-hidden rounded-4xl text-base min-h-[24px] ${
            isMultiline ? "w-full px-4" : "w-full md:flex-1"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          placeholder="Wpisz tutaj składniki produktu..."
          rows={1}
          aria-label="Pole tekstowe składników"
          aria-describedby="ingredients-hint"
        />
        <span id="ingredients-hint" className="sr-only">
          Naciśnij Ctrl+Enter lub Cmd+Enter, aby przeanalizować składniki
        </span>

        <Button
          type="submit"
          disabled={
            !value.trim() || isLoading || (!isDebugMode && remainingTime > 0)
          }
          icon
          aria-label="Analizuj wprowadzone składniki"
        >
          {isLoading ? (
            <LoaderCircle
              size={20}
              aria-hidden="true"
              className="animate-spin"
            />
          ) : (
            <Sparkles size={20} aria-hidden="true" />
          )}
          {isLoading
            ? "Analizuję..."
            : !isDebugMode && remainingTime > 0
            ? `Poczekaj ${remainingTime}s`
            : "Analizuj składniki"}
        </Button>
      </div>

      {/* {result && (
        <div className="mt-4 p-4 bg-orange-50 rounded-xl w-full text-gray-800 whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
          {result.nazwa && <p>Nazwa: {result.nazwa}</p>}
          {result.producent && <p>Producent: {result.producent}</p>}
          {result.gatunek && <p>Gatunek: {result.gatunek}</p>}
          {result.rodzaj && <p>Rodzaj: {result.rodzaj}</p>}
          {result.przeznaczenie && <p>Przeznaczenie: {result.przeznaczenie}</p>}
          {result.sklad && (
            <div>
              <h3 className="font-bold mt-2">Skład:</h3>
              {result.sklad.mieso_i_podroby && (
                <div>
                  <h4 className="font-semibold">Mięso i podroby:</h4>
                  <ul className="list-disc list-inside">
                    {result.sklad.mieso_i_podroby.map((item, index) => (
                      <li key={index}>
                        {item.name}
                        {item.percentage !== null
                          ? ` - ${item.percentage}%`
                          : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.sklad.warzywa_owoce && (
                <div>
                  <h4 className="font-semibold">Warzywa i owoce:</h4>
                  <ul className="list-disc list-inside">
                    {result.sklad.warzywa_owoce.map((item, index) => (
                      <li key={index}>
                        {item.name}

                        {item.percentage !== null
                          ? ` - ${item.percentage}%`
                          : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.sklad.inne_dodatki && (
                <div>
                  <h4 className="font-semibold">Inne dodatki:</h4>
                  <ul className="list-disc list-inside">
                    {result.sklad.inne_dodatki.map((item, index) => (
                      <li key={index}>
                        {item.name}
                        {item.percentage !== null
                          ? ` - ${item.percentage}%`
                          : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )} */}
    </form>
  );
};

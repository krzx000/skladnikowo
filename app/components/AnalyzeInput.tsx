"use client";
import { useRef, useEffect, useState } from "react";
import { Button } from "./Button";
import { Sparkles } from "lucide-react";

export const AnalyzeInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const [value, setValue] = useState("");

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

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!value.trim()) return;

    // Tutaj można dodać logikę analizy składników
    console.log("Analyzing ingredients:", value);
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
            : "flex items-center gap-4"
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
          className={`pl-4 py-2 outline-none resize-none overflow-hidden rounded-4xl text-base min-h-[24px] ${
            isMultiline ? "w-full px-4" : "flex-1"
          }`}
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
          disabled={!value.trim()}
          icon
          aria-label="Analizuj wprowadzone składniki"
        >
          <Sparkles size={20} aria-hidden="true" />
          Analizuj składniki
        </Button>
      </div>
    </form>
  );
};

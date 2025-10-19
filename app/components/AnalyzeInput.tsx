"use client";
import { useRef, useEffect, useState } from "react";

export const AnalyzeInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Sprawdź czy wartość to tylko białe znaki
    if (value.trim() === "") {
      setIsMultiline(false);
      return;
    }

    const lines = value.split("\n").length;
    const lineHeight =
      parseInt(window.getComputedStyle(textarea).lineHeight) * 1.75;

    if (textarea.scrollHeight > lineHeight || lines > 1) {
      setIsMultiline(true);
    }
  }, [value]);

  const textareaBaseClasses =
    "pl-4 py-2 outline-none resize-none overflow-hidden rounded-3xl text-base leading-6 min-h-[24px]";
  const buttonClasses =
    "px-6 py-3.5 text-white rounded-full bg-orange font-bold text-sm whitespace-nowrap active:scale-95 disabled:opacity-50";

  return (
    <div className="relative p-2 bg-white rounded-4xl">
      <div
        className={
          isMultiline
            ? "flex flex-col gap-1 items-end"
            : "flex items-center gap-4"
        }
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${textareaBaseClasses} ${
            isMultiline ? "w-full px-4" : "flex-1"
          }`}
          placeholder="Wklej składniki..."
          rows={1}
        />

        <button disabled={!value.trim()} className={buttonClasses}>
          Analizuj składniki
        </button>
      </div>
    </div>
  );
};

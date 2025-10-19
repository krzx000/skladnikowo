"use client";
import { useEffect, useRef } from "react";

export const Picker = ({
  items,
  onSelect,
  selectedValue,
}: {
  items: { value: string; label: string }[];
  selectedValue: string;
  onSelect?: (value: string) => void;
}) => {
  const blobRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeBlob = () => {
      const container = containerRef.current;
      const blob = blobRef.current;
      if (!container || !blob) return;

      const activeButton = container.querySelector(
        `button[data-value="${selectedValue}"]`
      ) as HTMLButtonElement;

      if (activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        blob.style.width = `${buttonRect.width}px`;
        blob.style.height = `${buttonRect.height}px`;
        blob.style.transform = `translate(${
          buttonRect.left - parentRect.left - 4
        }px, ${buttonRect.top - parentRect.top - 4}px)`;
      }
    };

    initializeBlob();
  }, [selectedValue]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSelect?.(e.currentTarget.getAttribute("data-value")!);
    const button = e.currentTarget;
    const blob = blobRef.current;
    if (blob) {
      const buttonRect = button.getBoundingClientRect();
      const parentRect = button.parentElement!.getBoundingClientRect();
      blob.style.width = `${buttonRect.width}px`;
      blob.style.height = `${buttonRect.height}px`;
      blob.style.transform = `translate(${
        buttonRect.left - parentRect.left - 4
      }px, ${buttonRect.top - parentRect.top - 4}px)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex p-1 rounded-full bg-orange/20 backdrop-blur-md"
    >
      <span
        ref={blobRef}
        className="absolute z-0 transition-all bg-white rounded-full"
      />

      {items.map((item) => (
        <button
          onClick={handleClick}
          key={item.value}
          data-value={item.value}
          className={`z-10 px-6 py-2 text-sm rounded-full cursor-pointer font-semibold transition-all ${
            selectedValue === item.value ? "text-primary" : "text-secondary"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

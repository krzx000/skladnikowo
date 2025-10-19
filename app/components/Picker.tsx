"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export const Picker = ({
  items,
  onSelect,
  selectedValue,
  name = "picker",
}: {
  items: { value: string; label: string }[];
  selectedValue: string;
  onSelect?: (value: string) => void;
  name?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blobPosition, setBlobPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const updateBlobPosition = useCallback((label: HTMLLabelElement) => {
    const parentRect = label.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const labelRect = label.getBoundingClientRect();
    setBlobPosition({
      x: labelRect.left - parentRect.left - 4,
      y: labelRect.top - parentRect.top - 4,
      width: labelRect.width,
      height: labelRect.height,
    });

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeLabel = container.querySelector(
      `label[data-value="${selectedValue}"]`
    ) as HTMLLabelElement;

    if (activeLabel) {
      updateBlobPosition(activeLabel);
    }
  }, [selectedValue, updateBlobPosition]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    onSelect?.(value);

    const label = e.currentTarget.parentElement as HTMLLabelElement;
    if (label) {
      updateBlobPosition(label);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex p-1 rounded-full bg-orange/20 backdrop-blur-md"
      role="group"
      aria-label="Wybierz typ analizy"
    >
      {/* Animowany blob wskaźnik */}
      <motion.span
        className="absolute z-0 bg-white rounded-full"
        animate={{
          x: blobPosition.x,
          y: blobPosition.y,
          width: blobPosition.width,
          height: blobPosition.height,
          scale: isAnimating ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        aria-hidden="true"
      />

      {items.map((item) => {
        const isSelected = selectedValue === item.value;

        return (
          <label
            key={item.value}
            data-value={item.value}
            className={`relative z-10 px-6 py-2 text-sm rounded-full cursor-pointer font-semibold transition-colors ${
              isSelected ? "text-primary" : "text-secondary"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={item.value}
              checked={isSelected}
              onChange={handleChange}
              className="sr-only"
              aria-label={item.label}
            />
            {item.label}
          </label>
        );
      })}
    </div>
  );
};

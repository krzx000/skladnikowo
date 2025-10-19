interface IconProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "span" | "button";
  ariaLabel?: string;
}

export const Icon: React.FC<IconProps> = ({
  children,
  className = "",
  onClick,
  type = "span",
  ariaLabel,
}) => {
  const baseClassName =
    `p-2 inline-flex items-center justify-center rounded-full transition-all hover:scale-[1.05] active:scale-x-[1.1] active:scale-y-[0.95] ${
      onClick ? "cursor-pointer" : ""
    } ${className}`.trim();

  if (type === "button") {
    return (
      <button
        type="button"
        className={baseClassName}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }

  return (
    <span
      className={baseClassName}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </span>
  );
};

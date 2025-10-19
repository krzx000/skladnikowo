interface IconProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "span" | "button";
}

export const Icon: React.FC<IconProps> = ({
  children,
  className = "",
  onClick,
  type = "span",
}) => {
  const combinedClassName =
    `p-2 transition-all rounded-full hover:scale-105 active:scale-95 inline-flex items-center justify-center ${
      onClick ? "cursor-pointer" : ""
    } ${className}`.trim();

  if (type === "button") {
    return (
      <button type="button" className={combinedClassName} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <span className={combinedClassName} onClick={onClick}>
      {children}
    </span>
  );
};

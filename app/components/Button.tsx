interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "icon"> {
  children: React.ReactNode;
  icon?: boolean;
  variant?: "primary" | "white" | "white-transparent";
}

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  children,
  icon = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  // Warianty kolorystyczne
  const variantClasses = {
    primary: `bg-orange text-white ${
      disabled ? "bg-orange/75" : "hover:bg-orange/90"
    }`,
    white: `bg-white text-[#50304d]/75 ${
      disabled ? "bg-white/75" : "hover:bg-white/90"
    }`,
    "white-transparent": `bg-white/25 text-white ${
      disabled ? "bg-white/15" : "hover:bg-white/35"
    }`,
  };

  const baseClassName =
    `px-6 py-3.5 text-sm font-bold whitespace-nowrap rounded-full transition-all 
    ${icon ? "flex items-center gap-2" : ""} 
    ${disabled ? "cursor-not-allowed" : "cursor-pointer"} 
    ${
      !disabled
        ? "hover:scale-x-[1.025] hover:scale-y-[1.05] active:scale-x-[1.1] active:scale-y-[0.95]"
        : ""
    } 
    ${variantClasses[variant]}
    ${className}`
      .trim()
      .replace(/\s+/g, " ");

  return (
    <button
      type="button"
      disabled={disabled}
      className={baseClassName}
      {...props}
    >
      {children}
    </button>
  );
};

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "icon"> {
  children: React.ReactNode;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  children,
  icon = false,
  className = "",
  ...props
}) => {
  const baseClassName =
    `px-6 py-3.5 text-sm font-bold text-white whitespace-nowrap rounded-full bg-orange transition-all 
    ${icon ? "flex items-center gap-2" : ""} 
    ${disabled ? "cursor-not-allowed bg-orange/75" : "cursor-pointer"} 
    ${
      !disabled
        ? "hover:scale-x-[1.025] hover:scale-y-[1.05] active:scale-x-[1.1] active:scale-y-[0.95]"
        : ""
    } 
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

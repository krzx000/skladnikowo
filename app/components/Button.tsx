interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "icon"> {
  children: React.ReactNode;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`${
        icon ? "flex items-center gap-2" : ""
      }  px-6 py-3.5 text-white ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } rounded-full bg-orange font-bold text-sm whitespace-nowrap enabled:hover:scale-x-[1.025] enabled:hover:scale-y-[1.05] enabled:active:scale-y-[0.95] enabled:active:scale-x-[1.1] disabled:bg-orange/75 transition-all ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

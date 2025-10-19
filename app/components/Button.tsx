import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "icon"> {
  children: React.ReactNode;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  icon,
  ...props
}) => {
  return (
    <motion.button
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        scale: { duration: 0.2 },
      }}
      className={`${
        icon ? "flex items-center gap-2" : ""
      }  px-6 py-3.5 text-white ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } rounded-full bg-orange font-bold text-sm whitespace-nowrap disabled:bg-orange/75 transition-all`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

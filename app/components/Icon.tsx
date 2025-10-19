interface IconProps {
  children: React.ReactNode;
  backgroundColor?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  children,
  backgroundColor = "transparent",
  onClick,
}) => {
  return (
    <span
      className={`inline-flex items-center justify-center ${
        onClick ? "cursor-pointer" : ""
      }`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

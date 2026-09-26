interface ButtonProps {
  label: string;
  onClickFunction?: () => void;
  width?: string;
  textSize?: string;
  disabled?: boolean;
  variant?: "primary" | "outline";
}

export const Button = ({
  label,
  onClickFunction,
  width = "4rem",
  textSize = "16px",
  disabled = false,
  variant = "primary",
}: ButtonProps) => {
  const variantClasses = {
    primary: "bg-[#961e0f] text-white",
    outline: "bg-white text-red-800 border border-red-800",
  };

  return (
    <button
      className={`${variantClasses[variant]} px-4 py-1.5 rounded-md h-10 truncate cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{ width, fontSize: textSize }}
      onClick={onClickFunction}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

interface ButtonProps {
  label: string;
  onClickFunction?: () => void;
  width?: string;
  textSize?: string;
  disabled?: boolean;
}

export const Button = ({
  label,
  onClickFunction,
  width = "4rem",
  textSize = "16px",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className="bg-[#961e0f] text-white px-4 py-1.5 rounded-md h-10 truncate cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ width, fontSize: textSize }}
      onClick={onClickFunction}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

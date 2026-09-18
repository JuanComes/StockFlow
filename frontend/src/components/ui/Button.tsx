interface ButtonProps {
  label: string;
  onClickFunction?: () => void;
  width?: string;
  textSize?: string;
}

export const Button = ({
  label,
  onClickFunction,
  width = "4rem",
  textSize = "16px",
}: ButtonProps) => {
  return (
    <button
      className="bg-[#961e0f] text-white px-4 py-1.5 rounded-md h-10 truncate cursor-pointer"
      style={{ width, fontSize: textSize }}
      onClick={onClickFunction}
    >
      {label}
    </button>
  );
};

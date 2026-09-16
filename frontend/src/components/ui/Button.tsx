interface ButtonProps {
  label: string;
  onClickFunction?: () => void;
}

export const Button = ({ label, onClickFunction }: ButtonProps) => {
  return (
    <button
      className="bg-[#961e0f] text-white px-4 py-1.5 rounded-md"
      onClick={onClickFunction}
    >
      {label}
    </button>
  );
};

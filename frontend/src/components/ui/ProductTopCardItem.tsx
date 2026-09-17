import type { LucideIcon } from "lucide-react";

interface ProductTopCardItemProps {
  value: number | undefined;
  icon: LucideIcon;
  label: string;
  unit: string;
}

export const ProductTopCardItem = ({
  value,
  icon: Icon,
  label,
  unit,
}: ProductTopCardItemProps) => {
  return (
    <div className="flex md:gap-1 gap-0.5 border-2 border-red-800 rounded-md p-0.5 w-20 md:w-24">
      <div className="flex items-center justify-center">
        <Icon className="text-red-800 w-4 h-4 md:w-6 md:h-6 " />
      </div>

      <div className="flex flex-col leading-5">
        <span className="truncate text-sm">{label}</span>

        <span className="text-red-800 font-semibold truncate">
          {value} {unit}
        </span>
      </div>
    </div>
  );
};

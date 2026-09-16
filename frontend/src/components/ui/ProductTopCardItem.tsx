import type { LucideIcon } from "lucide-react";

interface ProductTopCardItemProps {
  item: number | undefined;
  icon: LucideIcon;
}

export const ProductTopCardItem = ({
  item,
  icon: Icon,
}: ProductTopCardItemProps) => {
  return (
    <div className="flex gap-1">
      <div className="flex items-center justify-center">
        <Icon className="text-red-800" />
      </div>

      <div className="flex flex-col leading-5">
        <span>On Hand</span>
        <span className="text-red-800 font-semibold">{item} Units</span>
      </div>
    </div>
  );
};

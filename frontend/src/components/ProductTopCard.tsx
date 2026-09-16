import { ChartBar } from "lucide-react";
import { ProductTopCardItem } from "./ui/ProductTopCardItem";

interface ProductTopCardProps {
  onHand: number | undefined;
}

export const ProductTopCard = ({ onHand }: ProductTopCardProps) => {
  return (
    <div className="h-12 border-2 border-red-800 rounded-md p-0.5">
      <ProductTopCardItem icon={ChartBar} item={onHand} />
      <ProductTopCardItem icon={ChartBar} item={onHand} />
      <ProductTopCardItem icon={ChartBar} item={onHand} />
    </div>
  );
};

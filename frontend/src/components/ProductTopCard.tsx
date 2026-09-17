import { ArrowDownToLine, ArrowUpFromLine, ChartBar, Plus } from "lucide-react";
import { ProductTopCardItem } from "./ui/ProductTopCardItem";
interface ProductTopCardProps {
  onHand: number | undefined;
  totalIn: number | undefined;
  totalOut: number | undefined;
}
export const ProductTopCard = ({
  onHand,
  totalIn,
  totalOut,
}: ProductTopCardProps) => {
  return (
    <div className="h-12 flex text-sm gap-5">
      <ProductTopCardItem
        icon={ChartBar}
        value={onHand}
        label="Stock"
        unit="Units"
      />
      <ProductTopCardItem
        icon={ArrowUpFromLine}
        value={totalIn}
        label="Sold"
        unit="Units"
      />

      <ProductTopCardItem
        icon={ArrowDownToLine}
        value={totalOut}
        label="Bought"
        unit="Units"
      />
    </div>
  );
};

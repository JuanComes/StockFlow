import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  onPrevious: () => void;
  onNext: () => void;
  maxPage: number;
  currentPage: number;
}

export const Pagination = ({
  onPrevious,
  onNext,
  maxPage,
  currentPage,
}: PaginationProps) => {
  return (
    <div className="flex md:gap-3 gap-1 items-center">
      <ArrowLeft onClick={onPrevious} className="cursor-pointer" />

      <div className="text-xl">
        {currentPage}/{maxPage}
      </div>

      <ArrowRight onClick={onNext} className="cursor-pointer" />
    </div>
  );
};

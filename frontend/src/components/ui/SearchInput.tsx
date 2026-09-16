import { Search } from "lucide-react";

interface SearchInputProps {
  initialValue: string;
  onChangeFunction: (value: string) => void;
}

export const SearchInput = ({
  initialValue,
  onChangeFunction,
}: SearchInputProps) => {
  return (
    <div className="flex h-10 md:w-80 w-40 items-center rounded-md border border-gray-400 bg-white px-3">
      <Search className="mr-2 h-5 w-5 text-gray-500" />

      <input
        className="w-full bg-transparent outline-none"
        placeholder="Search products..."
        value={initialValue}
        onChange={(e) => onChangeFunction(e.target.value)}
      />
    </div>
  );
};

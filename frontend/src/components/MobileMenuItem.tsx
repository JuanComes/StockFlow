import { ArrowRight, type LucideIcon } from "lucide-react";

interface MobileMenuItemProps {
  icon: LucideIcon;
  label: string;
}

export const MobileMenuItem = ({ icon: Icon, label }: MobileMenuItemProps) => {
  return (
    <a
      href="#"
      className="text-xl border-b border-gray-300 flex items-center py-3 justify-between"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-7 w-7 text-gray-400" />
        <span>{label}</span>
      </div>

      <ArrowRight className="h-8 w-8 text-gray-400" />
    </a>
  );
};

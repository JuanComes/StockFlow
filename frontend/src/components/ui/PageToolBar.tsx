interface PageToolbarProps {
  children?: React.ReactNode;
}

export const PageToolbar = ({ children }: PageToolbarProps) => {
  return (
    <div className="w-full h-16 flex justify-between border-b border-gray-300 px-3 md:px-6 items-center bg-white">
      {children}
    </div>
  );
};

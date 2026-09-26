interface TitleProps {
  label: string;
}

export const Title = ({ label }: TitleProps) => {
  return (
    <h1 className="md:text-3xl text-2xl truncate font-bold text-center">
      {label}
    </h1>
  );
};

interface TitleProps {
  label: string;
}

export const Title = ({ label }: TitleProps) => {
  return <h1 className="text-3xl font-bold text-center">{label}</h1>;
};

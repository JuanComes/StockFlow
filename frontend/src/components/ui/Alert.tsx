interface AlertProps {
  type: "success" | "error";
  message: string;
}

export const Alert = ({ type, message }: AlertProps) => {
  return (
    <section
      className={`border rounded-lg px-4 py-3 my-4 ${
        type === "error"
          ? "bg-red-100 border-red-300"
          : "bg-green-100 border-green-300"
      }`}
    >
      <p
        className={`text-sm ${
          type === "error" ? "text-red-700" : "text-green-700"
        }`}
      >
        {message}
      </p>
    </section>
  );
};

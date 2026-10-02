interface ErrorProps {
  message?: string;
}

const Error = ({ message = "Something went wrong." }: ErrorProps) => {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Oops!</h2>
        <p className="mt-1 text-sm text-error">{message}</p>
      </div>
    </div>
  );
};

export default Error;

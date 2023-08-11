type ErrorProps = {
  error: {
    title: string;
    message?: string;
  };
};

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-2xl font-bold text-primary">{error.title}</h1>
      {error.message && (
        <p className="text-lg font-medium text-foreground">{error.message}</p>
      )}
    </div>
  );
};

export default Error;

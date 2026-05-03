type AuthErrorSpaceProps = {
  message?: string;
};

export function AuthErrorSpace({ message }: AuthErrorSpaceProps) {
  return (
    <p className="min-h-3 text-center text-[15px] leading-[1.2] text-dark-red">
      {message ?? ""}
    </p>
  );
}

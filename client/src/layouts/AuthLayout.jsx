export function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-fade px-4 py-10">
      <div className="w-full max-w-lg">{children}</div>
    </div>
  );
}

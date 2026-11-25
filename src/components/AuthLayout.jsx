function OliveBlock() {
  return (
    <div className="hidden h-[160px] w-[220px] rounded-lg bg-[linear-gradient(135deg,#3A3612_0%,#1E2014_100%)] px-9 pt-3 sm:block">
      <p className="text-[9px] font-extrabold tracking-[0.22em] text-[#E7EDF4]">AUTHENTICATION UI</p>
    </div>
  );
}

function BackCard() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[233px] left-[304px] hidden h-[158px] w-[165px] rounded-xl border border-[#01274E] bg-[#01274E] sm:block"
    />
  );
}

export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#000813] px-4 py-8">
      <h1 className="sr-only">Authentication UI</h1>
      <div className="grid w-full max-w-[746px] grid-cols-1 gap-4 sm:grid-cols-[220px_236px] sm:gap-5">
        <OliveBlock />
        <div className="relative w-full sm:mt-[83px] sm:w-[236px]">
          <BackCard />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </main>
  );
}

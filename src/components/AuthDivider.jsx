export default function AuthDivider({ children = 'OR CONTINUE WITH', className = '' }) {
  return (
    <div
      className={`flex items-center gap-2 text-[5px] leading-[6px] font-bold tracking-[0.04em] text-[#7B96B2] uppercase ${className}`}
    >
      <span className="h-px flex-1 bg-[#01274E]" aria-hidden="true" />
      <span>{children}</span>
      <span className="h-px flex-1 bg-[#01274E]" aria-hidden="true" />
    </div>
  );
}

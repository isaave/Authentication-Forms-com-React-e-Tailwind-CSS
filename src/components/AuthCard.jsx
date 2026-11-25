export default function AuthCard({ id, title, subtitle, children, footer }) {
  return (
    <section
      id={id}
      className="w-full rounded-xl border border-[#01274E] bg-[#00162E] p-4 shadow-2xl sm:p-[17px]"
    >
      <header className="-ml-[5px] mb-[11px] text-left">
        <h2 className="text-[18px] leading-[18px] font-extrabold text-white">{title}</h2>
        {subtitle && (
          <p className="mt-[3px] text-[8px] leading-[10px] text-[#AFC2D4]">{subtitle}</p>
        )}
      </header>

      {children}

      {footer && (
        <footer className="mt-[5px] border-t border-[#01274E] pt-[5px] text-center text-[7px] leading-[9px] text-[#7B96B2]">
          {footer}
        </footer>
      )}
    </section>
  );
}

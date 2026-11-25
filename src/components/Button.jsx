const variants = {
  primary:
    'bg-[#FFD50A] text-[#000813] shadow-lg shadow-[#FFD50A]/10 hover:brightness-110 active:brightness-95 disabled:bg-[#3A536B] disabled:text-[#00162E] disabled:shadow-none',
  secondary:
    'border border-[#01274E] bg-[#00193A] text-[#AFC2D4] hover:border-[#FFD50A] hover:text-white active:bg-[#00162E] disabled:opacity-50',
  ghost: 'text-[#FFD50A] hover:bg-[#00193A] active:bg-[#00162E] disabled:opacity-50',
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-3 text-[8px] font-bold transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

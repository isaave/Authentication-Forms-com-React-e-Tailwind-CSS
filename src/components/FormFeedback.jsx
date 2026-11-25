const tones = {
  error: 'border-red-400/40 bg-red-400/10 text-red-300',
  success: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  info: 'border-[#01274E] bg-[#00193A] text-[#AFC2D4]',
};

export default function FormFeedback({ tone = 'info', children, className = '' }) {
  if (!children) return null;

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={`rounded-md border px-2 py-1 text-[9px] leading-snug ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

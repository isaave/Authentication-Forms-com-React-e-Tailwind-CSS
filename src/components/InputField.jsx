import { useId } from 'react';

export default function InputField({
  label,
  id,
  error,
  hint,
  trailing,
  className = '',
  ...inputProps
}) {
  const generatedId = useId();
  const inputId = id ?? inputProps.name ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;

  return (
    <div>
      <label htmlFor={inputId} className="-ml-[5px] block text-[9px] leading-[10px] font-semibold text-[#AFC2D4]">
        {label}
      </label>

      <div className="relative mt-[3px]">
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={`h-[26px] w-full rounded-md border bg-[#00193A] px-[6px] text-[8px] leading-[26px] text-white outline-none transition placeholder:text-[#7B96B2] hover:border-[#3A536B] focus:ring-2 ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/25'
              : 'border-[#01274E] focus:border-[#FFD50A] focus:ring-[#FFD50A]/25'
          } ${trailing ? 'pr-8' : ''} ${className}`}
          {...inputProps}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0.5 flex items-center">{trailing}</div>
        )}
      </div>

      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={`mt-1 text-[9px] leading-snug ${error ? 'text-red-400' : 'text-[#7B96B2]'}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

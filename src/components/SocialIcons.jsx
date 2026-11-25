const providers = [
  {
    id: 'github',
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    id: 'google',
    label: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
        <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.3 2.99-7.37Z" />
        <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.4l-3.23-2.5c-.9.6-2.04.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.07v2.58A10 10 0 0 0 12 22Z" />
        <path fill="#FBBC05" d="M6.39 13.93a6 6 0 0 1 0-3.86V7.49H3.07a10 10 0 0 0 0 9.02l3.32-2.58Z" />
        <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.32 2.58C7.18 7.74 9.39 5.98 12 5.98Z" />
      </svg>
    ),
  },
];

export default function SocialIcons({ onSelect, className = '' }) {
  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          aria-label={`Continue with ${provider.label}`}
          onClick={() => onSelect(provider.label)}
          className="grid size-[26px] place-items-center rounded-full border border-[#01274E] bg-[#00193A] text-[#AFC2D4] transition hover:border-[#FFD50A] hover:text-white"
        >
          {provider.icon}
        </button>
      ))}
    </div>
  );
}

import { useState } from 'react';
import InputField from './InputField';

function EyeIcon({ hidden }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
      {hidden && <path d="M3 21 21 3" />}
    </svg>
  );
}

export default function PasswordField({ label = 'Password', ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <InputField
      {...props}
      label={label}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="grid size-6 place-items-center rounded-md text-[#7B96B2] transition hover:text-white"
        >
          <EyeIcon hidden={visible} />
        </button>
      }
    />
  );
}

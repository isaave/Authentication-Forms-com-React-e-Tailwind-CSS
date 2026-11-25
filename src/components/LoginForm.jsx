import { useState } from 'react';
import AuthCard from './AuthCard';
import AuthDivider from './AuthDivider';
import Button from './Button';
import FormFeedback from './FormFeedback';
import InputField from './InputField';
import PasswordField from './PasswordField';
import SocialIcons from './SocialIcons';
import { validateLogin } from '../utils/validation';

const initialValues = {
  email: '',
  password: '',
  remember: false,
};

export default function LoginForm({ onSwitchToRegister }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setFeedback(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback({ tone: 'error', message: 'Please review the highlighted fields.' });
      return;
    }

    setFeedback({ tone: 'success', message: 'Signed in successfully! (demo)' });
    console.info('Login submitted:', values);
  }

  return (
    <AuthCard
      id="login-card"
      title="Welcome Back"
      subtitle="Sign in to continue your journey"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-[#FFD50A] underline-offset-2 hover:underline"
          >
            Sign Up
          </button>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit}>
        <InputField
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <div className="mt-[6px]">
          <PasswordField
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>

        <label className="-ml-[5px] mt-[6px] flex cursor-pointer items-center gap-2 text-[7px] leading-[10px] text-[#AFC2D4]">
          <input
            type="checkbox"
            name="remember"
            checked={values.remember}
            onChange={handleChange}
            className="size-3.5 accent-[#FFD50A]"
          />
          Remember me
        </label>

        <Button type="submit" className="mt-[10px] h-[26px] w-full">
          Sign In
        </Button>

        <div className={feedback ? 'mt-2' : ''}>
          <FormFeedback tone={feedback?.tone}>{feedback?.message}</FormFeedback>
        </div>

        <AuthDivider className="mt-[10px]" />
        <SocialIcons
          className="mt-[8px]"
          onSelect={(provider) =>
            setFeedback({
              tone: 'info',
              message: `Continue with ${provider}: integration not configured in this demo.`,
            })
          }
        />
      </form>
    </AuthCard>
  );
}

import { useState } from 'react';
import AuthCard from './AuthCard';
import AuthDivider from './AuthDivider';
import Button from './Button';
import FormFeedback from './FormFeedback';
import InputField from './InputField';
import PasswordField from './PasswordField';
import SocialIcons from './SocialIcons';
import { validateRegister } from '../utils/validation';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export default function RegisterForm({ onSwitchToLogin }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
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
    const nextErrors = validateRegister(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback({ tone: 'error', message: 'Please review the highlighted fields.' });
      return;
    }

    setFeedback({ tone: 'success', message: 'Account created successfully! (demo)' });
    console.info('Registration submitted:', values);
  }

  return (
    <AuthCard
      id="signup-card"
      title="Create Account"
      subtitle="Join our community today"
      footer={
        <>
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-[#FFD50A] underline-offset-2 hover:underline"
          >
            Sign In
          </button>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <div className="mt-[8px]">
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
        </div>

        <div className="mt-[8px]">
          <PasswordField
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>

        <Button type="submit" className="mt-[8px] h-[24px] w-full">
          Create Account
        </Button>

        <div className={feedback ? 'mt-2' : ''}>
          <FormFeedback tone={feedback?.tone}>{feedback?.message}</FormFeedback>
        </div>

        <AuthDivider className="mt-[16px]" />
        <SocialIcons
          className="mt-[8px]"
          onSelect={(provider) =>
            setFeedback({
              tone: 'info',
              message: `Sign up with ${provider}: integration not configured in this demo.`,
            })
          }
        />
      </form>
    </AuthCard>
  );
}

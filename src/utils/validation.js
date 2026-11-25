const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(values) {
  const errors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email, like name@example.com.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export function validateRegister(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();

  if (!name) {
    errors.name = 'Full name is required.';
  } else if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email, like name@example.com.';
  }

  if (!values.password) {
    errors.password = 'Create a password.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/[a-zA-Z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = 'Password must contain letters and numbers.';
  }

  return errors;
}

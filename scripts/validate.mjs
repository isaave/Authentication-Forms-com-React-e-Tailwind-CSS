import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:5174';
const browser = await chromium.launch();
const errors = [];

function collectViolations(results, context) {
  return results.violations.map(
    (violation) =>
      `${context}: ${violation.id} (${violation.impact}) → ${violation.nodes
        .map((node) => node.target.join(' '))
        .join(', ')}`,
  );
}

for (const viewport of [
  { name: 'mobile-320', width: 320, height: 700 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'reference-746', width: 746, height: 1096 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(`${viewport.name}: ${error.message}`));
  await page.goto(baseURL, { waitUntil: 'networkidle' });

  const loginAxe = await new AxeBuilder({ page }).analyze();
  const login = page.locator('#login-card');
  const email = login.locator('input[name="email"]');
  const password = login.locator('input[name="password"]');

  const loginComposition = await page.evaluate(() => ({
    headings: [...document.querySelectorAll('h2')].map((item) => item.textContent),
    cardIds: [...document.querySelectorAll('section[id$="-card"]')].map((item) => item.id),
    forms: document.querySelectorAll('form').length,
    authLabels: [...document.querySelectorAll('p')].filter(
      (item) => item.textContent === 'AUTHENTICATION UI',
    ).length,
    backCards: document.querySelectorAll('main div[aria-hidden="true"]').length,
    socialButtons: document.querySelectorAll('button[aria-label^="Continue with"]').length,
    cardBackground: getComputedStyle(document.querySelector('#login-card')).backgroundColor,
    cardWidth: Math.round(document.querySelector('#login-card').getBoundingClientRect().width),
  }));

  await email.focus();
  await page.waitForTimeout(300);
  const focusBorder = await email.evaluate((el) => getComputedStyle(el).borderColor);

  // Login: erros, formato, interatividade e sucesso.
  await login.getByRole('button', { name: 'Sign In' }).click();
  const loginRequired = await login.getByRole('alert').allInnerTexts();
  const invalidFlag = await email.getAttribute('aria-invalid');
  await email.fill('invalid');
  await login.getByRole('button', { name: 'Sign In' }).click();
  const emailFormatError = await login.getByText('Enter a valid email').innerText();
  await email.fill('ana@example.com');
  await password.fill('password123');
  await login.locator('input[name="remember"]').check();
  const rememberChecked = await login.locator('input[name="remember"]').isChecked();
  await login.getByRole('button', { name: 'Show password' }).click();
  const passwordType = await password.getAttribute('type');
  await login.getByRole('button', { name: 'Sign In' }).click();
  const loginSuccess = await login.getByRole('status').innerText();
  await login.getByRole('button', { name: 'Continue with GitHub' }).click();
  const socialFeedback = await login.getByRole('status').innerText();

  // Alternância: cadastro sozinho na tela.
  await login.getByRole('button', { name: 'Sign Up' }).click();
  const registerAxe = await new AxeBuilder({ page }).analyze();
  const register = page.locator('#signup-card');
  const registerComposition = await page.evaluate(() => ({
    headings: [...document.querySelectorAll('h2')].map((item) => item.textContent),
    cardIds: [...document.querySelectorAll('section[id$="-card"]')].map((item) => item.id),
    forms: document.querySelectorAll('form').length,
    fieldNames: [...document.querySelectorAll('form input[name]')].map((item) => item.name),
  }));

  await register.getByRole('button', { name: 'Create Account' }).click();
  const registerRequired = await register.getByRole('alert').allInnerTexts();
  await register.locator('input[name="name"]').fill('An');
  await register.locator('input[name="email"]').fill('ana@invalid');
  await register.locator('input[name="password"]').fill('abc');
  await register.getByRole('button', { name: 'Create Account' }).click();
  const registerRules = await register.getByRole('alert').allInnerTexts();
  await register.locator('input[name="name"]').fill('Ana Silva');
  await register.locator('input[name="email"]').fill('ana@example.com');
  await register.locator('input[name="password"]').fill('password123');
  await register.getByRole('button', { name: 'Create Account' }).click();
  const registerSuccess = await register.getByRole('status').innerText();

  // Volta ao login: o estado do formulário foi reiniciado.
  await register.getByRole('button', { name: 'Sign In' }).click();
  const restoredHeading = await page.locator('h2').innerText();
  const resetEmail = await page.locator('input[name="email"]').inputValue();
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );

  console.log(
    `[${viewport.name}]`,
    JSON.stringify({
      loginComposition,
      registerComposition,
      focusBorder,
      loginSuccess,
      registerSuccess,
      resetEmail,
      axeViolations: [
        ...loginAxe.violations.map((item) => item.id),
        ...registerAxe.violations.map((item) => item.id),
      ],
      hasOverflow,
    }),
  );

  errors.push(...collectViolations(loginAxe, `${viewport.name}/login`));
  errors.push(...collectViolations(registerAxe, `${viewport.name}/cadastro`));

  if (loginComposition.headings.join('|') !== 'Welcome Back') {
    errors.push(`${viewport.name}: tela inicial não é o login`);
  }
  if (
    loginComposition.cardIds.join('|') !== 'login-card' ||
    loginComposition.forms !== 1 ||
    registerComposition.cardIds.join('|') !== 'signup-card' ||
    registerComposition.forms !== 1
  ) {
    errors.push(`${viewport.name}: mais de um cartão/formulário na mesma tela`);
  }
  if (loginComposition.authLabels !== 1 || loginComposition.backCards !== 1) {
    errors.push(`${viewport.name}: elementos decorativos ausentes ou duplicados`);
  }
  if (loginComposition.socialButtons !== 2) {
    errors.push(`${viewport.name}: ícones sociais ausentes`);
  }
  if (loginComposition.cardBackground !== 'rgb(0, 22, 46)') {
    errors.push(`${viewport.name}: cor do cartão divergente da imagem`);
  }
  if (viewport.width >= 640 && loginComposition.cardWidth !== 236) {
    errors.push(`${viewport.name}: largura do cartão divergente da imagem`);
  }
  if (focusBorder !== 'rgb(255, 213, 10)') {
    errors.push(`${viewport.name}: foco não usa o amarelo da imagem`);
  }
  if (
    registerComposition.headings.join('|') !== 'Create Account' ||
    !['name', 'email', 'password'].every((name) => registerComposition.fieldNames.includes(name))
  ) {
    errors.push(`${viewport.name}: tela de cadastro incorreta`);
  }
  if (
    !loginRequired.join(' ').includes('Email is required') ||
    !loginRequired.join(' ').includes('Password is required')
  ) {
    errors.push(`${viewport.name}: validação obrigatória do login falhou`);
  }
  if (invalidFlag !== 'true' || !emailFormatError.includes('valid email')) {
    errors.push(`${viewport.name}: validação de e-mail falhou`);
  }
  if (!rememberChecked || passwordType !== 'text') {
    errors.push(`${viewport.name}: interatividade do login falhou`);
  }
  if (!loginSuccess.includes('success') || !socialFeedback.includes('GitHub')) {
    errors.push(`${viewport.name}: feedback do login ausente`);
  }
  const requiredText = registerRequired.join(' ');
  if (
    !['Full name is required', 'Email is required', 'Create a password'].every((text) =>
      requiredText.includes(text),
    )
  ) {
    errors.push(`${viewport.name}: validação obrigatória do cadastro falhou`);
  }
  const rulesText = registerRules.join(' ');
  if (!['3 characters', 'valid email', '8 characters'].every((text) => rulesText.includes(text))) {
    errors.push(`${viewport.name}: regras do cadastro falharam`);
  }
  if (!registerSuccess.includes('success')) {
    errors.push(`${viewport.name}: sucesso do cadastro ausente`);
  }
  if (restoredHeading !== 'Welcome Back' || resetEmail !== '') {
    errors.push(`${viewport.name}: volta ao login não reiniciou o estado`);
  }
  if (hasOverflow) errors.push(`${viewport.name}: horizontal overflow`);

  await context.close();
}

await browser.close();

if (errors.length) {
  console.error('Validation failed:\n' + [...new Set(errors)].join('\n'));
  process.exit(1);
}
console.log('Validation passed.');

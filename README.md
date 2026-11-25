# Authentication UI — React + Tailwind CSS

Formulários de login e cadastro com o visual da imagem `reference-image.png`, mas em **telas separadas**: a cada momento, apenas um cartão aparece. Os links do rodapé (“Sign Up” / “Sign In”) alternam entre eles e reiniciam o estado do formulário.

## Como executar

```bash
npm install
npm run dev
```

O Vite mostra o endereço no terminal. Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Validação automatizada

```bash
npx playwright install chromium   # apenas na primeira vez
node scripts/validate.mjs
```

O script usa Playwright + axe-core e verifica:

- apenas **um** cartão e **um** formulário por tela;
- alternância login → cadastro → login, com reinício dos campos;
- fluxos de login e cadastro, erros inline e mensagens de sucesso;
- campo de senha, “Remember me” e feedback dos ícones sociais;
- ausência de overflow em 320, 390, 746, 768 e 1280 px;
- largura do cartão (236 px em telas ≥ 640 px) e cor/foco da referência;
- acessibilidade com axe-core (zero violações).

## Estrutura

```text
src/
  App.jsx                  # controla a tela ativa (login/cadastro)
  index.css                # Tailwind v4 + tokens da paleta da referência
  components/
    AuthCard.jsx           # cartão com cabeçalho e rodapé
    AuthDivider.jsx        # divisor “OR CONTINUE WITH”
    AuthLayout.jsx         # bloco oliva, cartão e fundo decorativo
    Button.jsx             # botão amarelo e variantes secundárias
    FormFeedback.jsx       # mensagens com role=alert / role=status
    InputField.jsx         # campo controlado, label, erro e dica
    LoginForm.jsx          # e-mail, senha e “Remember me”
    PasswordField.jsx      # campo de senha com mostrar/ocultar
    RegisterForm.jsx       # nome, e-mail e senha
    SocialIcons.jsx        # ícones GitHub/Google gerados com .map()
  utils/
    validation.js          # regras de validação puras
scripts/
  validate.mjs             # testes funcionais, responsivos e de acessibilidade
```

## Paleta da referência

| Uso | Cor |
| --- | --- |
| Fundo | `#000813` |
| Cartão | `#00162E` |
| Campo / ícone | `#00193A` |
| Borda e cartão decorativo | `#01274E` |
| Botão e foco | `#FFD50A` |
| Título | `#E7EDF4` |
| Texto | `#AFC2D4` |
| Texto secundário | `#7B96B2` |
| Bloco oliva | `#3A3612` → `#1E2014` |

Fonte: Nunito. Abaixo de 640 px o bloco oliva e o cartão decorativo são ocultos para evitar overflow; o cartão ocupa a largura disponível.

## Regras de validação

- **Login:** e-mail obrigatório e válido; senha obrigatória.
- **Cadastro:** nome com mínimo de 3 caracteres, e-mail válido e senha com mínimo de 8 caracteres contendo letras e números.
- Os erros aparecem abaixo do campo (`aria-invalid` + `aria-describedby`) e em um resumo com `role="alert"`.
- O sucesso usa `role="status"`.

> Demonstração de interface: não há backend, autenticação real nem integração social.

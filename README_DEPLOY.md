Deploy rápido (Vercel) + conectar Firebase

1) Preparar o repo
   - Crie um repositório Git e faça push do código (root do projeto contém package.json).

2) Configurar variáveis de ambiente no Vercel
   - No painel do projeto (Vercel) adicione as variáveis listadas em `.env.local.example` com os valores do seu projeto Firebase.

3) Configurações de build no Vercel
   - Build command: `npm run build`
   - Output directory: `dist`

4) Criar token do Vercel e configurar GitHub Actions
    - No Vercel Dashboard abra Settings -> Tokens e crie um token (Personal Token).
    - Anote também o `Org ID` e o `Project ID` (Settings do projeto -> General).
    - No GitHub, vá para Settings -> Secrets and variables -> Actions e adicione os seguintes secrets:
       - `VERCEL_TOKEN` = o token que você criou
       - `VERCEL_ORG_ID` = Org ID do Vercel
       - `VERCEL_PROJECT_ID` = Project ID do Vercel
    - O workflow `.github/workflows/deploy-vercel.yml` fará build e deploy automaticamente quando `main` for atualizado.

4) Regras do Firebase
   - No console do Firebase, configure Firestore e Storage.
   - Não deixe regras públicas em produção; use autenticação ou regras por produto/coleção.

5) (Opcional) Popular produtos no Firestore
   - Use `scripts/seed-products.mjs` para popular uma coleção `products` com `data/products.example.json`.

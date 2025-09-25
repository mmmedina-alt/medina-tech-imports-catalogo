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

Seed Firestore via GitHub Actions (recomendado)
---------------------------------------------

1) Criar projeto no Firebase
   - Acesse https://console.firebase.google.com/ e crie um novo projeto.
   - Ative Firestore e Storage se desejar usar uploads de imagem.

2) Obter as credenciais
   - No projeto Firebase vá em Project settings -> General -> Your apps -> SDK setup and configuration.
   - Copie as chaves: apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId.

3) Adicionar secrets no GitHub
   - Vá no repositório -> Settings -> Secrets and variables -> Actions -> New repository secret.
   - Adicione os valores com qualquer um destes nomes (a workflow aceita ambos):
     - `VITE_FIREBASE_API_KEY` or `FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN` or `FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID` or `FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET` or `FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID` or `FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID` or `FIREBASE_APP_ID`

4) Rodar o seed (GitHub Actions)
   - No GitHub, abra a aba Actions -> Seed Firestore -> Run workflow -> escolha a branch `main` e clique Run.
   - O workflow vai executar `scripts/seed-products.mjs` e criar documentos na coleção `products`.

5) Verificar no Firebase
   - Abra Firestore no console e confirme os documentos inseridos.

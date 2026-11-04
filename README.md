# 🎉 Lista de Convidados

Mini site em React (Vite) para gerenciar a lista de convidados de uma festa, usando o Firebase Firestore como banco de dados e publicado no GitHub Pages.

## Estrutura

```
.
├── backend/                # Todas as chamadas ao Firebase
│   ├── firebase.js         # Inicialização do app/Firestore
│   ├── guestService.js     # CRUD da coleção "guests"
│   └── firestore.rules     # Regras de segurança do Firestore
├── frontend/               # App React (Vite)
│   ├── pages/              # Toda a estilização (CSS)
│   ├── src/
│   │   ├── components/     # GuestForm, GuestList, Summary
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── .env                    # Variáveis do Firebase (não versionado)
```

## Configurando o Firebase

1. Crie um projeto em https://console.firebase.google.com
2. Em **Build > Firestore Database**, crie o banco.
3. Em **Regras**, cole o conteúdo de `backend/firestore.rules` e publique.
4. Em **Configurações do projeto > Seus apps**, registre um app Web e copie a configuração.
5. Crie o arquivo `.env` na raiz do repositório e preencha os valores.

## Rodando localmente

```bash
cd frontend
npm install
npm run dev
```

## Publicando no GitHub Pages

1. Ajuste `base` em `frontend/vite.config.js` se o repositório não se chamar `BirthdayList`.
2. No GitHub, vá em **Settings > Secrets and variables > Actions** e crie os secrets com os mesmos nomes do `.env` (`VITE_FIREBASE_API_KEY`, etc.).
3. Em **Settings > Pages**, selecione **Source: GitHub Actions**.
4. Faça push na branch `main` — o workflow `.github/workflows/deploy.yml` faz o build e publica.
5. No Firebase, em **Authentication > Settings > Authorized domains**, adicione `<seu-usuario>.github.io` (necessário caso adicione login futuramente).

> ⚠️ A configuração web do Firebase não é secreta — ela fica visível no site publicado. A segurança dos dados depende das **regras do Firestore**. Como o site não tem login, qualquer pessoa com o link pode editar a lista.

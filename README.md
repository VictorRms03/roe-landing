Landing page da clínica ROE, feita em Next.js.

## Rodando localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts

| Script                 | O que faz                         |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento       |
| `npm run build`        | Build de produção                 |
| `npm start`            | Serve o build de produção         |
| `npm run lint`         | ESLint, falha em qualquer aviso   |
| `npm run typecheck`    | `tsc --noEmit`                    |
| `npm run format`       | Formata com Prettier              |
| `npm run format:check` | Confere a formatação sem escrever |

O CI (`.github/workflows/ci.yml`) roda `format:check`, `lint`, `typecheck` e
`build` em cada pull request.

## Estrutura

- `src/app` — rotas e metadados (`layout`, `page`, `manifest`, `robots`, `sitemap`)
- `src/components` — seções da página; `src/components/ui` guarda as primitivas
  compartilhadas (`Section`, `SectionHeader`, `FeatureItem`, `WhatsAppLink`)
- `src/data` — conteúdo usado em mais de um lugar (unidades, FAQ, navegação, avaliações)
- `src/hooks`, `src/lib` — utilidades

As cores da marca são tokens do Tailwind v4 declarados em `src/app/globals.css`
(`roe-sand`, `roe-cream`, `roe-clay`, `roe-ink`, `roe-yellow`, …). Use os tokens
em vez de hex arbitrário.

## Variáveis de ambiente

Veja `.env.example`. `NEXT_PUBLIC_SITE_URL` alimenta canonical, sitemap, robots
e o JSON-LD; sem ela, `src/lib/site.ts` cai no valor de produção.

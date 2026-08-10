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

- `src/app` — rotas e metadados (`layout`, `page`, `manifest`, `robots`, `sitemap`,
  `opengraph-image`)
- `src/components` — seções da página; `src/components/ui` guarda as primitivas
  compartilhadas (`Section`, `SectionHeader`, `FeatureItem`, `WhatsAppLink`)
- `src/data` — conteúdo usado em mais de um lugar (unidades, exames, FAQ,
  navegação, avaliações, redes sociais)
- `src/hooks`, `src/lib` — utilidades; `src/lib/schema.ts` monta o JSON-LD

As cores da marca são tokens do Tailwind v4 declarados em `src/app/globals.css`
(`roe-sand`, `roe-cream`, `roe-clay`, `roe-ink`, `roe-yellow`, …). Use os tokens
em vez de hex arbitrário.

## Variáveis de ambiente

Veja `.env.example`.

| Variável                               | Para que serve                                                |
| -------------------------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | Canonical, sitemap, robots e JSON-LD. **Sem barra no final.** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Token do Search Console. Vazia, nenhuma meta tag é emitida.   |

Sem `NEXT_PUBLIC_SITE_URL`, `src/lib/site.ts` cai em `https://clinicaroe.vercel.app`.
A barra final é removida de qualquer forma, porque os caminhos são concatenados
direto nesse valor.

## SEO

O que já está no código:

- **Metadados** (`src/app/layout.tsx`) — title com serviço + cidades, canonical,
  Open Graph, Twitter `summary_large_image`, `googleBot` com `max-image-preview:large`,
  e `theme-color` via o export `viewport`.
- **Imagem de compartilhamento** — `src/app/opengraph-image.tsx` gera um PNG
  1200×630 no build. Alimenta `og:image` e `twitter:image` de uma vez só.
- **Dados estruturados** — `src/lib/schema.ts` emite um `@graph` com
  `Organization`, `WebSite` e um `Dentist` por unidade (endereço, horários,
  catálogo de exames, redes sociais). O `FAQPage` fica em `src/components/Faq.tsx`,
  colado nos dados que ele renderiza.
- **`robots.txt` e `sitemap.xml`** — gerados. Deploys de preview saem com
  `Disallow: /` e `noindex`, para não competirem com o site de produção.
- **Vercel Analytics + Speed Insights** — sem cookies, então não exigem banner de
  consentimento (LGPD).

Duas escolhas deliberadas: **não** marcamos `aggregateRating` (a política do Google
não considera avaliações auto-declaradas de `LocalBusiness` elegíveis para rich
result, e republicar avaliações coletadas em outro lugar é o caso que rende ação
manual), e **não** preenchemos `priceRange` nem `geo` com valores inventados.

### O que falta, e não dá para fazer em código

1. **Google Business Profile das duas unidades** — de longe a maior alavanca de
   busca local. Sem isso a clínica não aparece no mapa nem no pacote local,
   por melhor que o site esteja.
2. **Search Console** — preencher `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` na Vercel
   e submeter `https://clinicaroe.vercel.app/sitemap.xml`.
3. **Bing Webmaster Tools** — dá para importar direto do Search Console.
4. **NAP consistente** — nome, endereço e telefone idênticos no site, no Google
   Business Profile e em qualquer diretório.
5. **Dados que dependem da clínica**: coordenadas de latitude/longitude das duas
   unidades (para o campo `geo` já marcado com TODO em `src/lib/schema.ts`),
   CNPJ e CRO do responsável técnico (`src/components/Footer.tsx`), lista real de
   convênios e prazo real de laudo (`src/data/faq.ts`).

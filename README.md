# Rita de Cássia · Massoterapia e Estética

Site de uma página da Rita de Cássia: massoterapia (relaxante, pedras quentes, drenagem, reflexologia, escalda-pés) e os tratamentos de estética feminina do espaço. Mesma base do Rezende e do Stuepp & Araújo:
React 19, TypeScript, Vite 6, Tailwind 4, Motion e Lenis, com fontes locais e imagens em WebP.

## Rodar

Requisito: Node.js 20 ou superior.

```bash
npm ci
npm run dev      # http://localhost:4173
npm run build    # gera a pasta dist/
```

## Publicar na Vercel

Suba a pasta no GitHub e importe na Vercel. Framework: Vite. Build: `npm run build`. Saída: `dist`.
O `vercel.json` já deixa imagens, fontes e scripts em cache longo.

Não precisa de variável de ambiente: o endereço usado nas prévias de link (WhatsApp, Instagram, Google)
vem sozinho do domínio de produção da Vercel. Com domínio próprio, defina `VITE_SITE_URL`
(ex.: `https://ritamassoterapia.com.br`) nas variáveis do projeto e publique de novo.

## Antes de publicar

Tudo fica em `src/content.ts`, no objeto `RITA`. Campo vazio não aparece no site.

- WhatsApp já configurado: (11) 95942-4884. Todos os botões abrem o WhatsApp com uma mensagem pronta do contexto (terapia, tratamento, dúvida, agendamento).
- `instagram` e `instagramHandle`
- `atendimento` (bairro/cidade ou "atendimento a domicílio em..."), `mapa` e `horario`
- `anosExperiencia` (opcional: mostra o selo na foto da Rita)
- As terapias de massoterapia vieram da parte de massagens da Thera Belle; os tratamentos de estética vieram do panfleto da Rita. Confira em `TERAPIAS` e `ESTETICA`.
- A promoção de setembro do panfleto não entrou no site (vence no fim do mês).

## Logotipo e heros

- `public/images/marca/`: logotipo em dourado com fundo transparente, também separado em três camadas (flor, assinatura, linha com coração) para a abertura.
- `public/images/hero/`: artes desktop (logo à direita) e mobile (logo no topo). O texto do hero se adapta para nunca cobrir nem cortar o logotipo: ao lado dele em telas largas, embaixo da arte em telas largas e baixas, e na parte lisa da arte vertical no celular.
- Favicon com a flor de lótus e imagem de compartilhamento (`public/og.jpg`) com o logotipo.

## Fotos

Entram sozinhas: coloque os arquivos em `src/assets/fotos/` com os nomes do `LEIA-ME.txt` dessa pasta
(`rita.webp`, `terapia-pedras.webp`, `espaco-01.webp`...) e publique de novo. Sem foto, cada lugar usa a arte
do próprio site, então nada fica vazio. A galeria "O espaço" só aparece quando houver fotos do espaço.
Prompts prontos para as fotos das terapias: `docs/PROMPTS-FOTOS.md`.

## Estrutura

```text
src/
  content.ts             Todos os textos e dados da Rita
  App.tsx                Ordem das seções e abertura
  components/            Uma seção por arquivo
    Loader.tsx           Abertura: a flor abre, a assinatura se escreve, a gota cai no coração e o site se abre em ondas
    Hero.tsx             Arte com o logotipo, palavra que gira
    Estetica.tsx         Tratamentos de estética (cada item abre o WhatsApp)
    Terapias.tsx         Cartões que se empilham na rolagem
    PedrasQuentes.tsx    Seção escura: as pedras aquecem, o vapor sobe
    Sessao.tsx           Etapas da sessão (avançam sozinhas)
    Sensacoes.tsx        Antes e depois: a tipografia tensa vira tipografia leve
    Agendar.tsx          Monta a mensagem e abre o WhatsApp
  hooks/                 Movimento reduzido, rolagem suave, cenas ativas
  lib/                   Links do WhatsApp e fotos automáticas
  styles.css             Visual, responsivo e animações
public/
  images/pedras/         Pedras de basalto renderizadas em 3D (versão dia e quente)
  images/vapor-*.webp    Vapor das pedras quentes
  fonts/                 Fraunces e Hanken Grotesk (WOFF2, licença OFL)
```

## Desempenho

- Só `transform`, `opacity` e `clip-path` animam.
- Tudo que se move sozinho (pedras, faixa, vapor, comparador, etapas) para quando sai da tela ou quando a aba fica em segundo plano.
- Rolagem suave (Lenis) só com mouse; no celular a rolagem é nativa.
- Pedras em WebP com transparência, cerca de 15 KB cada, em dois tamanhos com `srcset`.
- Respeita "reduzir movimento" do sistema e tem o botão "Pausar movimento" no rodapé.

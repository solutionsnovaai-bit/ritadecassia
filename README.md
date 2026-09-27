# Rita de Cássia · Estética Feminina

Site de uma página da Rita de Cássia, com foco em estética feminina: pele e rosto, corpo e contorno,
cabelos e depilação a laser. A massagem aparece numa seção menor, como um extra do espaço.
Mesma base do Rezende e do Stuepp & Araújo: React 19, TypeScript, Vite 6, Tailwind 4, Motion e Lenis,
com fontes locais e imagens em WebP.

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
(ex.: `https://ritadecassiaestetica.com.br`) nas variáveis do projeto e publique de novo.

## Antes de publicar

Tudo fica em `src/content.ts`. Campo vazio não aparece no site.

- WhatsApp já configurado: (11) 95942-4884. Todos os botões abrem o WhatsApp com uma mensagem pronta
  do contexto (tratamento escolhido, área, promoção, massagem, dúvida, agendamento). As mensagens ficam em `MENSAGENS`.
- Ainda faltam, no objeto `RITA`: `instagram` e `instagramHandle`; `atendimento` (bairro/cidade),
  `mapa` e `horario`; `anosExperiencia` (opcional, mostra o selo na foto da Rita).
- Os 12 tratamentos vieram do panfleto, na mesma ordem. Confira em `MENU` (menu completo) e `AREAS` (cartões por área).
- Massagem: `MASSAGEM` lista a relaxante com pedras, a modeladora e a drenagem.

## Promoção de outubro

O objeto `PROMO` controla o selo no topo do site e a seção com contagem regressiva
(R$ 300/mês, 2 sessões por semana durante 3 meses). Ela **some sozinha** depois de `validaAte`
(31/10 às 23:59, horário de Brasília), sem precisar publicar de novo. Para uma nova campanha,
troque os textos e a data. Para tirar antes, `ativa: false`.

## Vale presente

Seção em vinho, com velas e pétalas, mostrando a arte do vale (`public/images/presente/`).
Quem vai comprar escolhe para quem é (esposa, namorada, mãe, amiga ou "eu mesma") e, se quiser,
digita o nome: a etiqueta muda na hora e a mensagem do WhatsApp já sai pronta com isso.
Textos e opções em `VALE_PRESENTE`, dentro de `content.ts`.

## Ordem das seções

Abertura com o logotipo → hero → compromissos → introdução → tratamentos por área → promoção →
menu completo com filtros → massagem → como funciona → antes e depois → sobre a Rita → galeria →
vale presente → dúvidas → agendar.

## Logotipo e heros

- `public/images/marca/`: logotipo em dourado com fundo transparente, também separado em três camadas
  (flor, assinatura, linha com coração) para a abertura.
- `public/images/hero/`: artes desktop (logo à direita) e mobile (logo no topo). O texto do hero se adapta
  para nunca cobrir nem cortar o logotipo: ao lado dele em telas largas, embaixo da arte em telas largas
  e baixas, e na parte lisa da arte vertical no celular.
- Favicon com a flor de lótus e imagem de compartilhamento (`public/og.jpg`) com o logotipo.

## Fotos

Entram sozinhas: coloque os arquivos em `src/assets/fotos/` com os nomes do `LEIA-ME.txt` dessa pasta
(`rita.webp`, `tratamento-rosto.webp`, `espaco-01.webp`...) e publique de novo. Sem foto, cada lugar usa
a arte do próprio site, então nada fica vazio. A galeria "O espaço" só aparece quando houver fotos do espaço.
Prompts prontos para as fotos das áreas: `docs/PROMPTS-FOTOS.md`.

## Estrutura

```text
src/
  content.ts             Todos os textos, tratamentos, promoção e mensagens do WhatsApp
  App.tsx                Ordem das seções e abertura
  components/            Uma seção por arquivo
    Loader.tsx           Abertura: a flor abre, a assinatura se escreve, a gota cai no coração e o site se abre em ondas
    Hero.tsx             Arte com o logotipo, palavra que gira, selo da promoção
    Tratamentos.tsx      Uma área por cartão; os cartões se empilham na rolagem
    Promocao.tsx         Promoção do mês com contagem regressiva (some sozinha no fim)
    Estetica.tsx         Menu completo com filtros (Rosto, Corpo, Cabelos, Laser)
    PedrasQuentes.tsx    Seção escura da massagem: as pedras aquecem, o vapor sobe
    ValePresente.tsx     Vale presente: cartão que inclina, lacre, etiqueta personalizada
    Sessao.tsx           Como funciona (etapas avançam sozinhas)
    Sensacoes.tsx        Antes e depois: a tipografia tensa vira tipografia leve
    Agendar.tsx          Monta a mensagem e abre o WhatsApp
  hooks/                 Movimento reduzido, rolagem suave, cenas ativas
  lib/                   WhatsApp, promoção e fotos automáticas
  styles.css             Visual, responsivo e animações
public/
  images/pedras/         Pedras de basalto renderizadas em 3D (versão dia e quente)
  images/vapor-*.webp    Vapor das pedras quentes
  fonts/                 Fraunces e Hanken Grotesk (WOFF2, licença OFL)
```

## Desempenho

- Só `transform`, `opacity` e `clip-path` animam.
- Tudo que se move sozinho (pedras, faixas, vapor, comparador, etapas) para quando sai da tela ou quando
  a aba fica em segundo plano.
- Rolagem suave (Lenis) só com mouse; no celular a rolagem é nativa.
- Pedras em WebP com transparência, cerca de 15 KB cada, em dois tamanhos com `srcset`.
- Respeita "reduzir movimento" do sistema e tem o botão "Pausar movimento" no rodapé.

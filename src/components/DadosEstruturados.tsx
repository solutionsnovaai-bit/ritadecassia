import { MENU, RITA, SEO, VALE_PRESENTE } from '../content'
import { temWhatsApp } from '../lib/whatsapp'

/** Dados para o Google entender o negócio. Campos vazios em content.ts ficam de fora. */
export default function DadosEstruturados() {
  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: RITA.marca,
    description: SEO.descricao,
    url: `${__SITE_ORIGIN__}/`,
    image: `${__SITE_ORIGIN__}/og.jpg`,
    slogan: RITA.assinatura,
    makesOffer: [
      ...MENU.itens.map(t => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: t.nome, ...(t.detalhe ? { description: t.detalhe } : {}) } })),
      { '@type': 'Offer', name: 'Vale-presente', itemOffered: { '@type': 'Service', name: VALE_PRESENTE.experiencia, description: VALE_PRESENTE.itens.map(i => `${i.titulo} ${i.texto}`).join('; ') } },
    ],
  }
  if (temWhatsApp) dados.telephone = `+${RITA.whatsapp.replace(/\D/g, '')}`
  if (RITA.atendimento) dados.areaServed = RITA.atendimento
  if (RITA.instagram) dados.sameAs = [RITA.instagram]
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
}

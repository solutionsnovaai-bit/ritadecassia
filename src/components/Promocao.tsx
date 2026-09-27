import { PROMO, MENSAGENS } from '../content'
import { waLink } from '../lib/whatsapp'
import { dataFinal, usePromo } from '../lib/promo'
import BrandIcon from './BrandIcon'
import Reveal from './Reveal'
import { Lotus } from './Faixa'

const dois = (n: number) => String(n).padStart(2, '0')

/** Cartão da promoção do mês, no estilo do panfleto. Some sozinho quando a data passa. */
export default function Promocao() {
  const resta = usePromo()
  if (!resta) return null
  return <section id="promocao" className="promo" aria-labelledby="promo-titulo">
    <Reveal className="wrap">
      <div className="promo-cartao">
        <span className="promo-canto c1" aria-hidden="true" /><span className="promo-canto c2" aria-hidden="true" /><span className="promo-canto c3" aria-hidden="true" /><span className="promo-canto c4" aria-hidden="true" />
        <div className="promo-texto">
          <span className="sobretitulo"><Lotus className="promo-lotus" />{PROMO.selo} · válida até {dataFinal}</span>
          <h2 id="promo-titulo" className="promo-titulo">{PROMO.titulo}</h2>
          {PROMO.linhas.map(l => <p key={l}>{l}</p>)}
        </div>
        <div className="promo-preco" aria-label={`${PROMO.moeda} ${PROMO.valor} por mês`}>
          <span className="promo-moeda">{PROMO.moeda}</span><strong>{PROMO.valor}</strong><span className="promo-unidade">{PROMO.unidade}</span>
        </div>
        <div className="promo-acao">
          <div className="promo-contagem" role="timer" aria-label={`Faltam ${resta.dias} dias, ${resta.horas} horas e ${resta.minutos} minutos`}>
            <span><b>{dois(resta.dias)}</b><small>dias</small></span>
            <span><b>{dois(resta.horas)}</b><small>horas</small></span>
            <span><b>{dois(resta.minutos)}</b><small>min</small></span>
          </div>
          <a className="botao botao-ambar" href={waLink(MENSAGENS.promo)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{PROMO.cta}</span></a>
        </div>
        <p className="promo-chamada">{PROMO.chamada}</p>
      </div>
    </Reveal>
  </section>
}

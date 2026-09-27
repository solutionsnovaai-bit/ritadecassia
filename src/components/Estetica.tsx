import { ArrowUpRight } from 'lucide-react'
import { ESTETICA, MENSAGENS } from '../content'
import { waLink } from '../lib/whatsapp'
import BrandIcon from './BrandIcon'
import Reveal, { Titulo } from './Reveal'
import { Lotus } from './Faixa'

/** Tratamentos de estética feminina do espaço (lista do material da própria Rita). Cada item abre o WhatsApp. */
export default function Estetica() {
  return <section id="estetica" className="estetica secao">
    <div className="wrap estetica-cabeca">
      <div>
        <Reveal><span className="sobretitulo">{ESTETICA.sobretitulo}</span></Reveal>
        <Titulo linhas={[ESTETICA.titulo]} destaque={ESTETICA.destaque} className="h2" />
      </div>
      <Reveal delay={0.15} className="estetica-intro">
        <Lotus className="estetica-lotus" />
        <p>{ESTETICA.texto}</p>
      </Reveal>
    </div>
    <ul className="wrap estetica-lista">
      {ESTETICA.itens.map((t, i) => <Reveal as="li" key={t.nome} delay={(i % 2) * 0.06} y={16} className={t.detalhe.length > 30 ? 'estetica-largo' : undefined}>
        <a href={waLink(MENSAGENS.tratamento(t.nome))} target="_blank" rel="noopener noreferrer" aria-label={`${t.nome}: saber mais pelo WhatsApp`}>
          <span className="estetica-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="estetica-nome">{t.nome}{t.detalhe && <small>{t.detalhe}</small>}</span>
          <span className="estetica-acao"><BrandIcon brand="whatsapp" /><span>{ESTETICA.cta}</span><ArrowUpRight size={15} strokeWidth={1.6} /></span>
        </a>
      </Reveal>)}
    </ul>
    <Reveal className="wrap estetica-fim">
      <a className="botao botao-escuro" href={waLink(MENSAGENS.tratamento('os tratamentos de estética'))} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>Agendar uma avaliação estética</span></a>
    </Reveal>
  </section>
}

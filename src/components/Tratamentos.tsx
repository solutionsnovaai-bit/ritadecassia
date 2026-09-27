import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { AREAS, AREAS_INTRO, MENSAGENS } from '../content'
import type { Area } from '../content'
import { waLink } from '../lib/whatsapp'
import { fotoDaArea } from '../lib/fotos'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import TerapiaArte from './TerapiaArte'
import BrandIcon from './BrandIcon'
import Reveal, { Titulo } from './Reveal'

function Arte({ a, i }: { a: Area; i: number }) {
  const foto = fotoDaArea(a.id)
  const num = <span className="arte-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
  if (foto) return <div className="terapia-arte tem-foto">
    <img src={foto} alt={`${a.nome}: tratamento no espaço ${a.nome}`} loading="lazy" decoding="async" />
    <TerapiaArte id={a.id} className="terapia-desenho-canto" />
  </div>
  return <div className={`terapia-arte ${a.tema === 'basalto' ? 'arte-luz' : ''}`} aria-hidden="true">
    {a.tema === 'basalto' && <span className="arte-brilho" />}
    <span className="arte-aneis"><i /><i /><i /></span>
    {num}
    <TerapiaArte id={a.id} />
  </div>
}

function Cartao({ a, i, total, progresso }: { a: Area; i: number; total: number; progresso: MotionValue<number> }) {
  const { reduced } = useMotionPreferences()
  const inicio = i / total
  const escala = useTransform(progresso, [inicio, 1], [1, 1 - (total - 1 - i) * 0.035])
  const veu = useTransform(progresso, [inicio, 1], [0, (total - 1 - i) * 0.07])
  const escuro = a.tema === 'basalto'
  return <div className="terapia-slot" style={{ '--i': i } as CSSProperties}>
    <motion.article className={`terapia tema-${a.tema}`} style={reduced ? undefined : { scale: escala }} aria-labelledby={`area-${a.id}`}>
      <div className="terapia-conteudo">
        <div className="terapia-topo">
          <span className="terapia-num">{String(i + 1).padStart(2, '0')}<small> / {String(total).padStart(2, '0')}</small></span>
          <span className="terapia-contagem">{a.tratamentos.length > 1 ? `${a.tratamentos.length} tratamentos` : 'Tratamento'}</span>
        </div>
        <h3 id={`area-${a.id}`}>{a.nome}</h3>
        <p className="terapia-resumo">{a.resumo}</p>
        <p className="terapia-texto">{a.texto}</p>
        {a.tratamentos.length > 1 && <ul className="terapia-lista" aria-label={`Tratamentos de ${a.nome.toLowerCase()}`}>
          {a.tratamentos.map(t => <li key={t}><a href={waLink(MENSAGENS.tratamento(t))} target="_blank" rel="noopener noreferrer">{t}<ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" /></a></li>)}
        </ul>}
        <a className={`botao ${escuro ? 'botao-ambar' : 'botao-escuro'}`} href={waLink(MENSAGENS.area(a.nome))} target="_blank" rel="noopener noreferrer">
          <BrandIcon brand="whatsapp" /><span>Agendar avaliação</span>
        </a>
      </div>
      <Arte a={a} i={i} />
      {!reduced && <motion.span className="terapia-veu" style={{ opacity: veu }} aria-hidden="true" />}
    </motion.article>
  </div>
}

export default function Tratamentos() {
  const pilha = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: pilha, offset: ['start start', 'end end'] })
  return <section id="tratamentos" className="terapias">
    <div className="wrap terapias-cabeca">
      <div>
        <Reveal><span className="sobretitulo">{AREAS_INTRO.sobretitulo}</span></Reveal>
        <Titulo linhas={[AREAS_INTRO.titulo]} destaque={AREAS_INTRO.destaque} className="h2" />
      </div>
      <Reveal delay={0.15}><p className="terapias-texto">{AREAS_INTRO.texto}</p></Reveal>
    </div>
    <div ref={pilha} className="terapias-pilha wrap">
      {AREAS.map((a, i) => <Cartao key={a.id} a={a} i={i} total={AREAS.length} progresso={scrollYProgress} />)}
    </div>
  </section>
}

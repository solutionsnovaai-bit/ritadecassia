import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { MENSAGENS, TERAPIAS, TERAPIAS_INTRO } from '../content'
import type { Terapia } from '../content'
import { waLink } from '../lib/whatsapp'
import { fotoDaTerapia } from '../lib/fotos'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import TerapiaArte from './TerapiaArte'
import Reveal, { Titulo } from './Reveal'

function Arte({ t, i }: { t: Terapia; i: number }) {
  const foto = fotoDaTerapia(t.id)
  const num = <span className="arte-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
  if (foto) return <div className="terapia-arte tem-foto">
    <img src={foto} alt={`${t.nome}: atendimento da Rita`} loading="lazy" decoding="async" />
    <TerapiaArte id={t.id} className="terapia-desenho-canto" />
  </div>
  if (t.id === 'pedras') return <div className="terapia-arte arte-pedras" aria-hidden="true">
    <span className="arte-brasa" />
    {num}
    <img className="arte-vapor" src="/images/vapor-2.webp" alt="" loading="lazy" decoding="async" />
    <img className="arte-pedra" src="/images/pedras/p5-quente.webp" srcSet="/images/pedras/p5-quente-sm.webp 276w, /images/pedras/p5-quente.webp 552w" sizes="(max-width: 900px) 50vw, 24vw" width="552" height="428" alt="" loading="lazy" decoding="async" />
    <TerapiaArte id={t.id} className="terapia-desenho-canto" />
  </div>
  return <div className="terapia-arte" aria-hidden="true">
    <span className="arte-aneis"><i /><i /><i /></span>
    {num}
    <TerapiaArte id={t.id} />
  </div>
}

function Cartao({ t, i, total, progresso }: { t: Terapia; i: number; total: number; progresso: MotionValue<number> }) {
  const { reduced } = useMotionPreferences()
  const inicio = i / total
  const escala = useTransform(progresso, [inicio, 1], [1, 1 - (total - 1 - i) * 0.035])
  const veu = useTransform(progresso, [inicio, 1], [0, (total - 1 - i) * 0.07])
  return <div className="terapia-slot" style={{ '--i': i } as CSSProperties}>
    <motion.article className={`terapia tema-${t.tema}`} style={reduced ? undefined : { scale: escala }} aria-labelledby={`terapia-${t.id}`}>
      <div className="terapia-conteudo">
        <div className="terapia-topo">
          <span className="terapia-num">{String(i + 1).padStart(2, '0')}<small> / {String(total).padStart(2, '0')}</small></span>
          {t.destaque && <span className="terapia-selo">{t.destaque}</span>}
        </div>
        <h3 id={`terapia-${t.id}`}>{t.nome}</h3>
        <p className="terapia-resumo">{t.resumo}</p>
        <p className="terapia-texto">{t.texto}</p>
        <div className="terapia-ideal">
          <span>Ideal para</span>
          <ul>{t.ideal.map(x => <li key={x}>{x}</li>)}</ul>
        </div>
        <a className={`botao ${t.tema === 'basalto' ? 'botao-ambar' : 'botao-escuro'}`} href={waLink(MENSAGENS.terapia(t.nome))} target="_blank" rel="noopener noreferrer">
          <span>Agendar {t.nome.toLowerCase()}</span><ArrowUpRight size={17} strokeWidth={1.6} />
        </a>
      </div>
      <Arte t={t} i={i} />
      {!reduced && <motion.span className="terapia-veu" style={{ opacity: veu }} aria-hidden="true" />}
    </motion.article>
  </div>
}

export default function Terapias() {
  const pilha = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: pilha, offset: ['start start', 'end end'] })
  return <section id="terapias" className="terapias">
    <div className="wrap terapias-cabeca">
      <div>
        <Reveal><span className="sobretitulo">{TERAPIAS_INTRO.sobretitulo}</span></Reveal>
        <Titulo linhas={[TERAPIAS_INTRO.titulo]} destaque={TERAPIAS_INTRO.destaque} className="h2" />
      </div>
      <Reveal delay={0.15}><p className="terapias-texto">{TERAPIAS_INTRO.texto}</p></Reveal>
    </div>
    <div ref={pilha} className="terapias-pilha wrap">
      {TERAPIAS.map((t, i) => <Cartao key={t.id} t={t} i={i} total={TERAPIAS.length} progresso={scrollYProgress} />)}
    </div>
  </section>
}

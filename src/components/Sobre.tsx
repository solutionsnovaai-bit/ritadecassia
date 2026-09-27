import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { RITA, SOBRE } from '../content'
import { waLink } from '../lib/whatsapp'
import { fotoDaRita } from '../lib/fotos'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Reveal, { EASE, Titulo } from './Reveal'

function Retrato() {
  const { reduced } = useMotionPreferences()
  if (fotoDaRita) return <div className="sobre-retrato tem-foto">
    <motion.img src={fotoDaRita} alt={RITA.marca} loading="lazy" decoding="async" initial={reduced ? false : { scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.6, ease: EASE }} />
  </div>
  // Sem foto ainda: composição com a inicial e uma pedra, pensada para não parecer vazia.
  return <div className="sobre-retrato sem-foto" aria-hidden="true">
    <span className="sobre-inicial">{RITA.nome.charAt(0)}</span>
    <span className="sobre-aneis"><i /><i /><i /></span>
    <img className="sobre-flor" src="/images/marca/flor.webp" width="257" height="179" alt="" loading="lazy" decoding="async" />
    <span className="sobre-sombra" />
    <span className="sobre-legenda">{RITA.assinatura}</span>
  </div>
}

export default function Sobre() {
  return <section id="sobre" className="sobre">
    <div className="wrap sobre-grade">
      <Reveal className="sobre-foto">
        <Retrato />
        {RITA.anosExperiencia && <div className="sobre-selo"><strong>{RITA.anosExperiencia}<span>+</span></strong><span>anos cuidando<br />de pessoas</span></div>}
      </Reveal>
      <div className="sobre-conteudo">
        <Reveal><span className="sobretitulo">{SOBRE.sobretitulo}</span></Reveal>
        <Titulo linhas={[SOBRE.titulo]} destaque={SOBRE.destaque} className="h2" />
        <Reveal delay={0.1}><p className="sobre-lead">{SOBRE.lead}</p></Reveal>
        <Reveal delay={0.16}><p className="sobre-texto">{SOBRE.texto}</p></Reveal>
        <ul className="sobre-principios">
          {SOBRE.principios.map((p, i) => <Reveal as="li" key={p.titulo} delay={0.2 + i * 0.08} y={14}><strong>{p.titulo}</strong><span>{p.texto}</span></Reveal>)}
        </ul>
        <Reveal delay={0.3}><a className="link" href={waLink()} target="_blank" rel="noopener noreferrer">{SOBRE.link}<ArrowUpRight size={16} strokeWidth={1.6} /></a></Reveal>
      </div>
    </div>
    <p className="sobre-frase" aria-hidden="true"><span>{SOBRE.frase[0]}</span> <em>{SOBRE.frase[1]}</em></p>
  </section>
}

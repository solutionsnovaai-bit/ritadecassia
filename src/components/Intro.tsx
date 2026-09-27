import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { INTRO, MENSAGENS } from '../content'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Reveal, { EASE, Titulo } from './Reveal'

// O mesmo traço, com o nó e sem ele: os dois caminhos têm a mesma estrutura para a transição ser contínua.
const COM_NO = 'M0 14 C 40 14 78 14 104 14 C 134 14 152 -18 128 -24 C 104 -30 92 6 120 17 C 142 25 162 14 192 14 C 222 14 250 14 280 14'
const SEM_NO = 'M0 14 C 40 14 78 14 104 14 C 124 14 136 14 148 14 C 160 14 170 14 180 14 C 196 14 212 14 228 14 C 246 14 262 14 280 14'

function No({ i }: { i: number }) {
  const { reduced } = useMotionPreferences()
  return <svg className="no" viewBox="-4 -32 288 58" aria-hidden="true" focusable="false">
    <motion.path d={reduced ? SEM_NO : COM_NO} initial={false} whileInView={{ d: SEM_NO }} viewport={{ once: true, amount: 1 }} transition={{ duration: 1.6, delay: 0.35 + i * 0.25, ease: EASE }} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
}

export default function Intro() {
  return <section id="o-que-o-corpo-guarda" className="intro secao wrap">
    <div className="intro-titulo">
      <Reveal><span className="sobretitulo">{INTRO.sobretitulo}</span></Reveal>
      <Titulo linhas={INTRO.titulo} destaque={INTRO.destaque} className="h2" />
    </div>
    <div className="intro-corpo">
      <ul className="intro-nos">
        {INTRO.nos.map((t, i) => <Reveal as="li" key={t} delay={i * 0.12} y={18}>
          <span>{t}</span>
          <No i={i} />
        </Reveal>)}
      </ul>
      <Reveal delay={0.2}>
        <p className="intro-texto">{INTRO.texto}</p>
        <a className="link" href={waLink(MENSAGENS.escolher)} target="_blank" rel="noopener noreferrer">{INTRO.link}<ArrowUpRight size={16} strokeWidth={1.6} /></a>
      </Reveal>
    </div>
  </section>
}

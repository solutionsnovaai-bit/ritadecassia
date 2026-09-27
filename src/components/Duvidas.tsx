import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { DUVIDAS, MENSAGENS } from '../content'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Reveal, { EASE, Titulo } from './Reveal'

export default function Duvidas() {
  const [aberta, setAberta] = useState<number | null>(0)
  const { reduced } = useMotionPreferences()
  return <section id="duvidas" className="duvidas secao wrap">
    <div className="duvidas-cabeca">
      <Reveal><span className="sobretitulo">{DUVIDAS.sobretitulo}</span></Reveal>
      <Titulo linhas={DUVIDAS.titulo} destaque={DUVIDAS.destaque} className="h2" />
      <Reveal delay={0.15}><a className="link" href={waLink(MENSAGENS.duvida)} target="_blank" rel="noopener noreferrer">{DUVIDAS.link}<ArrowUpRight size={16} strokeWidth={1.6} /></a></Reveal>
    </div>
    <Reveal className="duvidas-lista" delay={0.1}>
      {DUVIDAS.itens.map((d, i) => <div key={d.pergunta} className={`duvida ${aberta === i ? 'is-aberta' : ''}`}>
        <h3><button id={`duvida-${i}`} aria-expanded={aberta === i} aria-controls={`resposta-${i}`} onClick={() => setAberta(aberta === i ? null : i)}><span>{d.pergunta}</span><Plus size={20} strokeWidth={1.4} /></button></h3>
        <motion.div id={`resposta-${i}`} role="region" aria-labelledby={`duvida-${i}`} initial={false} animate={{ height: aberta === i ? 'auto' : 0, opacity: aberta === i ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.45, ease: EASE }} style={{ overflow: 'hidden' }} inert={aberta !== i}>
          <p>{d.resposta}</p>
        </motion.div>
      </div>)}
    </Reveal>
  </section>
}

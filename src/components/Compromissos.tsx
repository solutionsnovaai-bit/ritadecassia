import { CalendarCheck, ScanFace, Sparkles } from 'lucide-react'
import { COMPROMISSOS } from '../content'
import Reveal from './Reveal'

const icones = [ScanFace, Sparkles, CalendarCheck]

export default function Compromissos() {
  return <section id="compromissos" className="compromissos" aria-label="Como funciona o atendimento">
    <div className="wrap compromissos-grade">
      {COMPROMISSOS.map((c, i) => {
        const Icone = icones[i]
        return <Reveal key={c.titulo} className="compromisso" delay={i * 0.08} y={16}>
          <Icone strokeWidth={1.2} aria-hidden="true" />
          <p><strong>{c.titulo}</strong><span>{c.texto}</span></p>
        </Reveal>
      })}
    </div>
  </section>
}

import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { MENSAGENS, PEDRAS } from '../content'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import PedrasFlutuantes from './PedrasFlutuantes'
import Reveal, { Titulo } from './Reveal'

/**
 * Seção escura das pedras quentes. Conforme a pessoa rola:
 * as pedras aquecem (a luz de brasa acende), o vapor sobe e, no fim, elas assentam.
 */
export default function PedrasQuentes() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const ativo = useSceneActivity(ref)
  const [etapa, setEtapa] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const calor = useTransform(scrollYProgress, [0.16, 0.4], [0, 1])
  const vapor = useTransform(scrollYProgress, [0.28, 0.46], [0, 1])
  const assentar = useTransform(scrollYProgress, [0.5, 0.74], [0, 1])
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18, mass: 1.3 })
  const sy = useSpring(my, { stiffness: 40, damping: 18, mass: 1.3 })
  const calorFixo = useMotionValue(1)

  useEffect(() => {
    const els = Array.from(ref.current?.querySelectorAll<HTMLElement>('[data-etapa]') ?? [])
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setEtapa(Number((e.target as HTMLElement).dataset.etapa)) }), { rootMargin: '-40% 0px -45% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const mover = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    mx.set(x * 2 - 1); my.set(y * 2 - 1)
    visual.current?.style.setProperty('--luz-x', `${(x * 100).toFixed(1)}%`)
    visual.current?.style.setProperty('--luz-y', `${(y * 100).toFixed(1)}%`)
  }

  return <section id="pedras-quentes" data-topo="escuro" ref={ref} className={`pq ${ativo && !reduced ? 'is-ativo' : ''}`}>
    <div className="pq-grade wrap">
      <div className="pq-visual-col">
        <div ref={visual} className="pq-visual" onPointerMove={mover} onPointerLeave={() => { mx.set(0); my.set(0) }}>
          <motion.span className="pq-glow" style={{ opacity: reduced ? 1 : calor }} aria-hidden="true" />
          <span className="pq-luz" aria-hidden="true" />
          <motion.div className="pq-vapor" style={{ opacity: reduced ? 0.6 : vapor }} aria-hidden="true">
            <img src="/images/vapor-1.webp" alt="" loading="lazy" decoding="async" />
            <img src="/images/vapor-3.webp" alt="" loading="lazy" decoding="async" />
            <img src="/images/vapor-2.webp" alt="" loading="lazy" decoding="async" />
          </motion.div>
          <div className="pq-pedras">
            <PedrasFlutuantes variante="quente" calor={reduced ? calorFixo : calor} assentar={reduced ? undefined : assentar} mx={reduced ? undefined : sx} my={reduced ? undefined : sy} ativo={ativo && !reduced} largura="var(--pq-w)" />
          </div>
          <div className="pq-medidor" aria-hidden="true">
            <span className="pq-medidor-trilho"><motion.i style={{ scaleY: reduced ? 1 : calor }} /></span>
            <span className="pq-medidor-rotulo">{PEDRAS.etapas[etapa].nome}</span>
          </div>
        </div>
      </div>

      <div className="pq-texto-col">
        <header className="pq-cabeca">
          <Reveal><span className="sobretitulo">{PEDRAS.sobretitulo}</span></Reveal>
          <Titulo linhas={PEDRAS.titulo} destaque={PEDRAS.destaque} className="h2" />
          <Reveal delay={0.15}><p className="pq-lead">{PEDRAS.lead}</p></Reveal>
        </header>
        <ol className="pq-etapas">
          {PEDRAS.etapas.map((e, i) => <li key={e.nome} data-etapa={i} className={etapa === i ? 'is-atual' : undefined}>
            <span className="pq-etapa-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{e.nome}</h3>
            <p>{e.texto}</p>
          </li>)}
        </ol>
        <Reveal className="pq-fim">
          <p className="pq-nota">{PEDRAS.nota}</p>
          <a className="botao botao-ambar" href={waLink(MENSAGENS.pedras)} target="_blank" rel="noopener noreferrer"><span>{PEDRAS.cta}</span><ArrowUpRight size={17} strokeWidth={1.6} /></a>
        </Reveal>
      </div>
    </div>
  </section>
}

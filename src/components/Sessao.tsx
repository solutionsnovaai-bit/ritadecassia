import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { MENSAGENS, SESSAO } from '../content'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import Reveal, { EASE, Titulo } from './Reveal'

const INTERVALO = 5200

/** As quatro etapas da sessão. Avançam sozinhas enquanto estão na tela; clique ou teclado assumem o controle. */
export default function Sessao() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const visivel = useSceneActivity(ref, 0.25)
  const [atual, setAtual] = useState(0)
  const [manual, setManual] = useState(false)
  const [pausa, setPausa] = useState(false)
  const total = SESSAO.etapas.length
  const rodando = visivel && !reduced && !manual && !pausa

  const ir = useCallback((i: number) => setAtual((i + total) % total), [total])
  useEffect(() => {
    if (!rodando) return
    const t = window.setTimeout(() => ir(atual + 1), INTERVALO)
    return () => clearTimeout(t)
  }, [rodando, atual, ir])

  const escolher = (i: number) => { setManual(true); ir(i) }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const mapa: Record<string, number> = { ArrowDown: atual + 1, ArrowRight: atual + 1, ArrowUp: atual - 1, ArrowLeft: atual - 1, Home: 0, End: total - 1 }
    if (!(e.key in mapa)) return
    e.preventDefault()
    const n = (mapa[e.key] + total) % total
    escolher(n)
    document.getElementById(`etapa-aba-${n}`)?.focus()
  }
  const e = SESSAO.etapas[atual]

  return <section id="como-funciona" ref={ref} className="sessao secao wrap">
    <div className="sessao-cabeca">
      <Reveal><span className="sobretitulo">{SESSAO.sobretitulo}</span></Reveal>
      <Titulo linhas={[SESSAO.titulo]} destaque={SESSAO.destaque} className="h2" />
    </div>
    <div className="sessao-grade" onMouseEnter={() => setPausa(true)} onMouseLeave={() => setPausa(false)}>
      <Reveal className="sessao-abas" delay={0.1}>
        <div role="tablist" aria-label="Etapas do atendimento" aria-orientation="vertical" onKeyDown={onKey}>
          {SESSAO.etapas.map((et, i) => <button key={et.titulo} id={`etapa-aba-${i}`} role="tab" aria-selected={atual === i} aria-controls="etapa-painel" tabIndex={atual === i ? 0 : -1} className={`sessao-aba ${atual === i ? 'is-atual' : ''}`} onClick={() => escolher(i)}>
            <span className="sessao-aba-num">0{i + 1}</span>
            <span className="sessao-aba-nome">{et.titulo}</span>
            <span className="sessao-aba-tempo" aria-hidden="true">{atual === i && <i key={`${atual}-${rodando}`} style={{ animationDuration: `${INTERVALO}ms`, animationPlayState: rodando ? 'running' : 'paused', opacity: manual ? 0 : 1 }} />}</span>
          </button>)}
        </div>
        <p className="sessao-apoio">{SESSAO.apoio}</p>
      </Reveal>
      <Reveal className="sessao-painel" delay={0.2}>
        <div role="tabpanel" id="etapa-painel" aria-labelledby={`etapa-aba-${atual}`} tabIndex={0}>
          <div className="sessao-painel-topo"><span className="sobretitulo">Etapa 0{atual + 1} / 0{total}</span><span className="sessao-aneis" aria-hidden="true"><i /><i /><i /></span></div>
          <AnimatePresence mode="wait">
            <motion.div key={atual} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: EASE }}>
              <h3>{e.rotulo}</h3>
              <p>{e.texto}</p>
              <ul>{e.pontos.map(p => <li key={p}><Check size={16} strokeWidth={1.6} />{p}</li>)}</ul>
            </motion.div>
          </AnimatePresence>
          <a className="link link-claro" href={waLink(MENSAGENS.avaliacao)} target="_blank" rel="noopener noreferrer">Agendar minha avaliação<ArrowUpRight size={16} strokeWidth={1.6} /></a>
        </div>
      </Reveal>
    </div>
  </section>
}

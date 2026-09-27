import { useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { SENSACOES } from '../content'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import Reveal, { Titulo } from './Reveal'

/**
 * Antes e depois em forma de texto: do lado de quem chega, a tipografia está tensa;
 * do lado de quem sai, ela respira. A linha varre sozinha até alguém pegar nela.
 */
export default function Sensacoes() {
  const ref = useRef<HTMLDivElement>(null)
  const ativo = useSceneActivity(ref, 0.2)
  const { reduced } = useMotionPreferences()
  const [pos, setPos] = useState<number | null>(null)
  const arrastando = useRef(false)
  const definir = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)))
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const atual = pos ?? 50
    const mapa: Record<string, number> = { ArrowLeft: atual - 5, ArrowRight: atual + 5, Home: 0, End: 100 }
    if (!(e.key in mapa)) return
    e.preventDefault()
    setPos(Math.max(0, Math.min(100, mapa[e.key])))
  }
  const auto = pos === null
  const linhas = (lista: readonly string[]) => <ul>{lista.map((t, i) => <li key={t} style={{ '--i': i } as CSSProperties}><span className="comparar-n">0{i + 1}</span><span className="comparar-t">{t}</span></li>)}</ul>

  return <section className="sensacoes secao" aria-labelledby="sensacoes-titulo">
    <div className="wrap sensacoes-cabeca">
      <div>
        <Reveal><span className="sobretitulo">{SENSACOES.sobretitulo}</span></Reveal>
        <Titulo linhas={[SENSACOES.titulo]} destaque={SENSACOES.destaque} className="h2" />
        <span id="sensacoes-titulo" className="sr-only">{SENSACOES.titulo} {SENSACOES.destaque}</span>
      </div>
      <Reveal delay={0.15}><p className="sensacoes-instrucao"><MoveHorizontal size={18} strokeWidth={1.4} aria-hidden="true" />{SENSACOES.instrucao}</p></Reveal>
    </div>
    <Reveal className="wrap">
      <div ref={ref} className={`comparar ${auto ? 'is-auto' : ''} ${auto && ativo && !reduced ? 'is-movendo' : ''}`}
        style={auto ? undefined : { '--pos': `${pos}%` } as CSSProperties}
        role="slider" tabIndex={0} aria-label="Comparar como você chega e como você sai" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos ?? 50)} aria-valuetext={`${Math.round(pos ?? 50)}% antes da sessão`}
        onKeyDown={onKey}
        onPointerDown={e => { arrastando.current = true; e.currentTarget.setPointerCapture(e.pointerId); definir(e) }}
        onPointerMove={e => { if (arrastando.current) definir(e) }}
        onPointerUp={() => { arrastando.current = false }} onPointerCancel={() => { arrastando.current = false }}>
        <div className="comparar-lado comparar-sai" aria-hidden={false}>
          <span className="comparar-tag">Como você sai</span>
          {linhas(SENSACOES.sai)}
        </div>
        <div className="comparar-lado comparar-chega">
          <span className="comparar-tag">Como você chega</span>
          {linhas(SENSACOES.chega)}
        </div>
        <div className="comparar-alca" aria-hidden="true"><span className="comparar-linha" /><span className="comparar-botao"><MoveHorizontal size={18} strokeWidth={1.5} /></span></div>
      </div>
    </Reveal>
    <p className="wrap sensacoes-nota">{SENSACOES.nota}</p>
  </section>
}

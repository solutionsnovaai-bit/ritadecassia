import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GALERIA, RITA } from '../content'
import { fotosDoEspaco } from '../lib/fotos'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import Reveal, { EASE, Titulo } from './Reveal'

const INTERVALO = 3400

/** Galeria automática do espaço. Só aparece quando houver fotos em src/assets/fotos (espaco-01.webp...). */
export default function Galeria() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const visivel = useSceneActivity(ref, 0.2)
  const [[i, dir], set] = useState([0, 1])
  const [segurando, setSegurando] = useState(false)
  const inicio = useRef<number | null>(null)
  const n = fotosDoEspaco.length
  const rodando = visivel && !reduced && !segurando && n > 1
  const ir = useCallback((d: number) => set(([a]) => [(a + d + n) % n, d]), [n])
  useEffect(() => {
    if (!rodando) return
    const t = window.setTimeout(() => ir(1), INTERVALO)
    return () => clearTimeout(t)
  }, [rodando, i, ir])
  if (!n) return null
  return <section ref={ref} className="galeria secao" aria-label="Fotos do espaço">
    <div className="wrap galeria-cabeca">
      <Reveal><span className="sobretitulo">{GALERIA.sobretitulo}</span></Reveal>
      <Titulo linhas={[GALERIA.titulo]} destaque={GALERIA.destaque} className="h2" />
    </div>
    <div className="wrap">
      <div className="galeria-palco" tabIndex={0} role="region" aria-roledescription="carrossel" aria-label="Fotos do espaço. Passam sozinhas; use as setas do teclado ou arraste."
        onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); ir(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); ir(-1) } }}
        onPointerDown={e => { inicio.current = e.clientX; setSegurando(true) }}
        onPointerUp={e => { if (inicio.current !== null) { const dx = e.clientX - inicio.current; if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1) } inicio.current = null; setSegurando(false) }}
        onPointerLeave={() => { inicio.current = null; setSegurando(false) }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.img key={i} src={fotosDoEspaco[i]} alt={`Espaço de atendimento da ${RITA.nome}, foto ${i + 1} de ${n}`} custom={dir} draggable={false}
            variants={{ enter: (d: number) => ({ opacity: 0, scale: 1.06, x: reduced ? 0 : d * 60 }), center: { opacity: 1, scale: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -40 }) }}
            initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : 0.85, ease: EASE }} />
        </AnimatePresence>
        {n > 1 && <div className="galeria-tempo" aria-hidden="true">{fotosDoEspaco.map((f, k) => <span key={f} className={k < i ? 'is-feito' : ''}>{k === i && <i key={`${i}-${rodando}`} style={{ animationDuration: `${INTERVALO}ms`, animationPlayState: rodando ? 'running' : 'paused' }} />}</span>)}</div>}
      </div>
    </div>
  </section>
}

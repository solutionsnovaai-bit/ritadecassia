import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { HERO, MENSAGENS, PROMO, RITA } from '../content'
import { waLink } from '../lib/whatsapp'
import { textoRestante, usePromo } from '../lib/promo'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import BrandIcon from './BrandIcon'
import { EASE } from './Reveal'

// Mesma regra do <source> do hero: tela em pé ou estreita usa a arte vertical.
export const HERO_VERTICAL = '(max-width: 700px), (orientation: portrait)'

function PalavraQueGira({ pronto, ativo }: { pronto: boolean; ativo: boolean }) {
  const { reduced } = useMotionPreferences()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!pronto || !ativo || reduced) return
    const t = window.setInterval(() => setI(v => (v + 1) % HERO.palavras.length), 2600)
    return () => clearInterval(t)
  }, [pronto, ativo, reduced])
  const maior = HERO.palavras.reduce((a, b) => (b.length > a.length ? b : a))
  return <span className="hero-palavra" aria-hidden="true">
    <span className="hero-palavra-medida">{maior}</span>
    <AnimatePresence initial={false}>
      <motion.span key={i} className="hero-palavra-atual" initial={{ y: '105%', opacity: 0 }} animate={pronto ? { y: 0, opacity: 1 } : {}}
        exit={{ y: '-100%', opacity: 0, transition: { duration: reduced ? 0 : 0.7, ease: EASE, delay: 0 } }}
        transition={{ duration: reduced ? 0 : 0.95, ease: EASE, delay: pronto && i === 0 ? 0.32 : 0.08 }}>{HERO.palavras[i]}</motion.span>
    </AnimatePresence>
  </span>
}

/**
 * O texto cabe ao lado do logotipo da arte (ancorada à direita, nunca cortada)?
 * Se não couber com folga, o texto desce para baixo da arte.
 */
function useModoHero() {
  const [modo, setModo] = useState<'lado' | 'empilhado' | 'vertical'>(() => {
    if (typeof window === 'undefined') return 'lado'
    return window.matchMedia(HERO_VERTICAL).matches ? 'vertical' : 'lado'
  })
  useEffect(() => {
    const vertical = window.matchMedia(HERO_VERTICAL)
    const medir = () => {
      if (vertical.matches) return setModo('vertical')
      const w = window.innerWidth, h = Math.max(window.innerHeight, 740)
      const escala = Math.max(w / 1600, h / 900)
      const inicioLogo = w - 840 * escala // na arte, o logotipo começa em x=760 de 1600
      const gutter = Math.min(72, Math.max(20, w * 0.046))
      setModo(inicioLogo - gutter - 40 >= 420 ? 'lado' : 'empilhado')
    }
    medir()
    window.addEventListener('resize', medir)
    vertical.addEventListener('change', medir)
    return () => { window.removeEventListener('resize', medir); vertical.removeEventListener('change', medir) }
  }, [])
  return modo
}

export default function Hero({ pronto }: { pronto: boolean }) {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const ativo = useSceneActivity(ref)
  const modo = useModoHero()
  const lado = modo === 'lado'
  const promo = usePromo()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18, mass: 1.2 })
  const sy = useSpring(my, { stiffness: 40, damping: 18, mass: 1.2 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const arteX = useTransform(sx, v => v * -10)
  const arteY = useTransform(() => sy.get() * -8 + scrollYProgress.get() * 90)
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const mover = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !lado) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width * 2 - 1)
    my.set((e.clientY - r.top) / r.height * 2 - 1)
  }

  return <section id="inicio" ref={ref} className={`hero hero-${modo} ${pronto ? 'is-pronto' : ''} ${ativo && !reduced ? 'is-ativo' : ''}`} onPointerMove={mover} onPointerLeave={() => { mx.set(0); my.set(0) }}>
    <div className="hero-arte">
      <motion.picture className="hero-imagem" style={reduced || !lado ? undefined : { x: arteX, y: arteY }}>
        <source media={HERO_VERTICAL} srcSet="/images/hero/hero-mobile-600.webp 600w, /images/hero/hero-mobile.webp 900w" sizes="100vw" />
        <img src="/images/hero/hero-desktop.webp" srcSet="/images/hero/hero-desktop-1024.webp 1024w, /images/hero/hero-desktop.webp 1600w" sizes="100vw" width="1600" height="900" alt={`Logotipo ${RITA.marca} em dourado sobre tecido claro com folhas douradas`} fetchPriority="high" decoding="async" />
      </motion.picture>
      <span className="hero-brilho" aria-hidden="true" />
    </div>

    <motion.div className="hero-conteudo wrap" style={reduced || !lado ? undefined : { opacity: fade }}>
      {promo && <motion.a className="hero-promo" href={waLink(MENSAGENS.promo)} target="_blank" rel="noopener noreferrer" initial={reduced ? false : { opacity: 0, y: 10 }} animate={pronto ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.05, ease: EASE }}>
        <span className="hero-promo-selo">{PROMO.selo}</span>
        <span className="hero-promo-texto">{PROMO.moeda} {PROMO.valor}{PROMO.unidade} · {textoRestante(promo)}</span>
      </motion.a>}
      <motion.p className="sobretitulo hero-sobre" initial={reduced ? false : { opacity: 0, y: 10 }} animate={pronto ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}><span className="fio" />{HERO.sobretitulo}</motion.p>
      <h1 aria-label={`${HERO.linha} ${HERO.palavras.join(' ')}`}>
        <span className="line-mask" aria-hidden="true"><motion.span initial={reduced ? false : { y: '108%' }} animate={pronto ? { y: 0 } : {}} transition={{ duration: 1.15, delay: 0.16, ease: EASE }}>{HERO.linha}</motion.span></span>
        <PalavraQueGira pronto={pronto} ativo={ativo} />
      </h1>
      <motion.div className="hero-texto" initial={reduced ? false : { opacity: 0, y: 18 }} animate={pronto ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.62, ease: EASE }}>
        <p>{HERO.texto}</p>
        <div className="hero-acoes">
          <a className="botao botao-escuro" href={waLink(MENSAGENS.avaliacao)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{HERO.cta}</span></a>
          <a className="link" href={waLink(MENSAGENS.duvida)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" className="link-icone" />{HERO.secundario}</a>
        </div>
      </motion.div>
    </motion.div>

    <motion.div className="hero-rodape wrap" initial={reduced ? false : { opacity: 0 }} animate={pronto ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 1 }}>
      <a className="hero-rolar" href="#compromissos"><span className="hero-rolar-fio" aria-hidden="true" />{HERO.rolar}</a>
    </motion.div>
  </section>
}

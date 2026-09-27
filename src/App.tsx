import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import Compromissos from './components/Compromissos'
import Intro from './components/Intro'
import Faixa from './components/Faixa'
import Estetica from './components/Estetica'
import { PALAVRAS_TRATAMENTOS } from './content'
import Terapias from './components/Terapias'
import PedrasQuentes from './components/PedrasQuentes'
import Sessao from './components/Sessao'
import Sensacoes from './components/Sensacoes'
import Sobre from './components/Sobre'
import Galeria from './components/Galeria'
import Duvidas from './components/Duvidas'
import Agendar from './components/Agendar'
import Rodape from './components/Rodape'
import WhatsAppFab from './components/WhatsAppFab'
import DadosEstruturados from './components/DadosEstruturados'
import { MotionPreferencesProvider, useMotionPreferences } from './hooks/useMotionPreferences'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const semAbertura = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Site() {
  const { reduced } = useMotionPreferences()
  const [abertura, setAbertura] = useState(() => !semAbertura())
  const [pronto, setPronto] = useState(() => semAbertura())
  const [menu, setMenu] = useState(false)
  const site = useRef<HTMLDivElement>(null)
  useSmoothScroll(pronto && !menu)
  const { scrollYProgress } = useScroll()
  const progresso = useSpring(scrollYProgress, { stiffness: 110, damping: 30 })

  useEffect(() => {
    if (!abertura) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => { document.body.style.overflow = prev }
  }, [abertura])

  // O site se abre em círculo a partir do ponto onde a gota tocou.
  const revelar = useCallback(({ x, y }: { x: number; y: number }) => {
    const el = site.current
    setPronto(true)
    if (!el) { setAbertura(false); return }
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const anim = el.animate(
      [{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${Math.ceil(r)}px at ${x}px ${y}px)` }],
      { duration: 1250, easing: 'cubic-bezier(.65,0,.2,1)', fill: 'forwards' },
    )
    anim.finished.finally(() => { el.classList.remove('is-fechado'); anim.cancel(); setAbertura(false) })
  }, [])

  return <>
    {abertura && <Loader onRevelar={revelar} />}
    <div ref={site} className={`site ${abertura ? 'is-fechado' : ''}`} inert={!pronto}>
      <a className="pular-conteudo" href="#terapias">Pular para o conteúdo</a>
      <motion.div className="progresso" style={{ scaleX: reduced ? scrollYProgress : progresso }} aria-hidden="true" />
      <Header menuAberto={menu} setMenuAberto={setMenu} />
      <main>
        <Hero pronto={pronto} />
        <Compromissos />
        <Intro />
        <Faixa />
        <Terapias />
        <PedrasQuentes />
        <Sessao />
        <Sensacoes />
        <Faixa tom="dourado" reverso palavras={PALAVRAS_TRATAMENTOS} />
        <Estetica />
        <Sobre />
        <Galeria />
        <Duvidas />
        <Agendar />
      </main>
      <Rodape />
      <WhatsAppFab liberado={pronto && !menu} />
    </div>
    <DadosEstruturados />
  </>
}

export default function App() {
  return <MotionPreferencesProvider><Site /></MotionPreferencesProvider>
}

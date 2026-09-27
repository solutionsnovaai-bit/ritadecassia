import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NAV, RITA } from '../content'
import { waLink } from '../lib/whatsapp'
import Marca from './Marca'
import BrandIcon from './BrandIcon'
import { EASE } from './Reveal'

export default function Header({ menuAberto, setMenuAberto }: { menuAberto: boolean; setMenuAberto: (v: boolean) => void }) {
  const [rolou, setRolou] = useState(false)
  const [escuro, setEscuro] = useState(false)
  const [ativo, setAtivo] = useState('')
  const botao = useRef<HTMLButtonElement>(null)
  const painel = useRef<HTMLElement>(null)

  useEffect(() => {
    // Sobre as seções escuras, o cabeçalho também escurece.
    const escuras = Array.from(document.querySelectorAll<HTMLElement>('[data-topo="escuro"]'))
    let frame = 0
    const medir = () => {
      frame = 0
      setRolou(window.scrollY > 40)
      const linha = (document.querySelector('.topo') as HTMLElement | null)?.offsetHeight ?? 70
      setEscuro(escuras.some(el => { const r = el.getBoundingClientRect(); return r.top <= linha && r.bottom >= linha }))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(medir) }
    medir()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const secoes = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setAtivo(e.target.id) }), { rootMargin: '-45% 0px -50% 0px' })
    secoes.forEach(s => io.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); io.disconnect() }
  }, [])

  useEffect(() => {
    if (!menuAberto) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    painel.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuAberto(false); botao.current?.focus() }
      if (e.key === 'Tab') {
        const els = [botao.current, ...Array.from(painel.current?.querySelectorAll<HTMLElement>('a') ?? [])].filter(Boolean) as HTMLElement[]
        const i = els.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && i <= 0) { e.preventDefault(); els.at(-1)?.focus() }
        else if (!e.shiftKey && i === els.length - 1) { e.preventDefault(); els[0]?.focus() }
      }
    }
    const mq = window.matchMedia('(min-width: 1101px)')
    const onWide = () => { if (mq.matches) setMenuAberto(false) }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); mq.removeEventListener('change', onWide) }
  }, [menuAberto, setMenuAberto])

  return <header className={`topo ${rolou ? 'is-rolou' : ''} ${escuro && !menuAberto ? 'is-escuro' : ''} ${menuAberto ? 'is-menu' : ''}`}>
    <a className="topo-marca" href="#inicio" aria-label={`${RITA.marca}. Voltar ao início`} onClick={() => setMenuAberto(false)}><Marca /></a>
    <nav className="topo-nav" aria-label="Navegação principal">
      {NAV.map(n => <a key={n.id} href={`#${n.id}`} className={ativo === n.id ? 'is-ativo' : undefined} aria-current={ativo === n.id ? 'true' : undefined}>{n.nome}</a>)}
    </nav>
    <div className="topo-acoes">
      {RITA.instagram && <a className="topo-insta" href={RITA.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram da ${RITA.nome} (abre em nova aba)`}><BrandIcon brand="instagram" /></a>}
      <a className="botao botao-escuro botao-pequeno topo-agendar" href={waLink()} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>Agendar</span></a>
      <button ref={botao} className="topo-menu" aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuAberto} aria-controls="menu-movel" onClick={() => setMenuAberto(!menuAberto)}>{menuAberto ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}</button>
    </div>
    <AnimatePresence>{menuAberto && <motion.nav ref={painel} id="menu-movel" className="menu-movel" data-lenis-prevent aria-label="Navegação" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: EASE }}>
      <span className="sobretitulo">{RITA.slogan}</span>
      {NAV.map((n, i) => <a key={n.id} href={`#${n.id}`} onClick={() => setMenuAberto(false)}><small>0{i + 1}</small>{n.nome}<ArrowUpRight strokeWidth={1.4} /></a>)}
      <a className="menu-movel-cta" href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => setMenuAberto(false)}><BrandIcon brand="whatsapp" />Agendar pelo WhatsApp</a>
      {RITA.instagram && <a className="menu-movel-insta" href={RITA.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon brand="instagram" />{RITA.instagramHandle || 'Instagram'}</a>}
    </motion.nav>}</AnimatePresence>
  </header>
}

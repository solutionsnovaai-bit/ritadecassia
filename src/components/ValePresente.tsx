import { useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { Clock3, Droplets, Gift, Heart, Sparkles } from 'lucide-react'
import { MENSAGENS, VALE_PRESENTE as VP } from '../content'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import BrandIcon from './BrandIcon'
import Reveal, { EASE, Titulo } from './Reveal'
import { Lotus } from './Faixa'

/** Pétalas que caem devagar em volta do cartão (só enquanto a seção está na tela). Algumas passam na frente. */
const PETALAS = [
  { x: 2, t: 17, d: -2, s: 1, r: 220, dx: 34, frente: false },
  { x: 14, t: 21, d: -12, s: 0.7, r: -200, dx: -22, frente: false },
  { x: 30, t: 19, d: -6, s: 0.62, r: 260, dx: 40, frente: true },
  { x: 71, t: 23, d: -15, s: 0.55, r: -240, dx: -30, frente: true },
  { x: 86, t: 18, d: -4, s: 0.9, r: 210, dx: -40, frente: false },
  { x: 97, t: 22, d: -10, s: 1.1, r: -230, dx: 30, frente: false },
]

/** Borda irregular de lacre de cera. */
const CERA = (() => {
  const pts: string[] = []
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const r = 55 + 1.9 * Math.sin(a * 7 + 0.6) + 1.1 * Math.sin(a * 13 + 2.1) + 0.6 * Math.sin(a * 23)
    pts.push(`${(60 + r * Math.cos(a)).toFixed(2)} ${(60 + r * Math.sin(a)).toFixed(2)}`)
  }
  return `M${pts.join(' L')} Z`
})()

const limparNome = (v: string) => v.replace(/\s+/g, ' ').trim().slice(0, 24)

export default function ValePresente() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const ativo = useSceneActivity(ref)
  const [escolha, setEscolha] = useState<string | null>(null)
  const [nome, setNome] = useState('')

  // Cartão inclina com o mouse, como um cartão de verdade na mão.
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 110, damping: 15, mass: 0.8 })
  const sry = useSpring(ry, { stiffness: 110, damping: 15, mass: 0.8 })
  const inclinar = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    ry.set((x - 0.5) * 11); rx.set((0.5 - y) * 8)
    e.currentTarget.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
    e.currentTarget.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
  }
  const soltar = () => { rx.set(0); ry.set(0) }

  const op = VP.opcoes.find(o => o.id === escolha) ?? null
  const paraMim = op?.id === 'eu'
  const nomeLimpo = paraMim ? '' : limparNome(nome)
  const linha = nomeLimpo ? `Para ${nomeLimpo},` : (op ?? VP.etiquetaPadrao).etiqueta
  const fecho = (op ?? VP.etiquetaPadrao).fecho
  const href = waLink(MENSAGENS.presente(op?.para ?? '', nomeLimpo))
  const balanco = `${escolha ?? 'nada'}-${nomeLimpo ? 'nome' : ''}`
  const ICONES = [Droplets, Clock3, Lotus, Sparkles]

  return <section id="vale-presente" data-topo="escuro" ref={ref} className={`vp ${ativo && !reduced ? 'is-ativo' : ''}`} aria-label={VP.sobretitulo}>
    <div className="vp-ambiente" aria-hidden="true">
      <svg className="vp-defs" width="0" height="0" focusable="false">
        <defs>
          <radialGradient id="vp-petala-cor" cx="32%" cy="28%" r="85%"><stop offset="0" stopColor="#D24A5E" /><stop offset=".55" stopColor="#9C1B31" /><stop offset="1" stopColor="#560B18" /></radialGradient>
          <radialGradient id="vp-cera-cor" cx="38%" cy="32%" r="75%"><stop offset="0" stopColor="#9A2A3C" /><stop offset=".6" stopColor="#651223" /><stop offset="1" stopColor="#3E0813" /></radialGradient>
        </defs>
      </svg>
      <span className="vp-vela v1" /><span className="vp-vela v2" /><span className="vp-vela v3" />
    </div>

    <div className="wrap vp-grade">
      <header className="vp-cabeca">
        <Reveal><span className="sobretitulo"><Gift strokeWidth={1.6} aria-hidden="true" />{VP.sobretitulo}</span></Reveal>
        <Titulo linhas={VP.titulo} destaque={VP.destaque} className="h2" />
        <Reveal delay={0.15}><p className="vp-texto">{VP.texto}</p></Reveal>
      </header>

      <div className="vp-arte" onPointerMove={inclinar} onPointerLeave={soltar}>
        <div className="vp-petalas" aria-hidden="true">
          {PETALAS.map((p, i) => <span key={i} className={`vp-petala ${p.frente ? 'is-frente' : ''}`} style={{ '--x': `${p.x}%`, '--t': `${p.t}s`, '--d': `${p.d}s`, '--s': p.s, '--r': `${p.r}deg`, '--dx': `${p.dx}px` } as CSSProperties}>
            <svg viewBox="0 0 24 26"><path d="M12 1.5C18.5 5 21.5 12 18 18.6 15.6 23.2 10.4 25 6.8 21.7 2.4 17.6 3.2 7.6 12 1.5Z" fill="url(#vp-petala-cor)" /><path d="M11.6 5.5C9.4 10 9 15.6 10.6 21" fill="none" stroke="rgba(255,210,215,.25)" strokeWidth=".8" strokeLinecap="round" /></svg>
          </span>)}
        </div>
        <motion.div className="vp-entrada" initial={reduced ? false : { opacity: 0, y: 60, rotate: -7 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.3, ease: EASE }}>
          <motion.figure className="vp-cartao" style={reduced ? undefined : { rotateX: srx, rotateY: sry }}>
            <picture>
              <source media="(max-width: 700px)" srcSet="/images/presente/vale-presente-640.webp 640w, /images/presente/vale-presente.webp 1024w" sizes="86vw" />
              <img src="/images/presente/vale-presente.webp" srcSet="/images/presente/vale-presente-640.webp 640w, /images/presente/vale-presente.webp 1024w" sizes="(max-width: 900px) 86vw, 500px" width="1024" height="1536" alt={VP.alt} loading="lazy" decoding="async" />
            </picture>
            <span className="vp-cartao-brilho" aria-hidden="true" />
          </motion.figure>
          <span className="vp-selo" aria-hidden="true">
            <svg className="vp-selo-cera" viewBox="0 0 120 120" focusable="false">
              <path d={CERA} fill="url(#vp-cera-cor)" />
              <circle cx="60" cy="60" r="47" fill="none" stroke="rgba(0,0,0,.28)" strokeWidth="1.4" />
              <circle cx="60" cy="60" r="31" fill="none" stroke="rgba(230,195,138,.7)" strokeWidth=".9" />
              <path d="M60 72c-8.5-5.6-13-10.3-13-15.2 0-3.7 2.8-6.3 6.1-6.3 2.9 0 5.3 1.8 6.9 4.4 1.6-2.6 4-4.4 6.9-4.4 3.3 0 6.1 2.6 6.1 6.3 0 4.9-4.5 9.6-13 15.2Z" fill="none" stroke="#E6C38A" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            {/* O anel de texto gira como camada própria (só transform), sem repintar o lacre. */}
            <svg className="vp-selo-giro" viewBox="0 0 120 120" focusable="false">
              <path id="vp-selo-giro-caminho" d="M60 60 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" fill="none" />
              <text><textPath href="#vp-selo-giro-caminho" textLength="248" lengthAdjust="spacing">{VP.selo.toUpperCase()}</textPath></text>
            </svg>
          </span>
        </motion.div>
      </div>

      <div className="vp-detalhes">
        <ul className="vp-itens">
          {VP.itens.map((it, i) => {
            const Icone = ICONES[i]
            return <Reveal as="li" key={it.titulo} delay={0.08 * i}>
              {Icone === Lotus ? <Lotus className="vp-item-icone" /> : <Icone className="vp-item-icone" strokeWidth={1.2} aria-hidden="true" />}
              <p><strong>{it.titulo}</strong><span>{it.texto}</span></p>
            </Reveal>
          })}
        </ul>

        <Reveal className="vp-monte" delay={0.1}>
          <p className="vp-pergunta" id="vp-pergunta">{VP.pergunta}</p>
          <div className="vp-opcoes" role="group" aria-labelledby="vp-pergunta">
            {VP.opcoes.map(o => <button key={o.id} type="button" className={`vp-opcao ${escolha === o.id ? 'is-ativo' : ''}`} aria-pressed={escolha === o.id} onClick={() => setEscolha(v => (v === o.id ? null : o.id))}>
              {escolha === o.id && <motion.span layoutId="vp-opcao-fundo" className="vp-opcao-fundo" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              {o.rotulo}
            </button>)}
          </div>
          <label className={`vp-nome ${paraMim ? 'is-oculto' : ''}`} aria-hidden={paraMim}>
            <span>{VP.nomeRotulo} <em>({VP.nomeOpcional})</em></span>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder={VP.nomePlaceholder} maxLength={24} autoComplete="off" enterKeyHint="done" tabIndex={paraMim ? -1 : 0} />
          </label>

          <div className="vp-final">
            <div className="vp-pino" aria-hidden="true">
              <motion.div key={balanco} className="vp-balanco" initial={reduced ? false : { rotate: -16 }} animate={{ rotate: -4 }} transition={{ type: 'spring', stiffness: 120, damping: 6, mass: 0.9 }}>
                <span className="vp-cordao" />
                <div className="vp-etiqueta">
                  <span className="vp-furo" />
                  <p><span>{linha}</span><span>{fecho}</span></p>
                  <Heart size={15} strokeWidth={1.6} />
                </div>
              </motion.div>
            </div>
            <div className="vp-acoes">
              <p className="sr-only" aria-live="polite">{`${linha} ${fecho}`}</p>
              <a className="botao botao-ambar" href={href} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{paraMim ? VP.ctaEu : VP.cta}</span></a>
            </div>
          </div>
          <p className="vp-estetica"><a className="link link-claro" href={waLink(MENSAGENS.presenteEstetica)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" className="link-icone" />{VP.estetica}</a></p>
        </Reveal>
      </div>
    </div>

    <Reveal className="vp-assinatura wrap"><i aria-hidden="true" /><p>{VP.assinatura}<Heart size={16} strokeWidth={1.6} aria-hidden="true" /></p><i aria-hidden="true" /></Reveal>
  </section>
}

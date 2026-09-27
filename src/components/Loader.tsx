import { useCallback, useEffect, useRef, useState } from 'react'
import { RITA } from '../content'

const MINIMO = 3350
const LIMITE = 7000
const camada = (nome: string) => ({ src: `/images/marca/logo-${nome}-sm.webp`, srcSet: `/images/marca/logo-${nome}-sm.webp 673w, /images/marca/logo-${nome}.webp 1346w` })

/**
 * Abertura com o logotipo: a flor de lótus abre, a assinatura se escreve da esquerda para a direita,
 * a linha nasce do coração e uma luz passa pelo dourado. Uma gota de óleo cai no coração,
 * o toque vira ondas e o site se abre em círculo a partir dali.
 */
export default function Loader({ onRevelar }: { onRevelar: (origem: { x: number; y: number }) => void }) {
  const [pronto, setPronto] = useState(false)
  const [saindo, setSaindo] = useState(false)
  const alvo = useRef<HTMLSpanElement>(null)
  const feito = useRef(false)

  const sair = useCallback(() => {
    if (feito.current) return
    feito.current = true
    setSaindo(true)
    const r = alvo.current?.getBoundingClientRect()
    onRevelar(r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: window.innerWidth / 2, y: window.innerHeight / 2 })
  }, [onRevelar])

  useEffect(() => {
    let cancelado = false
    const retina = window.devicePixelRatio > 1.4 && window.innerWidth > 520
    const camadas = ['lotus', 'nome', 'linha'].map(n => {
      const im = new Image()
      im.src = `/images/marca/logo-${n}${retina ? '' : '-sm'}.webp`
      return im.decode().catch(() => {})
    })
    // A coreografia só começa com as três camadas prontas, para nada aparecer pela metade.
    Promise.allSettled(camadas).then(() => { if (!cancelado) setPronto(true) })
    const heroMobile = window.matchMedia('(max-width: 700px), (orientation: portrait)').matches
    const hero = new Image()
    hero.src = heroMobile ? '/images/hero/hero-mobile-600.webp' : '/images/hero/hero-desktop.webp'
    const minimo = new Promise<void>(r => window.setTimeout(r, MINIMO))
    Promise.allSettled([...camadas, hero.decode().catch(() => {}), document.fonts.ready]).then(() => minimo).then(() => { if (!cancelado) sair() })
    const limite = window.setTimeout(() => { if (!cancelado) sair() }, LIMITE)
    return () => { cancelado = true; clearTimeout(limite) }
  }, [sair])

  return <div className={`loader ${pronto ? 'is-tocando' : ''} ${saindo ? 'is-saindo' : ''}`} role="status" aria-label={`Abrindo o site de ${RITA.marca}`}>
    <div className="loader-luz" aria-hidden="true" />
    <div className="loader-palco">
      <div className="loader-logo" aria-hidden="true">
        <img className="ll-camada ll-lotus" {...camada('lotus')} sizes="min(640px, 86vw)" width="1346" height="732" alt="" />
        <img className="ll-camada ll-nome" {...camada('nome')} sizes="min(640px, 86vw)" width="1346" height="732" alt="" />
        <img className="ll-camada ll-linha" {...camada('linha')} sizes="min(640px, 86vw)" width="1346" height="732" alt="" />
        <span className="ll-brilho" />
        <span className="loader-impacto" ref={alvo}>
          <span className="loader-gota" />
          <span className="loader-onda o1" /><span className="loader-onda o2" /><span className="loader-onda o3" />
        </span>
      </div>
      <p className="loader-slogan" aria-hidden="true">{RITA.slogan}</p>
    </div>
    <button className="loader-pular" onClick={sair}>Pular</button>
  </div>
}

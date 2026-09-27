import { useRef } from 'react'
import { FAIXA } from '../content'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Seixo from './Seixo'

/** Flor de lótus em traço, a mesma geometria do logotipo, para separar palavras. */
export function Lotus({ className = '' }: { className?: string }) {
  return <svg className={`lotus ${className}`} viewBox="0 0 64 44" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M32 2C24 11 22.5 24 26 34c1.6 4.6 3.6 7.2 6 8.6 2.4-1.4 4.4-4 6-8.6C41.5 24 40 11 32 2Z" />
    <path d="M3 14c7.5-.2 14.4 2.2 19.2 7.4 3.1 3.4 4.8 7.9 5.2 13.4-5.4-.6-10.2-2.9-13.9-6.8C9.3 23.6 5.6 18.6 3 14Z" />
    <path d="M61 14c-7.5-.2-14.4 2.2-19.2 7.4-3.1 3.4-4.8 7.9-5.2 13.4 5.4-.6 10.2-2.9 13.9-6.8 4.2-4.4 7.9-9.4 10.5-14Z" />
  </svg>
}

type Props = { tom?: 'claro' | 'dourado'; reverso?: boolean; palavras?: readonly string[] }

/** Faixa de palavras em movimento contínuo. Para sozinha fora da tela. */
export default function Faixa({ tom = 'claro', reverso = false, palavras }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const ativo = useSceneActivity(ref)
  const { reduced } = useMotionPreferences()
  const rotulo = palavras ? palavras.join(' · ') : FAIXA.map(([a, b]) => `${a} ${b}`).join(' · ')
  return <div ref={ref} className={`faixa faixa-${tom} ${reverso ? 'is-reverso' : ''} ${ativo && !reduced ? 'is-movendo' : ''}`} role="img" aria-label={rotulo}>
    <div className="faixa-trilho" aria-hidden="true">
      {[0, 1].map(c => <div className="faixa-grupo" key={c}>
        {palavras
          ? palavras.map(p => <span className="faixa-item faixa-item-simples" key={p}><span>{p}</span><Lotus /></span>)
          : FAIXA.map(([a, b]) => <span className="faixa-item" key={a}><span>{a} <em>{b}</em></span><Seixo /></span>)}
      </div>)}
    </div>
  </div>
}

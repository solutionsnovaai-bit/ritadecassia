import type { CSSProperties } from 'react'
import { motion, useMotionValue, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

/**
 * Pilha de pedras de basalto (renderizadas em 3D) flutuando em equilíbrio.
 * Cada pedra respira no próprio ritmo, reage ao mouse com profundidade diferente
 * e pode se afastar (rolagem do hero) ou assentar (seção das pedras quentes).
 */

type Pedra = { id: string; w: number; h: number; x: number; prof: number; amp: number; dur: number; del: number; abre: number; assenta: number }

// Proporções medidas nos arquivos renderizados (largura da pedra de baixo = 1).
const BASE: Pedra[] = [
  { id: 'p1', w: 1, h: 0.4346, x: 0, prof: 0.35, amp: 4, dur: 7.2, del: 0, abre: 0, assenta: 0 },
  { id: 'p2', w: 0.8979, h: 0.4312, x: 0.02, prof: 0.6, amp: 6, dur: 6.3, del: -1.4, abre: 18, assenta: 8 },
  { id: 'p3', w: 0.7718, h: 0.4415, x: -0.016, prof: 0.85, amp: 8, dur: 6.9, del: -2.6, abre: 40, assenta: 17 },
  { id: 'p4', w: 0.6078, h: 0.445, x: 0.012, prof: 1.15, amp: 10, dur: 5.8, del: -3.5, abre: 66, assenta: 27 },
]
const K = 0.32 // a base da pedra de cima fica a 32% do topo da pedra de baixo
const TOPO = 0.06, BASE_FOLGA = 0.1

const layout = (() => {
  const tops: number[] = []
  let top = -BASE[0].h
  tops.push(top)
  for (let i = 1; i < BASE.length; i++) { top = top + K * BASE[i - 1].h - BASE[i].h; tops.push(top) }
  const alto = -tops[tops.length - 1] + TOPO + BASE_FOLGA
  const shift = -tops[tops.length - 1] + TOPO
  return {
    ratio: alto,
    pedras: BASE.map((p, i) => ({
      ...p,
      left: ((1 - p.w) / 2 + p.x) * 100,
      top: ((tops[i] + shift) / alto) * 100,
      topAbs: tops[i] + shift,
    })),
    chao: ((0 + shift) / alto) * 100,
  }
})()

export const PEDRAS_RATIO = layout.ratio

type Props = {
  variante: 'hero' | 'quente'
  mx?: MotionValue<number>
  my?: MotionValue<number>
  abrir?: MotionValue<number>
  assentar?: MotionValue<number>
  calor?: MotionValue<number>
  ativo: boolean
  largura: string
  eager?: boolean
}

function PedraItem({ p, i, props }: { p: (typeof layout.pedras)[number]; i: number; props: Props }) {
  const { variante, largura, eager } = props
  const nada = useMotionValue(0)
  const mx = props.mx ?? nada, my = props.my ?? nada, abrir = props.abrir ?? nada, assentar = props.assentar ?? nada
  const x = useTransform(mx, v => v * 14 * p.prof)
  const y = useTransform(() => my.get() * 9 * p.prof - abrir.get() * p.abre + assentar.get() * p.assenta)
  const opacidadeQuente = props.calor ?? nada
  const acima = layout.pedras[i + 1]
  const sizes = `calc(${largura} * ${p.w.toFixed(3)})`
  const src = (v: string) => ({ src: `/images/pedras/${p.id}-${v}.webp`, srcSet: `/images/pedras/${p.id}-${v}-sm.webp ${Math.round(436 * p.w)}w, /images/pedras/${p.id}-${v}.webp ${Math.round(872 * p.w)}w` })
  const sombra = acima && {
    '--mask': `url(/images/pedras/${p.id}-dia-sm.webp)`,
    '--sx': `${((acima.left + acima.w * 50 - p.left) / (p.w * 100)) * 100}%`,
    '--sy': `${((acima.topAbs + acima.h - p.topAbs) / p.h) * 100 - 6}%`,
    '--rx': `${(acima.w / p.w) * 40}%`,
    '--ry': `${24}%`,
    '--dur': `${acima.dur}s`,
    '--del': `${acima.del}s`,
  } as CSSProperties
  return <motion.div className="pf-pedra" style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.w * 100}%`, x, y, zIndex: i + 1 }}>
    <div className="pf-flutua" style={{ '--amp': `${p.amp}px`, '--dur': `${p.dur}s`, '--del': `${p.del}s` } as CSSProperties}>
      <img {...src('dia')} sizes={sizes} width={Math.round(872 * p.w)} height={Math.round(872 * p.h)} alt="" decoding="async" loading={eager ? 'eager' : 'lazy'} draggable={false} />
      {variante === 'quente' && <motion.img className="pf-img-quente" style={{ opacity: opacidadeQuente }} {...src('quente')} sizes={sizes} width={Math.round(872 * p.w)} height={Math.round(872 * p.h)} alt="" decoding="async" loading="lazy" draggable={false} />}
      {sombra && <span className="pf-sombra" style={sombra} />}
    </div>
  </motion.div>
}

export default function PedrasFlutuantes(props: Props) {
  const { variante, ativo } = props
  const nada = useMotionValue(0)
  const brasa = props.calor ?? nada
  return <div className={`pf pf-${variante} ${ativo ? 'is-ativo' : ''}`} style={{ aspectRatio: `1 / ${layout.ratio.toFixed(4)}` }} aria-hidden="true">
    {variante === 'hero'
      ? <span className="pf-chao" style={{ top: `${layout.chao}%`, '--dur': `${BASE[0].dur}s`, '--del': `${BASE[0].del}s` } as CSSProperties} />
      : <motion.span className="pf-brasa" style={{ top: `${layout.chao}%`, opacity: brasa }} />}
    {layout.pedras.map((p, i) => <PedraItem key={p.id} p={p} i={i} props={props} />)}
  </div>
}

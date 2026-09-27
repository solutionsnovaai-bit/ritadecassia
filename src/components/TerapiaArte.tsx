import { motion } from 'motion/react'
import type { Terapia } from '../content'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { EASE } from './Reveal'

/** Ilustrações de traço fino, desenhadas à mão para cada terapia. O traço se desenha ao entrar na tela. */
const DESENHOS: Record<Terapia['id'], { tracos: string[]; pontos?: [number, number, number][] }> = {
  relaxante: {
    tracos: [
      'M22 96 C 48 74 74 74 100 96 S 152 118 178 96',
      'M22 122 C 48 100 74 100 100 122 S 152 144 178 122',
      'M22 148 C 48 126 74 126 100 148 S 152 170 178 148',
      'M100 34 a 16 16 0 1 0 0.01 0',
    ],
  },
  pedras: {
    tracos: [
      'M40 152 C 40 140 70 134 100 134 C 132 134 160 140 160 152 C 160 164 132 170 100 170 C 70 170 40 164 40 152 Z',
      'M54 124 C 54 113 78 108 100 108 C 124 108 146 113 146 124 C 146 135 124 140 100 140 C 78 140 54 135 54 124 Z',
      'M66 98 C 66 89 84 85 100 85 C 118 85 134 89 134 98 C 134 107 118 111 100 111 C 84 111 66 107 66 98 Z',
      'M84 70 c -7 -9 7 -15 0 -24 c -7 -9 7 -15 0 -24',
      'M100 72 c -7 -9 7 -15 0 -24 c -7 -9 7 -15 0 -24',
      'M116 70 c -7 -9 7 -15 0 -24 c -7 -9 7 -15 0 -24',
    ],
  },
  drenagem: {
    tracos: [
      'M26 168 C 70 160 86 124 98 100 S 136 44 176 34',
      'M40 178 C 84 170 100 136 112 112 S 148 58 184 50',
      'M18 150 C 58 144 72 112 84 88 S 120 30 160 20',
      'M160 30 l 16 4 l -8 13',
    ],
    pontos: [[66, 146, 3.2], [98, 101, 3.2], [128, 60, 3.2]],
  },
  reflexologia: {
    tracos: [
      'M100 182 C 72 182 64 154 67 126 C 70 100 60 86 63 66 C 66 46 82 40 100 41 C 119 42 132 56 132 78 C 132 100 124 114 127 136 C 130 160 126 182 100 182 Z',
      'M73 30 a 7 8 0 1 0 0.01 0',
      'M89 22 a 8 9 0 1 0 0.01 0',
      'M106 21 a 7.5 8.5 0 1 0 0.01 0',
      'M121 26 a 6.5 7.5 0 1 0 0.01 0',
      'M134 36 a 5.5 6.5 0 1 0 0.01 0',
    ],
    pontos: [[98, 76, 3.4], [102, 112, 3.4], [100, 150, 3.4]],
  },
  escalda: {
    tracos: [
      'M36 112 L 164 112 L 151 160 C 149 168 142 173 133 173 L 67 173 C 58 173 51 168 49 160 Z',
      'M50 128 C 70 120 84 136 100 128 S 132 120 150 128',
      'M80 92 c -8 -10 8 -17 0 -28 c -8 -10 8 -17 0 -28',
      'M100 94 c -8 -10 8 -17 0 -28 c -8 -10 8 -17 0 -28',
      'M120 92 c -8 -10 8 -17 0 -28 c -8 -10 8 -17 0 -28',
      'M148 58 C 158 46 174 48 178 58 C 170 68 156 68 148 58 Z',
    ],
  },
}

export default function TerapiaArte({ id, className = '' }: { id: Terapia['id']; className?: string }) {
  const { reduced } = useMotionPreferences()
  const d = DESENHOS[id]
  return <svg className={`terapia-desenho ${className}`} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <motion.g initial={reduced ? 'show' : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.5 }}>
      {d.tracos.map((t, i) => <motion.path key={i} d={t} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.8, delay: 0.15 + i * 0.16, ease: EASE }, opacity: { duration: 0.2, delay: 0.15 + i * 0.16 } } } }} />)}
      {d.pontos?.map(([cx, cy, r], i) => <motion.circle key={`p${i}`} cx={cx} cy={cy} r={r} fill="currentColor"
        variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 1 + i * 0.2, ease: EASE } } }} style={{ transformOrigin: `${cx}px ${cy}px` }} />)}
    </motion.g>
  </svg>
}

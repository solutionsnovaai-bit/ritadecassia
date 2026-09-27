import { motion } from 'motion/react'
import type { Area } from '../content'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { EASE } from './Reveal'

/** Ilustrações de traço fino para cada área de tratamento. O traço se desenha ao entrar na tela. */
const DESENHOS: Record<Area['id'], { tracos: string[]; pontos?: [number, number, number][] }> = {
  // espelho oval com brilhos
  rosto: {
    tracos: [
      'M100 26 C 128 26 148 52 148 84 C 148 116 128 142 100 142 C 72 142 52 116 52 84 C 52 52 72 26 100 26 Z',
      'M100 38 C 121 38 137 59 137 84 C 137 109 121 130 100 130 C 79 130 63 109 63 84 C 63 59 79 38 100 38 Z',
      'M100 142 L 100 184',
      'M84 186 L 116 186',
      'M158 40 L 158 60 M 148 50 L 168 50',
      'M38 118 L 38 132 M 31 125 L 45 125',
      'M80 66 C 84 58 92 54 100 54',
    ],
  },
  // silhueta de cintura com fita métrica
  corpo: {
    tracos: [
      'M74 22 C 62 58 90 86 78 112 C 66 138 60 160 72 188',
      'M126 22 C 138 58 110 86 122 112 C 134 138 140 160 128 188',
      'M58 104 C 82 118 118 118 142 104',
      'M58 112 C 82 126 118 126 142 112',
    ],
    pontos: [[70, 110, 1.8], [84, 116, 1.8], [100, 118, 1.8], [116, 116, 1.8], [130, 110, 1.8]],
  },
  // fios em movimento com uma gota de sérum
  cabelos: {
    tracos: [
      'M66 24 C 56 62 88 92 70 132 C 60 156 70 176 84 188',
      'M86 22 C 76 60 108 90 90 130 C 80 154 90 174 104 186',
      'M106 22 C 96 60 128 90 110 130 C 100 154 110 174 124 186',
      'M126 26 C 118 60 146 88 130 124 C 122 144 128 162 138 176',
      'M160 58 C 152 70 150 78 150 84 C 150 91 155 96 160 96 C 165 96 170 91 170 84 C 170 78 168 70 160 58 Z',
    ],
  },
  // feixe de luz: um ponto que irradia
  laser: {
    tracos: [
      'M100 60 L 100 30', 'M100 140 L 100 170', 'M60 100 L 30 100', 'M140 100 L 170 100',
      'M72 72 L 51 51', 'M128 128 L 149 149', 'M128 72 L 149 51', 'M72 128 L 51 149',
      'M100 82 C 110 82 118 90 118 100 C 118 110 110 118 100 118 C 90 118 82 110 82 100 C 82 90 90 82 100 82 Z',
    ],
    pontos: [[100, 100, 4]],
  },
}

export default function TerapiaArte({ id, className = '' }: { id: Area['id']; className?: string }) {
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

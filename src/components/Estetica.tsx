import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { MENU, MENSAGENS } from '../content'
import type { Categoria } from '../content'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import BrandIcon from './BrandIcon'
import Reveal, { EASE, Titulo } from './Reveal'
import { Lotus } from './Faixa'

const CATEGORIAS: Categoria[] = ['Rosto', 'Corpo', 'Cabelos', 'Laser']
type Filtro = Categoria | 'Todos'

/**
 * Menu completo, na ordem do panfleto (duas colunas lidas de cima para baixo).
 * O filtro por área mostra só o que interessa; cada item abre o WhatsApp com a mensagem pronta.
 */
export default function Estetica() {
  const { reduced } = useMotionPreferences()
  const [filtro, setFiltro] = useState<Filtro>('Todos')
  const [duasColunas, setDuasColunas] = useState(() => window.matchMedia('(min-width: 901px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const on = () => setDuasColunas(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const numerados = MENU.itens.map((item, i) => ({ ...item, n: i + 1 }))
  const lista = useMemo(() => {
    if (filtro !== 'Todos') return numerados.filter(i => i.categoria === filtro)
    if (!duasColunas) return numerados
    // intercala as colunas para a grade (que preenche por linha) reproduzir a leitura do panfleto
    const normais = numerados.filter(i => i.detalhe.length <= 30)
    const largos = numerados.filter(i => i.detalhe.length > 30)
    const meio = Math.ceil(normais.length / 2)
    const esq = normais.slice(0, meio), dir = normais.slice(meio)
    const out: typeof numerados = []
    esq.forEach((item, k) => { out.push(item); if (dir[k]) out.push(dir[k]) })
    return [...out, ...largos]
  }, [filtro, duasColunas]) // eslint-disable-line react-hooks/exhaustive-deps

  const contar = (c: Filtro) => (c === 'Todos' ? MENU.itens.length : MENU.itens.filter(i => i.categoria === c).length)

  return <section id="menu" className="estetica secao">
    <div className="wrap estetica-cabeca">
      <div>
        <Reveal><span className="sobretitulo">{MENU.sobretitulo}</span></Reveal>
        <Titulo linhas={[MENU.titulo]} destaque={MENU.destaque} className="h2" />
      </div>
      <Reveal delay={0.15} className="estetica-intro">
        <Lotus className="estetica-lotus" />
        <p>{MENU.texto}</p>
      </Reveal>
    </div>
    <div className="wrap">
      <div className="filtros" role="group" aria-label="Filtrar tratamentos por área">
        {(['Todos', ...CATEGORIAS] as Filtro[]).map(c => <button key={c} type="button" className={`filtro ${filtro === c ? 'is-ativo' : ''}`} aria-pressed={filtro === c} onClick={() => setFiltro(c)}>
          {filtro === c && !reduced && <motion.span layoutId="filtro-fundo" className="filtro-fundo" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
          {filtro === c && reduced && <span className="filtro-fundo" />}
          <span className="filtro-rotulo">{c === 'Todos' ? MENU.todos : c}<small>{contar(c)}</small></span>
        </button>)}
      </div>
    </div>
    <motion.ul layout={!reduced} className={`wrap estetica-lista ${filtro === 'Todos' ? 'is-todos' : ''}`} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        {lista.map((t, k) => <motion.li key={t.nome} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }} transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : Math.min(k, 8) * 0.03 }} className={t.detalhe.length > 30 ? 'estetica-largo' : undefined}>
          <a href={waLink(MENSAGENS.tratamento(t.nome))} target="_blank" rel="noopener noreferrer" aria-label={`${t.nome}: saber mais pelo WhatsApp`}>
            <span className="estetica-num">{String(t.n).padStart(2, '0')}</span>
            <span className="estetica-nome">{t.nome}{t.detalhe && <small>{t.detalhe}</small>}</span>
            <span className="estetica-cat">{t.categoria}</span>
            <span className="estetica-acao"><BrandIcon brand="whatsapp" /><span>{MENU.cta}</span><ArrowUpRight size={15} strokeWidth={1.6} /></span>
          </a>
        </motion.li>)}
      </AnimatePresence>
    </motion.ul>
    <Reveal className="wrap estetica-fim">
      <a className="botao botao-escuro" href={waLink(MENSAGENS.avaliacao)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>Agendar minha avaliação</span></a>
    </Reveal>
  </section>
}

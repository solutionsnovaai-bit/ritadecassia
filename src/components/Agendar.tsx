import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Clock, MapPin } from 'lucide-react'
import { AGENDAR, RITA } from '../content'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import BrandIcon from './BrandIcon'
import Reveal, { EASE, Titulo } from './Reveal'

const QUANDO: Record<string, string> = { 'Manhã': 'Se possível, pela manhã.', 'Tarde': 'Se possível, à tarde.', 'Noite': 'Se possível, à noite.', 'Tanto faz': 'Tenho horário flexível.' }

function montar(terapia: string, periodo: string, nome: string) {
  const partes = [`Olá, ${RITA.nome}!`]
  const n = nome.trim().replace(/\s+/g, ' ').slice(0, 40)
  if (n) partes.push(`Aqui é ${n}.`)
  const naoSei = !terapia || terapia === AGENDAR.naoSei
  partes.push(naoSei ? 'Vim pelo site e quero agendar uma avaliação, mas ainda não sei qual tratamento escolher.' : terapia === 'Massagem' ? 'Vim pelo site e quero agendar uma massagem.' : `Vim pelo site e quero agendar uma avaliação de ${terapia.toLowerCase()}.`)
  if (periodo) partes.push(QUANDO[periodo])
  partes.push(naoSei ? 'Pode me ajudar a escolher e me passar os horários?' : 'Quais horários você tem?')
  return partes.join(' ')
}

export default function Agendar() {
  const { reduced } = useMotionPreferences()
  const [terapia, setTerapia] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [nome, setNome] = useState('')
  const mensagem = useMemo(() => montar(terapia, periodo, nome), [terapia, periodo, nome])
  const link = waLink(mensagem)
  const opcoes = [...AGENDAR.opcoes, AGENDAR.naoSei]

  return <section id="agendar" data-topo="escuro" className="agendar">
    <span className="agendar-luz" aria-hidden="true" />
    <div className="wrap agendar-grade">
      <div className="agendar-texto">
        <Reveal><span className="sobretitulo">{AGENDAR.sobretitulo}</span></Reveal>
        <Titulo linhas={[AGENDAR.titulo]} destaque={AGENDAR.destaque} className="h2" />
        <Reveal delay={0.15}><p>{AGENDAR.texto}</p></Reveal>
        {(RITA.whatsappExibicao || RITA.instagram || RITA.atendimento || RITA.horario) && <Reveal delay={0.2}>
          <ul className="agendar-info">
            {RITA.whatsappExibicao && <li><BrandIcon brand="whatsapp" /><a href={waLink()} target="_blank" rel="noopener noreferrer">{RITA.whatsappExibicao}</a></li>}
            {RITA.instagram && <li><BrandIcon brand="instagram" /><a href={RITA.instagram} target="_blank" rel="noopener noreferrer">{RITA.instagramHandle || 'Instagram'}</a></li>}
            {RITA.atendimento && <li><MapPin size={20} strokeWidth={1.4} />{RITA.mapa ? <a href={RITA.mapa} target="_blank" rel="noopener noreferrer">{RITA.atendimento}</a> : <span>{RITA.atendimento}</span>}</li>}
            {RITA.horario && <li><Clock size={20} strokeWidth={1.4} /><span>{RITA.horario}</span></li>}
          </ul>
        </Reveal>}
      </div>

      <Reveal className="agendar-cartao" delay={0.1}>
        <form onSubmit={e => { e.preventDefault(); window.open(link, '_blank', 'noopener,noreferrer') }}>
          <fieldset>
            <legend><span>01</span>{AGENDAR.passos.terapia}</legend>
            <div className="chips">{opcoes.map(o => <label key={o} className="chip"><input type="radio" name="terapia" value={o} checked={terapia === o} onChange={() => setTerapia(o)} /><span>{o}</span></label>)}</div>
          </fieldset>
          <fieldset>
            <legend><span>02</span>{AGENDAR.passos.periodo}</legend>
            <div className="chips">{AGENDAR.periodos.map(o => <label key={o} className="chip"><input type="radio" name="periodo" value={o} checked={periodo === o} onChange={() => setPeriodo(o)} /><span>{o}</span></label>)}</div>
          </fieldset>
          <div className="campo">
            <label htmlFor="agendar-nome"><span>03</span>{AGENDAR.passos.nome}</label>
            <input id="agendar-nome" name="nome" autoComplete="given-name" maxLength={40} value={nome} onChange={e => setNome(e.target.value)} placeholder={AGENDAR.nomePlaceholder} />
          </div>
          <div className="previa" aria-live="polite">
            <div className="previa-topo"><span className="previa-avatar" aria-hidden="true">{RITA.nome.charAt(0)}</span><span><strong>{RITA.marca}</strong><small>{RITA.whatsappExibicao || RITA.descritor}</small></span></div>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p key={mensagem} className="previa-balao" initial={reduced ? false : { opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                {mensagem}<span className="previa-hora" aria-hidden="true">agora</span>
              </motion.p>
            </AnimatePresence>
          </div>
          <a className="botao botao-whats" href={link} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{AGENDAR.botao}</span></a>
          <p className="agendar-aviso">{AGENDAR.aviso}</p>
        </form>
      </Reveal>
    </div>
  </section>
}

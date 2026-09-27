import { ArrowUp } from 'lucide-react'
import { NAV, RITA, RODAPE } from '../content'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Marca from './Marca'
import BrandIcon from './BrandIcon'

export default function Rodape() {
  const { paused, toggle } = useMotionPreferences()
  return <footer className="rodape">
    <div className="wrap rodape-topo">
      <a href="#inicio" className="rodape-marca" aria-label={`${RITA.marca}, voltar ao início`}><Marca variante="rodape" /></a>
      <p className="rodape-assinatura">{RITA.slogan}</p>
    </div>
    <div className="wrap rodape-grade">
      <nav aria-label="Rodapé">
        <span className="sobretitulo">Navegue</span>
        {NAV.map(n => <a key={n.id} href={`#${n.id}`}>{n.nome}</a>)}
      </nav>
      <div>
        <span className="sobretitulo">Agende</span>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="rodape-contato"><BrandIcon brand="whatsapp" />{RITA.whatsappExibicao || 'WhatsApp'}</a>
        {RITA.instagram && <a href={RITA.instagram} target="_blank" rel="noopener noreferrer" className="rodape-contato"><BrandIcon brand="instagram" />{RITA.instagramHandle || 'Instagram'}</a>}
        {RITA.atendimento && <span className="rodape-dado">{RITA.atendimento}</span>}
        {RITA.horario && <span className="rodape-dado">{RITA.horario}</span>}
      </div>
      <div className="rodape-voltar">
        <a className="link" href="#inicio">Voltar ao topo<ArrowUp size={15} strokeWidth={1.6} /></a>
      </div>
    </div>
    <div className="wrap rodape-base">
      <span>© {new Date().getFullYear()} {RITA.marca} · {RITA.descritor}</span>
      <span>{RODAPE.credito}</span>
      <button className="botao-movimento" onClick={toggle} aria-pressed={paused}>{paused ? 'Retomar movimento' : 'Pausar movimento'}</button>
    </div>
    <p className="wrap rodape-legal">{RODAPE.legal}</p>
  </footer>
}

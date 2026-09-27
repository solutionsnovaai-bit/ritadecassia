import { RITA } from '../content'

/** Logotipo Rita de Cássia (dourado, fundo transparente). */
export default function Marca({ className = '', variante = 'topo' }: { className?: string; variante?: 'topo' | 'rodape' }) {
  if (variante === 'topo') return <img className={`marca marca-topo ${className}`} src="/images/marca/logo-topo.webp" width="276" height="150" alt={RITA.marca} decoding="async" />
  return <img className={`marca marca-rodape ${className}`} src="/images/marca/logo-sm.webp" srcSet="/images/marca/logo-sm.webp 673w, /images/marca/logo.webp 1346w" sizes="(max-width: 900px) 78vw, 440px" width="1346" height="732" alt={RITA.marca} loading="lazy" decoding="async" />
}

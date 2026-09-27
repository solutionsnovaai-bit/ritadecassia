/** Seixo desenhado à mão: o pequeno ícone que separa as palavras nas faixas. */
export default function Seixo({ className = '' }: { className?: string }) {
  return <svg className={`seixo ${className}`} viewBox="0 0 48 30" aria-hidden="true" focusable="false">
    <path d="M4.2 17.6C3 11.4 9.8 5.2 19.6 3.8c9.6-1.4 21.4.4 23.9 7.1 2.4 6.4-4.1 13.6-14.9 15.3C17.5 28 5.5 24.3 4.2 17.6Z" fill="currentColor" />
    <path d="M12 9.6c3.8-2.5 9.4-3.4 13.6-3" fill="none" stroke="rgba(255,248,238,.55)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
}

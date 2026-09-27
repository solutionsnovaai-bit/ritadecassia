import { MENSAGENS, RITA } from '../content'

const numero = RITA.whatsapp.replace(/\D/g, '')
export const temWhatsApp = /^\d{12,13}$/.test(numero)

if (import.meta.env.DEV && !temWhatsApp) {
  console.warn('[Rita] Preencha RITA.whatsapp em src/content.ts (55 + DDD + número).')
}

/** Link do WhatsApp com a mensagem pronta. Sem número cadastrado, abre o WhatsApp para escolher o contato. */
export function waLink(mensagem: string = MENSAGENS.padrao) {
  const texto = encodeURIComponent(mensagem)
  return temWhatsApp ? `https://wa.me/${numero}?text=${texto}` : `https://wa.me/?text=${texto}`
}

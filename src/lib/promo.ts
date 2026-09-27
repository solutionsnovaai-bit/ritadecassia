import { useEffect, useState } from 'react'
import { PROMO } from '../content'

const fim = new Date(PROMO.validaAte).getTime()

function calcular() {
  const resta = fim - Date.now()
  if (!PROMO.ativa || !Number.isFinite(fim) || resta <= 0) return null
  const dias = Math.floor(resta / 86_400_000)
  const horas = Math.floor((resta % 86_400_000) / 3_600_000)
  const minutos = Math.floor((resta % 3_600_000) / 60_000)
  return { dias, horas, minutos }
}

/** A promoção só aparece enquanto está valendo. Atualiza a contagem a cada 30 segundos. */
export function usePromo() {
  const [resta, setResta] = useState(calcular)
  useEffect(() => {
    if (!resta) return
    const t = window.setInterval(() => setResta(calcular()), 30_000)
    return () => clearInterval(t)
  }, [resta === null])
  return resta
}

/** Data final curta, no horário de Brasília (ex.: "31/10"). */
export const dataFinal = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' }).format(fim)

export function textoRestante(r: { dias: number; horas: number; minutos: number }) {
  if (r.dias >= 7) return `válida até ${dataFinal}`
  if (r.dias >= 2) return `termina em ${r.dias} dias`
  if (r.dias === 1) return 'termina amanhã'
  if (r.horas >= 1) return `termina em ${r.horas}h`
  return `termina em ${r.minutos} min`
}

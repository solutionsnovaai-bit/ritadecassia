/**
 * Fotos reais entram sozinhas: basta colocar o arquivo em src/assets/fotos/ com o nome certo
 * e publicar de novo. Nenhuma linha de código precisa mudar.
 *
 *   rita.webp                      → retrato na seção "Quem cuida de você"
 *   tratamento-rosto.webp          → card "Pele e rosto"
 *   tratamento-corpo.webp          → card "Corpo e contorno"
 *   tratamento-cabelos.webp        → card "Cabelos"
 *   tratamento-laser.webp          → card "Depilação a laser"
 *   espaco-01.webp, espaco-02.webp → galeria "O espaço" (aparece a partir de 1 foto)
 *
 * Aceita .webp, .jpg, .jpeg, .png e .avif. Ideal: 1600 px no lado maior.
 */
const arquivos = import.meta.glob('../assets/fotos/*.{webp,jpg,jpeg,png,avif}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const porNome: Record<string, string> = {}
for (const [caminho, url] of Object.entries(arquivos)) {
  const nome = caminho.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase()
  porNome[nome] = url
}

export const fotoDaRita = porNome['rita'] ?? null
export const fotoDaArea = (id: string) => porNome[`tratamento-${id}`] ?? null
export const fotosDoEspaco = Object.keys(porNome).filter(n => n.startsWith('espaco')).sort().map(n => porNome[n])

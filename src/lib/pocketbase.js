import PocketBase from 'pocketbase'

export const pb = new PocketBase('https://db.sergiopessoasolar.com.br')

export async function getSiteAtivo() {
  try {
    const rec = await pb.collection('configuracoes').getFirstListItem('chave="site_ativo"')
    return rec.valor === 'true'
  } catch {
    return true
  }
}

export async function getPageData() {
  try {
    const rec = await pb.collection('paginas').getFirstListItem('slug="home"')
    return JSON.parse(rec.content)
  } catch {
    return null
  }
}

export async function savePageData(data) {
  try {
    const rec = await pb.collection('paginas').getFirstListItem('slug="home"')
    return await pb.collection('paginas').update(rec.id, { content: JSON.stringify(data) })
  } catch {
    return await pb.collection('paginas').create({ slug: 'home', content: JSON.stringify(data) })
  }
}

export async function setSiteAtivo(valor) {
  try {
    const rec = await pb.collection('configuracoes').getFirstListItem('chave="site_ativo"')
    return await pb.collection('configuracoes').update(rec.id, { valor: String(valor) })
  } catch {
    return await pb.collection('configuracoes').create({ chave: 'site_ativo', valor: String(valor) })
  }
}

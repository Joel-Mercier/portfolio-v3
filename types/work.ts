export type Work = {
  title: string
  client: string
  role: string
  date: string
  mainImg: string
  short: string
  slug: string
  colors: string[]
  content: {
    type: string,
    url?: string,
    title?: string,
    content?: string,
  }[]
}
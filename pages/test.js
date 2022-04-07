import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import { getAllPostsNotion } from '@/lib/notionpod'
import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  //const posts = await getAllFilesFrontMatter('blog')
  const posts = await getAllPostsNotion(process.env.NOTION_DB_ID)

  return { props: { posts } }
}

export default function Home({ posts }) {
  return <pre>{JSON.stringify(posts, null, 2)}</pre>
}

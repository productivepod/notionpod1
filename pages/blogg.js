import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Client } from '@notionhq/client'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/PostSimple'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

const blogg = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default function Blogg({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })
  const posts1 = await getAllFilesFrontMatter('blog')
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
  })

  const notiondata = posts.results.map((post) => ({
    id: post.id,
    date: post.created_time,
    lastmod: post.last_edited_time,
    title: post.properties.Name.title[0].plain_text,
    tags: post.properties.Tags.multi_select.map((tag) => tag.name),
    slug: post.properties.Slug.formula.string,
    draft: post.properties.Published.checkbox,
    summary: 'abcd',
    layout: 'PostSimple',
  }))

  const initialDisplayPosts = notiondata.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

//export default blogg

import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { getAllPostsNotion } from '@/lib/notionpod'
export const POSTS_PER_PAGE = 5

export const getStaticProps = async () => {
  const notiondata = await getAllPostsNotion(process.env.NOTION_DB_ID)
  const initialDisplayPosts = notiondata.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(notiondata.length / POSTS_PER_PAGE),
  }
  return { props: { initialDisplayPosts, posts: notiondata, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  //console.log(posts);
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

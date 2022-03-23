import { Client } from '@notionhq/client'

export async function getAllPostsNotion() {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

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

  return notiondata
}

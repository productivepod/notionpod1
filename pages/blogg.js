import { Client } from '@notionhq/client'

const blogg = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
  })

  return {
    props: {
      data,
    },
  }
}

export default blogg

import { useSelector } from 'react-redux'

import Article from '../article/artikle'

export default function CreateArticleList() {
  const articles = useSelector((state) => state.main.article)
  const elements = articles.map((item) => {
    return (
      <li key={item.slug}>
        <Article data={item} />
      </li>
    )
  })

  return <ul>{elements}</ul>
}

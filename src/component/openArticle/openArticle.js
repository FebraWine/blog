import { useSelector } from 'react-redux'

import Article from '../article/artikle'

export default function OpenArticle() {
  const post = useSelector((state) => state.main.oneArticle)
  return (
    <div>
      <Article data={post} text={post.body} />
    </div>
  )
}

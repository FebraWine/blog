import { Popconfirm } from 'antd'
import { useDispatch } from 'react-redux'

import { deleteArticle } from '../../../api/articleApi'
import style from '../../../SCSS/article.module.scss'

export default function Validate(props) {
  const dispatch = useDispatch()
  const [token, text, slug] = props.data

  const handleClick = () => {
    dispatch(deleteArticle([token, text, slug]))
  }

  return (
    <div className={style.side}>
      <Popconfirm
        placement="right"
        title="Are you sure to delete this article?"
        onOpenChange={() => null}
        onConfirm={handleClick}
      >
        <a href="/">
          <button className={style.delete} type="button">
            Delete
          </button>
        </a>
      </Popconfirm>
    </div>
  )
}

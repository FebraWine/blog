import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { getArticles } from '../../api/articleApi'
import style from '../../SCSS/paginationList.module.scss'

export default function PaginationList() {
  const totalPage = useSelector((state) => state.main.articlesCount)
  const page = useSelector((state) => state.main.page)
  const dispatch = useDispatch()

  return (
    <Pagination
      align="center"
      onChange={(target) => dispatch(getArticles(target))}
      className={style.pages}
      defaultCurrent={1}
      current={page}
      defaultPageSize={5}
      total={totalPage}
    />
  )
}

import { Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'

import { getOneArticle, getArticleEdit, postLike, deleteLike } from '../../api/articleApi'
import TagList from '../tagList/tagList'
import Validate from '../alert/validate/validate'
import style from '../../SCSS/article.module.scss'

const heart = require('../../assets/img/h.PNG')
const redHeart = require('../../assets/img/redHeart.png')

export default function Article(props) {
  const user = useSelector((state) => state.Login.user)
  const token = useSelector((state) => state.Login.token)
  const like = useSelector((state) => state.like.like)
  const favor = useSelector((state) => state.like.slug)
  const { userName: userNameAuthor } = user
  const dispatch = useDispatch()
  const { data, text } = props
  if (!data) {
    return null
  }

  // хз хз, при изменении статуса лайка, если
  // перезапускаем страницу, то api возвращает false всегда
  // лайкал или нет
  // сделал сердечко через костыль
  // либо нужно запариться и через localSt сделать?

  const { author, description, title, favoritesCount, createdAt, slug, tagList } = data
  const { username, image } = author

  const tags = tagList.map((item) => {
    return <TagList tag={item} />
  })

  const handleEdit = () => {
    dispatch(getArticleEdit([data]))
  }

  const handleLike = () => {
    if (!like && token) {
      dispatch(postLike([token, slug]))
    } else if (token) {
      dispatch(deleteLike([token, slug]))
    }
  }
  return (
    <div className={style.content}>
      <div className={style.wrapper}>
        <Flex>
          <div className={style.leftSide}>
            <Flex>
              <Link to={`/article/${slug}`}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(getOneArticle(slug))
                  }}
                >
                  <h2 className={style.title}>{title}</h2>
                </button>
              </Link>
              <div className={style.heart}>
                <button type="button" onClick={handleLike}>
                  <img src={like && slug === favor ? redHeart : heart} className={style.heartImg} alt="Сердце" />
                </button>
              </div>
              <span className={style.count}>{favoritesCount}</span>
            </Flex>
            <p>{tags}</p>
          </div>
          <div className={style.rightSide}>
            <Flex>
              <div>
                <p className={style.author}>{username}</p>
                <p className={style.date}>{format(Date.parse(createdAt), 'PP')}</p>
              </div>
              <div>
                <img src={image} className={style.avatar} alt="Аватарка" />
              </div>
            </Flex>
            {username === userNameAuthor && text && (
              <div className={style.admin}>
                <Validate data={[token, text, slug]} />
                <Link to={`/articles/${slug}/edit`}>
                  <button onClick={handleEdit} className={style.edit} type="button">
                    Edit
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Flex>

        <div className={style.text}>
          <p>{description}</p>
        </div>
        <ReactMarkdown className={style.markdown}>{text || null}</ReactMarkdown>
      </div>
    </div>
  )
}

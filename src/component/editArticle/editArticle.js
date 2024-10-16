/* eslint-disable react/jsx-props-no-spreading */
// import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { putArticleEdit } from '../../api/articleApi'
import { putAddTag, deleteTag } from '../../store/editArticle/editArticle'
import style from '../../SCSS/createNewArticle.module.scss'

export default function EditArticle() {
  const dispatch = useDispatch()
  const article = useSelector((state) => state.edit.article)
  const token = useSelector((state) => state.Login.token)
  const tagList = useSelector((state) => state.edit.tagList)

  const { body, description, title, slug } = article

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  const onSubmit1 = (data) => {
    dispatch(putArticleEdit([data, token, slug]))
  }

  const handleClick = () => {
    dispatch(putAddTag(tagList))
  }

  const handleDelete = (item) => {
    dispatch(deleteTag([item, tagList]))
  }

  const elements = tagList.map((item) => {
    return (
      <li key={item}>
        <input
          {...register(`tags${item}`)}
          className={style.tag}
          type="text"
          placeholder="tag"
          defaultValue={typeof item === 'number' ? '' : item}
        />
        <input value="delete" className={style.warning} onClick={() => handleDelete(item)} type="button" />
      </li>
    )
  })

  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <h2 className={style.title}>Create new article</h2>
        <form onSubmit={handleSubmit(onSubmit1)} className={style.boxForm}>
          <label className={style.box} htmlFor="Title">
            Title
            <input
              {...register('title', {
                required: 'Поле обязательно к заполнению',
              })}
              className={style.el}
              id="Title"
              type="text"
              placeholder="Title"
              defaultValue={title}
            />
            <div>
              <p className={style.error}>{null || errors?.title?.message}</p>
            </div>
          </label>

          <label className={style.box} htmlFor="address">
            Short desription
            <input
              {...register('desription', {
                required: 'Поле обязательно к заполнению',
              })}
              className={style.el}
              id="address"
              type="text"
              placeholder="Short desription"
              defaultValue={description}
            />
            <div>
              <p className={style.error}>{null || errors?.desription?.message}</p>
            </div>
          </label>

          <label className={style.box} htmlFor="new-password">
            Text
            <textarea
              placeholder="Text"
              {...register('text', {
                required: 'Поле обязательно к заполнению',
              })}
              defaultValue={body}
            />
            <div>
              <p className={style.error}>{null || errors?.text?.message}</p>
            </div>
          </label>

          <label className={style.boxTag} htmlFor="new-password">
            <p className={style.titleTag}>Tags</p>
            <ul>{elements}</ul>
            <input className={style.add} type="button" onClick={handleClick} value="Add tag" />
          </label>

          <button type="submit" className={style.bt}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

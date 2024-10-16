/* eslint-disable react/jsx-props-no-spreading */
// import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { postArticle } from '../../api/articleApi'
import { addTag, deleteTag } from '../../store/createArticle/createArticle'
import style from '../../SCSS/createNewArticle.module.scss'

export default function CreateNewArticle() {
  const dispatch = useDispatch()
  const tags = useSelector((state) => state.create.tags)
  const token = useSelector((state) => state.Login.token)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  const onSubmit1 = (data) => {
    dispatch(postArticle([data, token]))
  }

  const handleClick = () => {
    dispatch(addTag(tags))
  }

  const handleDelete = (item) => {
    dispatch(deleteTag([tags, item]))
  }

  const elements = tags.map((item) => {
    return (
      <li key={item}>
        <input {...register(`tags${item}`)} className={style.tag} type="text" placeholder="tag" />
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

          <a href="/">
            <button type="submit" className={style.bt}>
              Send
            </button>
          </a>
        </form>
      </div>
    </div>
  )
}

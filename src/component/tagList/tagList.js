import style from '../../SCSS/tagList.module.scss'

export default function TagList(props) {
  const { tag } = props

  return (
    <span key={tag} className={style.tag}>
      {tag}
    </span>
  )
}

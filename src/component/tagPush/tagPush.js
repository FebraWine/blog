// import { useDispatch, useSelector } from 'react-redux'

// import { deleteTag } from '../../store/createArticle/createArticle'
// import style from '../../SCSS/tagPush.module.scss'

// export default function TagPush() {
//   const dispatch = useDispatch()
//   const tags = useSelector((state) => state.create.tags)

//   const handleClick = (item) => {
//     dispatch(deleteTag([tags, item]))
//   }

//   const elements = tags.map((item) => {
//     return (
//       <li key={item}>
//         <input className={style.text} type="text" placeholder="tag" />
//         <input value="delete" className={style.bt} onClick={() => handleClick(item)} type="button" />
//       </li>
//     )
//   })

//   return <ul>{elements}</ul>
// }

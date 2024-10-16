import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Flex } from 'antd'

import { logOut } from '../../store/register/register'
import style from '../../SCSS/header.module.scss'

export default function Header() {
  const dispatch = useDispatch()
  const userLog = useSelector((state) => state.Login)
  const { token, user } = userLog
  const { img, userName } = user

  const hundleClick = () => {
    dispatch(logOut())
  }

  const avatar = 'https://static.productionready.io/images/smiley-cyrus.jpg'

  return (
    <div className={style.header}>
      <Link to="/">
        <h1 className={style.title}>Realworld Blog</h1>
      </Link>
      <div className={style.bt}>
        {token ? (
          <div>
            <Flex className={style.bar}>
              <Link to="/new-article" className={style.create}>
                Create article
              </Link>
              <Link to="/profile">
                <Flex>
                  <p className={style.nick}>{userName}</p>
                  <img className={style.avatar} src={img || avatar} alt="аватарка" />
                </Flex>
              </Link>
              <button onClick={hundleClick} className={style.out} type="button">
                Log Out
              </button>
            </Flex>
          </div>
        ) : (
          <div>
            <Link to="/sign-in" className={style.in}>
              Sign In
            </Link>
            <Link to="/sign-up" className={style.up}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

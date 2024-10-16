/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { getAccount } from '../../api/articleApi'
import ErrorAlert from '../alert/error/error'
import style from '../../SCSS/singIn.module.scss'

export default function SingIn() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.Login.error)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  const onSubmit1 = (data) => {
    dispatch(getAccount(data))
  }

  return (
    <div className={style.wrapper}>
      {error ? (
        <ErrorAlert />
      ) : (
        <div className={style.form}>
          <h2 className={style.title}>Sing In</h2>
          <form onSubmit={handleSubmit(onSubmit1)} className={style.boxForm}>
            <label className={style.box} htmlFor="address">
              Email address
              <input
                {...register('email', {
                  required: 'Поле обязательно к заполнению',
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: 'Неверный формат email',
                  },
                })}
                className={style.el}
                id="address"
                type="email"
                placeholder="Email address"
              />
              <div>
                <p className={style.error}>{null || errors?.username?.message}</p>
              </div>
            </label>

            <label className={style.box} htmlFor="pass">
              Password
              <input
                {...register('password', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 6,
                    message: 'Пароль должен быть минимум 6 символов',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Пароль не может быть более 40 символов',
                  },
                })}
                className={style.el}
                id="pass"
                type="password"
                placeholder="Password"
              />
              <div>
                <p className={style.error}>{null || errors?.username?.message}</p>
              </div>
            </label>

            <a href="/">
              <input className={style.bt} type="submit" value="Login" />
            </a>
          </form>
          <div>
            <p className={style.text}>
              Don`t have an account?
              <Link to="/sign-up" className={style.link}>
                Sing Up.
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

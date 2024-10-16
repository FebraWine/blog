/* eslint-disable react/jsx-props-no-spreading */
// import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { editProfile } from '../../api/articleApi'
import ErrorAlert from '../alert/error/error'
import style from '../../SCSS/singIn.module.scss'

export default function EditProfile() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.Login.token)
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
    dispatch(editProfile([token, data]))
  }

  return (
    <div className={style.wrapper}>
      {error ? (
        <ErrorAlert />
      ) : (
        <div className={style.form}>
          <h2 className={style.title}>Edit profile</h2>
          <form onSubmit={handleSubmit(onSubmit1)} className={style.boxForm}>
            <label className={style.box} htmlFor="Username">
              Username
              <input
                {...register('username', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 3,
                    message: 'Имя пользователя должно быть минимум 3 символа',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Имя пользователя не может быть более 20 символов',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      'Имя пользователя может содержать только буквы латинского алфавита, цифры и символ подчеркивания',
                  },
                })}
                className={style.el}
                id="Username"
                type="text"
                placeholder="Email address"
              />
              <div>
                <p className={style.error}>{null || errors?.username?.message}</p>
              </div>
            </label>
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
                <p className={style.error}>{null || errors?.address?.message}</p>
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
                <p className={style.error}>{null || errors?.pass?.message}</p>
              </div>
            </label>

            <label className={style.box} htmlFor="image">
              Avatar image (url)
              <input
                {...register('image', {
                  required: 'Поле обязательно к заполнению',
                })}
                className={style.el}
                id="image"
                type="url"
                placeholder=" Avatar image"
              />
              <div>
                <p className={style.error}>{null || errors?.username?.message}</p>
              </div>
            </label>

            <input className={style.bt} type="submit" value="Save" />
          </form>
        </div>
      )}
    </div>
  )
}

/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import ErrorAlert from '../alert/error/error'
import { postCreateAccount } from '../../api/articleApi'
import style from '../../SCSS/singIn.module.scss'

export default function SingUp() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.Login.error)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  const onSubmit1 = (data) => {
    dispatch(postCreateAccount(data))
  }

  return (
    <div className={style.wrapper}>
      {error ? (
        <ErrorAlert data={error} />
      ) : (
        <div className={style.form}>
          <h2 className={style.title}>Create new account</h2>
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
                <p className={style.error}>{null || errors?.email?.message}</p>
              </div>
            </label>

            <label className={style.box} htmlFor="new-password">
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
                id="new-password"
                type="password"
                placeholder="Password"
              />
              <div>
                <p className={style.error}>{null || errors?.password?.message}</p>
              </div>
            </label>

            <label className={style.box} htmlFor=" Repeat Password">
              Repeat Password
              <input
                {...register('repeatpassword', {
                  required: 'Поле обязательно к заполнению',
                  validate: (value) => value === getValues('password') || 'Пароли должны совпадать',
                })}
                className={style.el}
                id="Repeat Password"
                type="password"
                placeholder=" Repeat Password"
              />
              <div>
                <p className={style.error}>{null || errors?.repeatpassword?.message}</p>
              </div>
            </label>

            <div className={style.wrapperLine}>
              <label className={style.agree} htmlFor=" Repeat Password">
                <input
                  {...register('terms', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  type="checkbox"
                />
                <p className={style.info}>I agree to the processing of my personal information</p>
              </label>
              <div>
                <p className={style.error}>{null || errors?.terms?.message}</p>
              </div>
            </div>

            <button type="submit" className={style.bt}>
              Create
            </button>
          </form>
          <div>
            <p className={style.text}>
              Already have an account?
              <Link to="/sign-in" className={style.link}>
                Sing Ip.
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

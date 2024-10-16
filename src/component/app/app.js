import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getToken } from '../../store/register/register'
// import ErrorLink from '../alert/error/errorLink'
import EditArticle from '../editArticle/editArticle'
import CreateNewArticle from '../createNewArticle/createNewArticle'
import Spin from '../spin/spin'
import Header from '../header/header'
import SingIn from '../singIn/singIn'
import SingUp from '../singUp/singUp'
import EditProfile from '../editProfile/editProfile'
import FirstPage from '../firstPage/firstPage'
import OpenArticle from '../openArticle/openArticle'
import style from '../../SCSS/app.module.scss'
import { getArticles } from '../../api/articleApi'
import notAuthorization from '../alert/notAuthorization/notAuthorization'
import ErrorAlert from '../alert/error/error'

// больше импортов богу импортов!

export default function App() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.main.loading)
  const load = useSelector((state) => state.edit.load)
  const token = useSelector((state) => state.Login.token)
  const error = useSelector((state) => state.main.error)
  const errorArticle = useSelector((state) => state.create.errorArticle)
  const errorEdit = useSelector((state) => state.edit.errorEdit)
  const errorLike = useSelector((state) => state.like.errorLike)

  useEffect(() => {
    dispatch(getArticles(1))
    dispatch(getToken())
  }, [dispatch])

  const edit = load ? Spin : EditArticle
  const page = loading ? Spin : FirstPage
  const fullArticle = loading ? Spin : OpenArticle
  return (
    <div>
      {error || errorArticle || errorEdit || errorLike ? (
        <ErrorAlert />
      ) : (
        <Router>
          <div className={style}>
            <Header />
            <Route path="/articles/:slug/edit" component={token ? edit : notAuthorization} exact />
            <Route path="/profile" component={token ? EditProfile : notAuthorization} exact />
            <Route path="/sign-in" component={SingIn} exact />
            <Route path="/sign-up" component={SingUp} exact />
            <Route path="/" component={page} exact />
            <Route path="/new-article" component={token ? CreateNewArticle : notAuthorization} exact />
            <Route path="/article/:slug" component={fullArticle} exact />
          </div>
        </Router>
      )}
    </div>
  )
}

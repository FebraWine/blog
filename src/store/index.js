import { thunk } from 'redux-thunk'
import { configureStore, Tuple } from '@reduxjs/toolkit'
// import logger from 'redux-logger'

import article from './articleSlice'
import register from './register/register'
import createArticle from './createArticle/createArticle'
import editArticle from './editArticle/editArticle'
import likeArticle from './like/like'

export default configureStore({
  reducer: {
    main: article,
    Login: register,
    create: createArticle,
    edit: editArticle,
    like: likeArticle,
  },
  middleware: () => new Tuple(thunk),
})

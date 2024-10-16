import { createSlice } from '@reduxjs/toolkit'

import { getArticles, getOneArticle } from '../api/articleApi'

const initialState = {
  article: [],
  articlesCount: 0,
  oneArticle: {},
  loading: false,
  page: 1,
  error: false,
}

const article = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        return { ...state, loading: true, error: false }
      })

      .addCase(getArticles.fulfilled, (state, action) => {
        return {
          article: action.payload[0].articles,
          articlesCount: action.payload[0].articlesCount,
          loading: false,
          page: action.payload[1],
          error: false,
        }
      })
      .addCase(getArticles.rejected, (state) => {
        return { ...state, error: true }
      })
      .addCase(getOneArticle.pending, (state) => {
        return { ...state, loading: true }
      })
      .addCase(getOneArticle.fulfilled, (state, action) => {
        return { ...state, oneArticle: action.payload.article, loading: false }
      })
      .addCase(getOneArticle.rejected, (state) => {
        return { ...state, error: true }
      })
  },
})

export default article.reducer

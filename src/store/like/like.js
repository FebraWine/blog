import { createSlice } from '@reduxjs/toolkit'

import { postLike, deleteLike } from '../../api/articleApi'

const initialState = {
  like: false,
  slug: '',
  errorLike: false,
}

const likeArticle = createSlice({
  name: 'likeArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLike.pending, () => {})
      .addCase(postLike.fulfilled, (state, action) => {
        const { slug } = action.payload.article
        return { like: true, slug }
      })
      .addCase(postLike.rejected, (state) => {
        return { ...state, errorLike: true }
      })
      .addCase(deleteLike.pending, () => {})
      .addCase(deleteLike.fulfilled, (state, action) => {
        const { slug } = action.payload.article
        return { ...state, like: false, slug }
      })
      .addCase(deleteLike.rejected, (state) => {
        return { ...state, errorLike: true }
      })
  },
})

export default likeArticle.reducer

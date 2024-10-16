import { createSlice } from '@reduxjs/toolkit'

import { postArticle, deleteArticle } from '../../api/articleApi'

const initialState = {
  tags: [1],
  errorArticle: false,
}

const createArticle = createSlice({
  name: 'createArticle',
  initialState,
  reducers: {
    addTag(state, action) {
      const newArr = action.payload.concat([action.payload[action.payload.length - 1] + 1])
      return { ...state, tags: newArr }
    },
    deleteTag(state, action) {
      const [arr, key] = action.payload
      if (arr.length === 1) {
        return { ...state }
      }
      const newArr = arr.filter((i) => i !== key)
      return { ...state, tags: newArr }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postArticle.pending, () => {})
      .addCase(postArticle.fulfilled, () => {})
      .addCase(postArticle.rejected, (state) => {
        return { ...state, errorArticle: true }
      })
      .addCase(deleteArticle.pending, () => {})
      .addCase(deleteArticle.fulfilled, () => {})
      .addCase(deleteArticle.rejected, (state) => {
        return { ...state, errorArticle: true }
      })
  },
})

export const { addTag, deleteTag } = createArticle.actions

export default createArticle.reducer

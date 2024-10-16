import { createSlice } from '@reduxjs/toolkit'

import { getArticleEdit, putArticleEdit } from '../../api/articleApi'

const initialState = {
  article: null,
  load: false,
  tagList: [],
  errorEdit: false,
}

const editArticle = createSlice({
  name: 'editArticle',
  initialState,
  reducers: {
    putAddTag: (state, action) => {
      const newArr = action.payload.concat(action.payload.length + 1)
      return { ...state, tagList: newArr }
    },
    deleteTag: (state, action) => {
      const [item, tagList] = action.payload
      const newArr = tagList.filter((el) => el !== item)
      return { ...state, tagList: newArr }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticleEdit.pending, (state) => {
        return { ...state, load: true }
      })
      .addCase(getArticleEdit.fulfilled, (state, action) => {
        const { article } = action.payload
        const { tagList } = article
        return { ...state, article, load: false, tagList }
      })
      .addCase(getArticleEdit.rejected, (state) => {
        return { ...state, errorEdit: true }
      })
      .addCase(putArticleEdit.pending, () => {})
      .addCase(putArticleEdit.fulfilled, () => {})
      .addCase(putArticleEdit.rejected, (state) => {
        return { ...state, errorEdit: true }
      })
  },
})

export const { putAddTag, deleteTag, changeTag } = editArticle.actions

export default editArticle.reducer

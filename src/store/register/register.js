import { createSlice } from '@reduxjs/toolkit'

import { postCreateAccount, getAccount, editProfile } from '../../api/articleApi'

const initialState = {
  user: {
    userName: null,
    email: null,
    password: null,
    img: null,
  },
  token: null,
  error: false,
}

const register = createSlice({
  name: 'register',
  initialState,
  reducers: {
    getToken(state) {
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))
        const { username: userName, email, token, image } = user
        return { ...state, user: { userName, email, img: image }, token }
      }
      return { ...state }
    },
    logOut() {
      localStorage.clear()
      return { ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCreateAccount.pending, () => {})
      .addCase(postCreateAccount.fulfilled, (state, action) => {
        const { user } = action.payload
        const { username: userName, email, token } = user
        localStorage.setItem('user', JSON.stringify(user))
        return { ...state, user: { userName, email, img: null }, token }
      })
      .addCase(postCreateAccount.rejected, (state) => {
        return { ...state, error: true }
      })
      .addCase(getAccount.pending, () => {})
      .addCase(getAccount.fulfilled, (state, action) => {
        const { user } = action.payload
        const { email, token, username: userName } = user

        localStorage.setItem('user', JSON.stringify(user))
        return { ...state, user: { userName, email, img: null }, token }
      })
      .addCase(getAccount.rejected, (state) => {
        return { ...state, error: true }
      })
      .addCase(editProfile.pending, () => {})
      .addCase(editProfile.fulfilled, (state, action) => {
        const { user } = action.payload
        const { username: userName, email, token, image } = user
        localStorage.setItem('user', JSON.stringify(user))
        return { ...state, user: { userName, email, img: image }, token }
      })
      .addCase(editProfile.rejected, (state) => {
        return { ...state, error: true }
      })
  },
})

export const { getToken, logOut } = register.actions

export default register.reducer

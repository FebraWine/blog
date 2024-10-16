/* eslint-disable no-restricted-syntax */

import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = 'https://blog-platform.kata.academy/api/'
const articles = '/articles'
const users = '/users'
const queryLimit = '?limit=5'

// ---------------- Получение Статей ---------------

export const getArticles = createAsyncThunk('article/getArticles', async (page = 1) => {
  const skipArticle = (page - 1) * 5
  const querySkip = `&offset=${skipArticle}`
  const response = await fetch(`${baseUrl}${articles}${queryLimit}${querySkip}`)

  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()
  return [json, page]
})

export const getOneArticle = createAsyncThunk('article/getOneArticle', async (slug) => {
  const response = await fetch(`${baseUrl}${articles}/${slug}`)
  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()
  return json
})

// ------------- Регистрация ----------------

export const postCreateAccount = createAsyncThunk('register/postCreateAccount', async (data) => {
  const { username, email, password } = data

  const usersOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  }

  const response = await fetch(`${baseUrl}${users}`, usersOption)

  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }

  const json = await response.json()

  return json
})

// ------------- Авторизация и редактирование профиля ----------------

export const getAccount = createAsyncThunk('register/getAccount', async (data) => {
  const { email, password } = data

  const usersOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  }

  const response = await fetch(`${baseUrl}${users}/login`, usersOption)
  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()
  return json
})

export const editProfile = createAsyncThunk('register/editProfile', async (options) => {
  const [token, data] = options
  const { email, password, username, image } = data

  const usersOption = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
        image,
      },
    }),
  }

  const response = await fetch(`${baseUrl}/user`, usersOption)
  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()
  return json
})

// ---------------- Создание и удаление поста ----------------------

export const postArticle = createAsyncThunk('createArticle/postArticle', async (options) => {
  const [data, token] = options
  const { desription: description, title, text: body } = data

  const tagArticle = []

  for (const key in data) {
    if (key !== 'text' && key !== 'desription' && key !== 'title') {
      tagArticle.push(data[key])
    }
  }

  const articleOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList: tagArticle,
      },
    }),
  }

  const response = await fetch(`${baseUrl}/articles`, articleOption)
  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }

  const json = await response.json()

  return json
})

export const deleteArticle = createAsyncThunk('createArticle/deleteArticle', async (options) => {
  const [token, body, slug] = options

  const deleteOption = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      error: {
        body,
      },
    }),
  }

  const response = await fetch(`${baseUrl}/articles/${slug}`, deleteOption)
  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()

  return json
})

// ----------------Редактирование  --------------------

export const getArticleEdit = createAsyncThunk('editArticle/articleEdit', async (options) => {
  const [data] = options
  const { slug } = data

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const response = await fetch(`${baseUrl}/articles/${slug}`, option)
  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()

  return json
})

export const putArticleEdit = createAsyncThunk('editArticle/putArticleEdit', async (options) => {
  const [data, token, slug] = options

  const { desription: description, title, text: body } = data
  const tagArticle = []

  for (const key in data) {
    if (key !== 'text' && key !== 'desription' && key !== 'title') {
      tagArticle.push(data[key])
    }
  }

  const articleOption = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList: tagArticle,
      },
    }),
  }

  const response = await fetch(`${baseUrl}/articles/${slug}`, articleOption)

  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()

  return json
})

// ---------------------- Лайки! ---------------------
// Хм, а в больших приложениях как апи выглядит...
// уже довольно много строк для одного файла

export const postLike = createAsyncThunk('likeArticle/postLike', async (options) => {
  const [token, slug] = options

  const articleOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, articleOption)

  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()
  return json
})

export const deleteLike = createAsyncThunk('likeArticle/deletLike', async (options) => {
  const [token, slug] = options

  const articleOption = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, articleOption)

  if (!response.ok) {
    throw new Error(`код ошибки ${response.status}`)
  }
  const json = await response.json()

  return json
})

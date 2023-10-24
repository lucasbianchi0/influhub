import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter.slice'
import userReducer from './features/user.slice'
import usersReducer from './features/users.slice'
import categoriesReducer  from './features/categories.slice'
import postsReducer from './features/posts.slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    users:usersReducer,
    categories:categoriesReducer,
    posts:postsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
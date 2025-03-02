import { configureStore } from '@reduxjs/toolkit'
import UserReducers from "./UserSlice"
import TabToggleReducers from "./TabToggleSlice"

const store = configureStore({
  reducer: {
    user : UserReducers,
    tabs : TabToggleReducers
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
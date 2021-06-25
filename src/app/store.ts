import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

// reducers
import todosReducer from "../features/todos/todosSlice"

export const store = configureStore({
  reducer: {
    todos: todosReducer
  },
  devTools: process.env.NODE_ENV !== "production"
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

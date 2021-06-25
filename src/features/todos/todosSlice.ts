import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { createSelector } from "reselect"

// types
import { RootState } from "../../app/store"
import { AxiosResponse, AxiosError } from "axios"

export type Todo = {
  id: string
  title: string
  completed: boolean
}

export interface TodosState {
  data: Todo[]
  status: "idle" | "loading"
  // status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TodosState = {
  data: [],
  status: "idle",
  error: null
}

// thunks
export const getTodos = createAsyncThunk<Todo[], void, { rejectValue: AxiosError }>(
  "todos/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse<Todo[]> = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=3`)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.data.push(action.payload)
      },
      prepare: (title: string) => ({
        payload: {
          id: uuidv4(),
          title,
          completed: false
        } as Todo
      })
    },
    removeTodo(state, action: PayloadAction<Todo>) {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id)
      return state
    },
    toggleTodoCompleted(state, action: PayloadAction<string>) {
      const todo = state.data.find((todo) => todo.title === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.status = "loading"
      state.error = null
    })
    builder.addCase(getTodos.fulfilled, (state, { payload }) => {
      payload.map((todo) => {
        state.data.push({
          id: uuidv4(),
          title: todo.title,
          completed: todo.completed
        })
      })
      state.status = "idle"
    })
    builder.addCase(getTodos.rejected, (state, { payload }) => {
      console.log("rejected", payload)
      if (payload) state.error = payload.message
      state.status = "idle"
    })
  }
})

// actions
export const { addTodo, removeTodo, toggleTodoCompleted } = todosSlice.actions

// selectors
export const selectTodos = (state: RootState) => state.todos
export const selectCompletedTodos = createSelector(selectTodos, (todos) => todos.data.filter((todo) => todo.completed))
export const selectIncompletedTodos = createSelector(selectTodos, (todos) =>
  todos.data.filter((todo) => !todo.completed)
)

// reducer
export default todosSlice.reducer

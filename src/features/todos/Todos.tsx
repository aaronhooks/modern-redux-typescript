import React, { useEffect } from "react"
import { Container } from "semantic-ui-react"

// components
import { NavbarPage } from "../../common/page-templates/NavbarPage"
import { TodoForm } from "./TodoForm"
import { TodoListItem } from "./TodoListItem"

// redux
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectTodos,
  selectCompletedTodos,
  selectIncompletedTodos,
  removeTodo,
  toggleTodoCompleted,
  getTodos
} from "./todosSlice"

// types
import { Todo } from "./todosSlice"

export const Todos: React.FC = () => {
  const todosState = useAppSelector(selectTodos)
  const completedTodos = useAppSelector(selectCompletedTodos)
  const inCompletedTodos = useAppSelector(selectIncompletedTodos)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [])

  return (
    <NavbarPage>
      {todosState.status === "loading" ? (
        <div>Loading todos...</div>
      ) : (
        <Container text>
          <TodoForm />
          <h3>Incomplete:</h3>
          {inCompletedTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveClick={(todo: Todo) => dispatch(removeTodo(todo))}
              onCompletedClick={(text: string) => dispatch(toggleTodoCompleted(text))}
            />
          ))}
          <h3>Completed:</h3>
          {completedTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveClick={(todo: Todo) => dispatch(removeTodo(todo))}
              onCompletedClick={(text: string) => dispatch(toggleTodoCompleted(text))}
            />
          ))}
        </Container>
      )}
    </NavbarPage>
  )
}

import React from "react"
import styled from "styled-components"
import { Button, Card, Grid } from "semantic-ui-react"

// types
import { Todo } from "./todosSlice"

// styles
const StyledCard = styled(Card)`
  && {
    padding: 1rem;
  }
`
interface Props {
  todo: Todo
  onRemoveClick: (todo: Todo) => { payload: Todo; type: string }
  onCompletedClick: (text: string) => { payload: string; type: string }
}

export const TodoListItem: React.FC<Props> = ({ todo, onRemoveClick, onCompletedClick }) => {
  return (
    <StyledCard fluid raised>
      <Grid verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width="8">
            <h3>{todo.title}</h3>
          </Grid.Column>
          <Grid.Column width="5" textAlign="right">
            {!todo.completed && (
              <Button color="green" onClick={() => onCompletedClick(todo.title)}>
                Mark As Complete
              </Button>
            )}
          </Grid.Column>
          <Grid.Column width="3">
            <Button color="red" onClick={() => onRemoveClick(todo)}>
              Remove
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </StyledCard>
  )
}

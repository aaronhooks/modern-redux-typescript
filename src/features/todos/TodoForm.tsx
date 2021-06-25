import React from "react"
import { Formik } from "formik"
import { Form, Input, SubmitButton } from "formik-semantic-ui-react"
import { Grid, Card, Container } from "semantic-ui-react"
import styled from "styled-components"

// redux
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { addTodo, selectTodos } from "./todosSlice"

// styles
const StyledCard = styled(Card)`
  && {
    padding: 1rem;
  }
`

export const TodoForm: React.FC = () => {
  const todosState = useAppSelector(selectTodos)
  const dispatch = useAppDispatch()

  const initialValues = {
    title: ""
  }
  return (
    <StyledCard fluid raised>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setFieldValue }) => {
          const isDuplicateTodoTitle = todosState.data.some((todo) => todo.title === values.title)
          if (!isDuplicateTodoTitle) {
            dispatch(addTodo(values.title))
            setFieldValue("title", "")
          }
          setSubmitting(false)
        }}
      >
        <Form size="large">
          <Container>
            <Grid verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width="12">
                  <Input name="title" placeholder="Type new todo here" />
                </Grid.Column>
                <Grid.Column width="4">
                  <SubmitButton color="green">Create Todo</SubmitButton>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Form>
      </Formik>
    </StyledCard>
  )
}

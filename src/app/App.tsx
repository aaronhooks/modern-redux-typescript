import React from "react"
import { hot } from "react-hot-loader"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// components
import { Todos } from "../features/todos/Todos"

// styles
import "semantic-ui-css/semantic.min.css"

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Todos} />
      </Switch>
    </Router>
  )
}

export default hot(module)(App)

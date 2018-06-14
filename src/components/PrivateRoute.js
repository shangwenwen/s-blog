import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import cookies from 'js-cookie'

const PrivateRoute = ({ component: Component }) => (
  <Route
    render={
      (props) => (
        cookies.get('user')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location }}} />
      )
    }
  />
)

export default PrivateRoute

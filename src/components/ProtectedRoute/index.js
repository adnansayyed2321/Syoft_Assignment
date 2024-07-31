import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const login = Cookie.get('login')
  console.log(login)
  if (!login) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute

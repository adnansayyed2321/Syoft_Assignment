import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const userDetails = Cookies.get('userDetails')
  const isLoggedIn = Cookies.get('isLoggedIn')
  console.log(isLoggedIn)
  if (userDetails === undefined && isLoggedIn === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute

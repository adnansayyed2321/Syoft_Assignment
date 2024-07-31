import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    userEmail: '',
    userPassword: '',
    incompleteDetails: false,
    errorMsg: false,
    accountNotFound: false,
  }

  onChangeUserEmail = event => {
    this.setState({userEmail: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({userPassword: event.target.value})
  }

  onSignIn = event => {
    event.preventDefault()
    const {history} = this.props

    const {userEmail, userPassword} = this.state

    if (userEmail === '' || userPassword === '') {
      this.setState({incompleteDetails: true})
      this.setState({accountNotFound: false})
    } else {
      this.setState({incompleteDetails: false})

      const userDetails = Cookies.get('userDetails')
      if (userDetails !== undefined) {
        this.setState({accountNotFound: false})
        const userDetailsObject = JSON.parse(userDetails)

        console.log(userDetailsObject)

        if (
          userDetailsObject.emailAddress === userEmail &&
          userDetailsObject.password === userPassword
        ) {
          this.setState({errorMsg: false})
          const isLoggedIn = true
          Cookies.set('isLoggedIn', isLoggedIn, {
            expires: 30,
            path: '/',
          })
          history.replace('/')
        } else {
          this.setState({errorMsg: true})
        }
      } else {
        this.setState({accountNotFound: true})
      }
    }
  }

  render() {
    const {
      userEmail,
      userPassword,
      incompleteDetails,
      errorMsg,
      accountNotFound,
    } = this.state

    const userDetails = Cookies.get('userDetails')
    const isLoggedIn = Cookies.get('isLoggedIn')

    if (userDetails !== undefined && isLoggedIn !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="sign-up-parent-container">
        <div className="sign-up-main-container">
          <div className="heading-greetings-container">
            <h1>Welcome to our community</h1>
          </div>
          <div className="registration-main-container">
            <h1>Sign In</h1>
            <p>
              First time dont have an account ?{' '}
              <Link to="/signup">Sign up</Link>
            </p>
            <form onSubmit={this.onSignIn}>
              <div>
                <label htmlFor="userEmail">Email *</label>
                <input
                  id="userEmail"
                  onChange={this.onChangeUserEmail}
                  value={userEmail}
                />
              </div>
              <div>
                <label htmlFor="userPassword">Password *</label>
                <input
                  id="userPassword"
                  onChange={this.onChangeUserPassword}
                  value={userPassword}
                />
              </div>

              <button type="submit">Sign In</button>
            </form>
            {incompleteDetails && <p>Please Enter All * Details</p>}
            {errorMsg && <p>Enter Details are Mismatch</p>}
            {accountNotFound && <p>Account with this details not existing</p>}
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm

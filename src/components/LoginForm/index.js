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
        <div className="heading-greetings-container">
          <div className="heading-content-container">
            <h1 className="main-heading-sign-up">
              Welcome to <br />
              our community
            </h1>
            <p>
              Fuse helps developers to build organized and weil coded dashboards
              full of beautiful and rich modules. Join us and start building
              your application today
            </p>
            <div className="avatar-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCicxernIb5W2jIRbjKwiMOVIit_7XJtczA&s"
                alt="person"
                className="avatar"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0rfm7ulLh-hULWlR8NBtrIwRCCWql8VQ9zw&s"
                alt="person"
                className="avatar abs-ava"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlib_T_3DSQwXS3xg5mYxEriShsndkhll8-w&s"
                alt="person"
                className="avatar abs-ava2"
              />
              <p>More than 17k people joined us, its your turn</p>
            </div>
          </div>
        </div>
        <div className="registration-main-container">
          <img
            src="https://fusetheme.com/static/assets/images/fuse.svg"
            alt="logo"
            className="logo-styling"
          />
          <div className="sign-up-heading">
            <h1>Sign In</h1>
            <p>
              Dont have an account ?{' '}
              <Link
                to="/signup"
                style={{color: 'blue', textDecoration: 'none'}}
              >
                Sign Up
              </Link>
            </p>
          </div>

          <form onSubmit={this.onSignIn} className="form-styling">
            <div className="label-input-container">
              <label htmlFor="userEmail">Email *</label>
              <input
                id="userEmail"
                onChange={this.onChangeUserEmail}
                value={userEmail}
                className="input-styling"
                type="email"
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="userPassword">Password *</label>
              <input
                id="userPassword"
                onChange={this.onChangeUserPassword}
                value={userPassword}
                className="input-styling"
                type="password"
              />
            </div>

            <button type="submit" className="button-styling">
              Sign In
            </button>
          </form>
          {incompleteDetails && (
            <p className="error-styles">Please Enter All * Details</p>
          )}
          {errorMsg && (
            <p className="error-styles">Enter Details are Mismatch</p>
          )}
          {accountNotFound && (
            <p className="error-styles">
              Account with this details not existing
            </p>
          )}
        </div>
      </div>
    )
  }
}
export default LoginForm

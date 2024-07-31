import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class SignUp extends Component {
  state = {
    fullName: '',
    emailAddress: '',
    password: '',
    company: '',
    terms: false,
    incompleteDetails: false,
  }

  onChangeFullName = event => {
    this.setState({fullName: event.target.value})
  }

  onChangeEmailAddress = event => {
    this.setState({emailAddress: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCompany = event => {
    this.setState({company: event.target.value})
  }

  onChangeTerms = () => {
    this.setState(prevState => ({terms: !prevState.terms}))
  }

  onRegistration = event => {
    event.preventDefault()
    const {fullName, emailAddress, password, company, terms} = this.state

    const {history} = this.props
    if (
      fullName === '' ||
      emailAddress === '' ||
      password === '' ||
      company === '' ||
      terms === false
    ) {
      this.setState({incompleteDetails: true})
    } else {
      this.setState({incompleteDetails: false})

      const userDetails = {
        fullName,
        emailAddress,
        password,
        company,
      }
      const newUserDetails = JSON.stringify(userDetails)
      Cookies.set('userDetails', newUserDetails, {
        expires: 30,
        path: '/',
      })
      history.push('/login')
    }
  }

  render() {
    const {
      fullName,
      emailAddress,
      password,
      company,
      terms,
      incompleteDetails,
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
            <h1>Sign up</h1>
            <p>
              Already have an account ?{' '}
              <Link to="/login" style={{color: 'blue', textDecoration: 'none'}}>
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={this.onRegistration} className="form-styling">
            <div className="label-input-container">
              <label htmlFor="fullName">Name *</label>
              <input
                id="fullName"
                onChange={this.onChangeFullName}
                value={fullName}
                className="input-styling"
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="emailAddress">Email Address *</label>
              <input
                id="emailAddress"
                onChange={this.onChangeEmailAddress}
                value={emailAddress}
                className="input-styling"
                type="email"
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                onChange={this.onChangePassword}
                value={password}
                className="input-styling"
                type="password"
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="company">Company *</label>
              <input
                id="company"
                onChange={this.onChangeCompany}
                value={company}
                className="input-styling"
              />
            </div>
            <div>
              <label id="privacyPolicy" className="terms-label">
                <input
                  type="checkbox"
                  htmlFor="privacyPolicy"
                  onChange={this.onChangeTerms}
                  value={terms}
                  style={{marginRight: '10px', height: '12px', width: '12px'}}
                />
                I agree to the{' '}
                <span style={{color: 'blue'}}>Terms of Service</span> and{' '}
                <span style={{color: 'blue'}}>Privacy Policy</span> *
              </label>
            </div>
            <button className="button-styling" type="submit">
              Create your free account
            </button>
          </form>
          {incompleteDetails && (
            <p className="error-styles">Please Enter All * Details</p>
          )}
        </div>
      </div>
    )
  }
}

export default SignUp

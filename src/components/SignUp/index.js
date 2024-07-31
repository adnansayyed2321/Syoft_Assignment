import {Component} from 'react'

import {Link} from 'react-router-dom'
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
        fullName: {fullName},
        emailAddress: {emailAddress},
        password: {password},
        company: {company},
      }
      Cookies.set('userDetails', userDetails, {
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

    console.log(fullName, emailAddress, password, company, terms)

    return (
      <div className="sign-up-parent-container">
        <div className="sign-up-main-container">
          <div className="heading-greetings-container">
            <h1>Welcome to our community</h1>
          </div>
          <div className="registration-main-container">
            <h1>Sign up</h1>
            <p>
              Already have an account ? <Link to="/login">Sign in</Link>
            </p>
            <form onSubmit={this.onRegistration}>
              <div>
                <label htmlFor="fullName">Name *</label>
                <input
                  id="fullName"
                  onChange={this.onChangeFullName}
                  value={fullName}
                />
              </div>
              <div>
                <label htmlFor="emailAddress">Email Address *</label>
                <input
                  id="emailAddress"
                  onChange={this.onChangeEmailAddress}
                  value={emailAddress}
                />
              </div>
              <div>
                <label htmlFor="password">Password *</label>
                <input
                  id="password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div>
                <label htmlFor="company">Company *</label>
                <input
                  id="company"
                  onChange={this.onChangeCompany}
                  value={company}
                />
              </div>
              <div>
                <label id="privacyPolicy">
                  <input
                    type="checkbox"
                    htmlFor="privacyPolicy"
                    onChange={this.onChangeTerms}
                    value={terms}
                  />
                  I agree to the <span>Terms of Service</span> and{' '}
                  <span>Privacy Policy</span>
                </label>
              </div>
              <button type="submit">Create your free account</button>
            </form>
            {incompleteDetails && <p>Please Enter All * Details</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp

import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: '',
  }

  jwtTokenListing = token => {
    const {history} = this.props
    Cookies.set('jwt-token', token, {expires: 30, path: '/'})
    history.replace('/')
  }

  errorMsg = errorMssg => {
    this.setState({showErrorMsg: errorMssg})
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  clickToSubmit = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.jwtTokenListing(data.jwt_token)
    }
    this.errorMsg(data.error_msg)
  }

  render() {
    const {showErrorMsg} = this.state
    const getToken = Cookies.get('jwt-token')
    console.log(getToken)
    if (getToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-form">
          <div className="login-form-container">
            <div className="name">
              <img
                src="https://res.cloudinary.com/dh0wwy8i8/image/upload/v1677208098/v1tdt4xjocsweem0hmgc.jpg"
                alt="logo"
                className="logo-img"
              />
              <h1 className="logo-name">Tasty Kitchens</h1>
            </div>

            <h1 className="login">Login</h1>
            <form type="submit" onSubmit={this.clickToSubmit}>
              <div className="login">
                <label htmlFor="userName">USERNAME</label>
                <div>
                  <input
                    className="input"
                    type="text"
                    id="userName"
                    onChange={this.username}
                  />
                </div>
              </div>
              <div className="login">
                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" onChange={this.password} />
              </div>
              <p>{showErrorMsg}</p>
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
          <img
            src="https://res.cloudinary.com/dh0wwy8i8/image/upload/v1677205915/cw2vgilhqp7dbmqxcecp.png"
            alt="login"
            className="log-img"
          />
        </div>
      </>
    )
  }
}
export default LoginForm

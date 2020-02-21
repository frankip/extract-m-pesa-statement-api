import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';

// local imports
import { ROOT } from './url_config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      access_token: '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // sends payload to the api login endpoint
  handleOnSubmit(e) {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(`${ROOT}/auth/login/`, payload)
      .then((response) => {
        this.setState(
          {
            status: response.status,
            loggedIn: true,
            access_token: response.data.access_token,
          },
          () => {},
        );
        toastr.success(response.data.message);

        // save user ans token to local storage
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', response.data.user);
        this.props.history.push('/');
      })
      .catch(error => {
        toastr.warning(error.response.data.message);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="body">
        <div className="intro">
          <div>
            <h1>Welcome to<br />
              <span>Bright Events</span>
            </h1>
            <p>create and manage different types of events while making them
              easily accessible to target markets
            </p>
          </div>
        </div>
        <div className="form">
          <ul className="tab-group">
            <li className="tab">
              <Link href to="/signup">Signup</Link>
            </li>
            <li className="tab active">
              <Link href to="/login">login</Link>
            </li>
          </ul>
          <div className="tab-content">
            <div id="login">
              <h3>Welcome Back!</h3>
              <form method="POST" onSubmit={this.handleOnSubmit}>
                <div className="field-wrap">
                  <input type="email" name="email" placeholder="Email" required onChange={this.handleChange} />
                </div>
                <div className="field-wrap">
                  <input type="password" name="password" placeholder="password" required onChange={this.handleChange} />
                </div>
                <p className="forgot">
                  <Link href to="/signup">Forgot Password?</Link>
                </p>
                <button value="submit" className="button button-block">
                 Log In
                </button>
              </form>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
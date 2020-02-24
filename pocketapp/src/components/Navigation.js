import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./../static/App.css"
// local imports
import { isTokenExpired } from './url_config';

class Navigation extends Component {
  constructor(props){
    super()
      this.state = {
        isLogged: false,
        token: localStorage.getItem("access_token"),
        user: localStorage.getItem('user')
      }
  }

  // resets the local storage to null
  handleLogout = () => {
    localStorage.clear();

  }
  render() {
    return (
      <div>
        <nav className="nav">
          <button className="toggle-nav" href="#">&#9776;</button>
          <div className="nav-mobile">
            <ul className="left">
              <li>
                <Link to="/" className="fa fa-home">Home</Link>
              </li>
              {this.state.token && !isTokenExpired(this.state.token)?
              <span>
              <li>
                <Link to="/" className="fa fa-book"></Link>
              </li>
              <li>
                <Link to="/" className="fa fa-fire" ></Link>
              </li>
              </span>:null
              }
            </ul>
            <ul className="right">
            { this.state.token && !isTokenExpired(this.state.token)?
                <span>
                  <li>
                    <Link to="/" className="fa fa-user"> {this.state.user}</Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={this.handleLogout}> 
                      logout <i className="fa fa-sign-out" />
                    </Link>
                  </li>
                </span>
                :
                <li>
                  <Link to="/login" className="fa fa-sign-in"> Login</Link>
                </li> 
            } 
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
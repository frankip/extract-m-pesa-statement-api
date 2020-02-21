import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";
import "./../static/App.css"



// local imports
import { instance, ROOT, isTokenExpired } from "./url_config";
import Navigation from './Navigation';
import FileUploader from './file_uploader';

const styles = {
  formstyle : {
    margin: 2,
    padding: 4,
  }
}

// let events = [];
class Main extends Component {
  constructor() {
    super();
    this.state = {
    //   eventList: [],
      isLoggedIn: false,
      open: false,
      payload: {},
      token: localStorage.getItem("access_token"),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillMount() {
    // this.fetchEvents()
  }

  // toggle for openning and clossing the dialog
  toggleOpenState = () => {
    this.setState({open: !this.state.open});
  }

  // takes care of submiting and creating a new event
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ open: false });

    let payload = this.state.payload
    
    // axios instance for posting to the api endpoint events
    instance
      .post(ROOT + "/events/", payload)
      .then(response => {
        toastr.success(response.statusText);
        this.fetchEvents();
      })
      .catch(function(error) {
        toastr.warning(error.response.data.message);
      });
  };

  // Receives the data from the input and update the state
  handleChange = e => {
    const { payload } = this.state;
    payload[e.target.name] = e.target.value;
    this.setState({ ...this.state, payload});
  };

  render() {
    return <div>
        <Navigation />
        <section className="row">
          <FileUploader />
         
        </section>
      </div>;
  }
}

export default Main;
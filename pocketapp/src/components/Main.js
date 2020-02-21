import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";


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

  // searches through the events 
//   handleSearch = e => {
//     let searchStr = "";
//     searchStr = e.target.value.toLowerCase().trim()
//     let eventItem;
    
//     let searchRes = [];
    
//     if (searchStr !== ""){

//       for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
//         eventItem = events[eventIndex];

//         if (eventItem.event
//             .toLowerCase()
//             .includes(
//               searchStr
//             ) || eventItem.location.toLowerCase().includes(searchStr)) {
//           searchRes.push(eventItem);
//         }
//       }
      
//       this.setState({eventList: searchRes});
//     }
//     else { this.setState({ eventList: events }); }
//   }
  
  render() {


    // loop through the events and pass them to the event card component
    // const eventlist = this.state.eventList.map(event => (
    //   <EventCard
    //     key={event.id}
    //     id={event.id}
    //     event={event.event}
    //     location={event.location}
    //     date={event.date}
    //     category={event.category}
    //     description={event.description}
    //     created_by={event.created_by}
    //   />
    // ));


    return <div>
        <Navigation />
        <section className="row">
          <FileUploader />
         
        </section>
      </div>;
  }
}

export default Main;